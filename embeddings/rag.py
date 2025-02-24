import faiss
import numpy as np
import json
import os
import requests
from sentence_transformers import SentenceTransformer
import datetime
MISTRAL_API_KEY = "Your API KEY"
FAISS_INDEX_FILE = "vector_index.faiss"
ARTICLES_JSON_FILE = "articles_backup.json"
today = datetime.date.today()

MODEL = SentenceTransformer("all-MiniLM-L6-v2")

def load_faiss_index():
    if not os.path.exists(FAISS_INDEX_FILE):
        print("❌ FAISS index file not found!")
        exit()
    
    index = faiss.read_index(FAISS_INDEX_FILE)
    return index

def load_articles():
    if not os.path.exists(ARTICLES_JSON_FILE):
        print("❌ Articles JSON file not found!")
        exit()
    
    with open(ARTICLES_JSON_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def retrieve_similar_articles(query, top_k=3):
    """Encodes query, searches FAISS, and retrieves top-K similar articles."""
    query_embedding = MODEL.encode(query, convert_to_numpy=True).astype("float32")
    query_embedding = np.expand_dims(query_embedding, axis=0)  # Reshape for FAISS

    distances, indices = faiss_index.search(query_embedding, top_k)

    retrieved_articles = []
    for idx in indices[0]:
        if idx < len(articles):
            retrieved_articles.append(articles[idx]) 
    
    return retrieved_articles

def query_mistral(prompt, context):
    """Sends a prompt + retrieved context to Mistral API and gets a response."""
    url = "https://api.mistral.ai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {MISTRAL_API_KEY}",
        "Content-Type": "application/json"
    }

    full_prompt = f"""
    You are an advanced AI assistant. Use the following context to answer the user's question accurately. Use all Information you have relating to the context as of {today}.
    You have to be honest and clear, and if there are any gaps in your context or information try to connect and map out information to make links and explain.

    CONTEXT:
    {context}

    QUESTION:
    {prompt}

    Answer concisely.
    """

    payload = {
        "model": "mistral-medium",  # Change if using different model
        "messages": [{"role": "user", "content": full_prompt}],
        "temperature": 0.7
    }

    response = requests.post(url, headers=headers, json=payload)
    
    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"]
    else:
        return f"❌ API Error: {response.text}"

if __name__ == "__main__":
    print("🔄 Loading FAISS Index and Articles...")
    faiss_index = load_faiss_index()
    articles = load_articles()
    print(f"✅ Loaded {len(articles)} articles and FAISS index!")

    while True:
        user_query = input("\n🔍 Enter your query (or type 'exit' to quit): ")
        if user_query.lower() == "exit":
            print("👋 Exiting...")
            break
        
        similar_articles = retrieve_similar_articles(user_query, top_k=3)

        context_text = "\n".join([f"- {a['title']} (Source: {a['source']})" for a in similar_articles])

        llm_response = query_mistral(user_query, context_text)

        print("\n📜 **Mistral AI Response:**")
        print(llm_response)
