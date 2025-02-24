import json
import numpy as np
import faiss
import torch
from pymongo import MongoClient
from tqdm import tqdm
from sentence_transformers import SentenceTransformer

# ✅ MongoDB Connection
MONGO_URI = "mongodb://localhost:27017/"  # Change if needed
DATABASE_NAME = "ScribeGen"
COLLECTION_NAME = "Scribe-Scrape-Data"

# ✅ FAISS Index File (Saved Here)
FAISS_INDEX_FILE = "vector_index.faiss"
ARTICLES_JSON_BACKUP = "articles_backup.json"

# ✅ Load Pretrained Sentence Transformer Model (FREE)
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"  # Use GPU if available
MODEL = SentenceTransformer("all-MiniLM-L6-v2").to(DEVICE)  # Lightweight & fast


def load_articles_from_mongo():
    """Fetches articles from MongoDB."""
    client = MongoClient(MONGO_URI)
    db = client[DATABASE_NAME]
    collection = db[COLLECTION_NAME]

    articles = list(collection.find({}, {"_id": 0, "title": 1, "url": 1, "source": 1,"date_posted": 1,"content": 1,"author": 1}))  # No _id field
    client.close()
    return articles


def save_articles_to_json(articles):
    """Saves fetched articles to a backup JSON file."""
    with open(ARTICLES_JSON_BACKUP, "w", encoding="utf-8") as f:
        json.dump(articles, f, indent=4, ensure_ascii=False)
    print(f"✅ Articles saved to {ARTICLES_JSON_BACKUP}")


def generate_embeddings(articles):
    """Encodes article titles into embeddings using a sentence transformer."""
    texts = [article["title"] for article in articles]  # Only using the title
    embeddings = []

    print("🔄 Generating embeddings...")
    for text in tqdm(texts, desc="Encoding", unit="article"):
        embedding = MODEL.encode(text, convert_to_numpy=True)  # Convert to NumPy
        embeddings.append(embedding)

    return np.array(embeddings).astype("float32")  # Convert to float32 for FAISS


def save_to_faiss(embeddings):
    """Stores embeddings in a FAISS index."""
    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)  # L2 distance (Euclidean)
    index.add(embeddings)  # Add embeddings

    faiss.write_index(index, FAISS_INDEX_FILE)
    print(f"✅ FAISS index saved to {FAISS_INDEX_FILE}")


# **🚀 Main Execution**
if __name__ == "__main__":
    print("📂 Fetching articles from MongoDB...")
    articles = load_articles_from_mongo()

    if not articles:
        print("❌ No articles found in MongoDB. Exiting.")
        exit()

    print(f"✅ Loaded {len(articles)} articles.")
    save_articles_to_json(articles)  # Backup to JSON

    embeddings = generate_embeddings(articles)  # Encode text → embeddings
    save_to_faiss(embeddings)  # Save embeddings to FAISS

    print("🎯 MongoDB articles successfully converted to a FAISS vector database!")
