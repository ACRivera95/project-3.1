from flask import Flask, jsonify
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS

# Create a new Flask application
app = Flask(__name__)
CORS(app, resources={r"/api/*":{"origins":"http://127.0.0.1:8001"}})

# Connect to your MongoDB database
client = MongoClient('mongodb://localhost:27017/')
db = client['Pokemon_data']
collection = db['pokemonData']

# Define your API endpoint


@app.route('/api/names', methods=['GET'])
def get_names():
    # Retrieve all documents from the collection
    documents = collection.find()

    # Extract the names from the documents
    names = [doc['Name'] for doc in documents]

    # Return the names as a JSON response
    return jsonify({'names': names})


@app.route('/api/all', methods=['GET'])
def get_all_data():
    # Retrieve all documents from the collection
    documents = collection.find()

    # Convert the documents to a list of dictionaries
    data = [doc for doc in documents]

    # Convert ObjectId to string for serialization
    for doc in data:
        doc['_id'] = str(doc['_id'])

    # Return the data as a JSON response
    return jsonify({'data': data})

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
    
#http://127.0.0.1:5000/api/names
