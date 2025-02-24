from pymongo import MongoClient
import json

# MongoDB connection details
MONGO_URI = "mongodb://localhost:27017/"  # Replace with your MongoDB URI if different
DATABASE_NAME = "ScribeGen"  # Replace with your database name
COLLECTION_NAME = "Scribe-Scrape-Data"  # Replace with your collection name


def insert_data_to_mongodb(json_data):
    """
    Inserts JSON data into a MongoDB collection.

    Args:
        json_data (list): A list of JSON objects to insert.
    """

    try:
        # Connect to MongoDB
        client = MongoClient(MONGO_URI)
        db = client[DATABASE_NAME]
        collection = db[COLLECTION_NAME]

        # Insert the data
        if isinstance(json_data, list):
            collection.insert_many(json_data)  # Insert multiple documents
            print(f"Inserted {len(json_data)} documents into {COLLECTION_NAME}")
        else:
            print("Invalid data format. Provide a list of JSON objects.")
            return

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        # Close the connection
        client.close()

# Function to read and process the JSON file
def read_and_process_json(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Split the content into valid JSON objects
        json_objects = content.split('}\n{')  # Split at each instance of '}\n{'
        
        # Wrap each object in braces and create a list
        json_data = []
        for json_str in json_objects:
            # Clean up the string and ensure proper formatting
            if json_str.startswith('{'):
                json_str += '}'
            else:
                json_str = '{' + json_str + '}'
            
            # Load the individual JSON object
            json_data.append(json.loads(json_str))
        
        return json_data

    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found.")
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON from file '{file_path}': {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# Example Usage:
file_path = "scraped_articles.json"  # Replace with the actual path to your JSON file

# Read and process the JSON file
data = read_and_process_json(file_path)

# Insert data into MongoDB if data is valid
if data:
    insert_data_to_mongodb(data)
