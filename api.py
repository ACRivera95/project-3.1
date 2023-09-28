from flask import Flask, jsonify
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS

# Create a new Flask application
app = Flask(__name__)
CORS(app, resources={r"/api/*":{"origins":"http://127.0.0.1:8001"}})

# Connect to your MongoDB database
client = MongoClient('mongodb://localhost:27017/')
db = client['PokemonDB']
collection = db['PokemonCol']

# Define your API endpoint


@app.route('/api/gen', methods=['GET'])
def get_gen():
    # Retrieve all documents from the collection
    #documents = collection.find()
    # Extract the names from the documents
    pipeline = [
        {
            '$group': {
                '_id': '$Generation', 
                'count': {
                    '$sum': 1
                }
            }
        }, {
            '$project': {
                '_id': 1
            }
        }
    ]
    gens = list(collection.aggregate(pipeline))
    gens_text = [item["_id"] for item in gens]
    #gens = list(collection.find())
    # Return the names as a JSON response
    return jsonify({'gens': gens_text})

@app.route('/api/gentypes', methods=['GET'])
def ge_gen_types():
    
    pipeline = [
        {
            '$group': {
                '_id': {
                    'G': '$Generation',
                    'T': '$Type1'
                },
                'count': {
                    '$sum': 1
                }
            }
        }, {
            '$project': {
                'G': '$_id.G',
                'T': '$_id.T',
                'count': '$count'
            }
        }
    ]
    gen_types = list(collection.aggregate(pipeline))
   # gen_types_text = [item["_id"] for item in gens]
    
    return jsonify({'genTypes': gen_types})


@app.route('/api/gen2types', methods=['GET'])
def gen_2types():
    
    pipeline = [
        {
            '$group': {
                '_id': {
                    'G': '$Generation',
                    'T1': '$Type1',
                    'T2': '$Type2'
                },
                'count': {
                    '$sum': 1
                }
            }
        }, {
            '$project': {
                'count': '$count',
                'G': '$_id.G',
                'T': [
                    '$_id.T1', '$_id.T2'
                ]
            }
        }
    ]
    gen_2types = list(collection.aggregate(pipeline))
   # gen_types_text = [item["_id"] for item in gens]
    
    return jsonify({'gen2Types': gen_2types})


@app.route('/api/total', methods=['GET'])
def get_total():
    pipeline = [
        {
            '$group': {
                '_id': {
                    'G': '$Generation',
                    'Name': '$Name',
                    'Total': '$Total'
                }
            }
        }, {
            '$project': {
                'gen': '$_id.G',
                'data': {
                    'x': '$_id.Name',
                    'y': '$_id.Total'
                }
            }
        }
    ]
    
    
    data_total= list(collection.aggregate(pipeline))
    return jsonify({'total': data_total})


@app.route('/api/max', methods=['GET'])
def get_max():
    pipeline = [
        {
            '$sort': {
                'Total': -1
            }
        }, {
            '$group': {
                '_id': '$Generation',
                'maxTotal': {
                    '$first': '$Total'
                },
                'name': {
                    '$first': '$Name'
                },
                'hp': {
                    '$first': '$HP'
                },
                'Attack': {
                    '$first': '$Attack'
                },
                'Defense': {
                    '$first': '$Defense'
                },
                'SpAtkp': {
                    '$first': '$SpAtk'
                },
                'SpDef': {
                    '$first': '$SpDef'
                },
                'Speed': {
                    '$first': '$Speed'
                },
                'ImageUrl': {
                    '$first': '$ImageUrl'
                },
                'G': {
                    '$first': '$Generation'
                }
            }
        }
    ]

    data_max = list(collection.aggregate(pipeline))
    return jsonify({'max': data_max})


# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
    
#http://127.0.0.1:5000/api/names
#http://127.0.0.1:5000/api/gentypes
#http://127.0.0.1:5000/api/gent2ypes
#http://127.0.0.1:5000/api/total
#http://127.0.0.1:5000/api/max

