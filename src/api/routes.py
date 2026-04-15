"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask import Blueprint, request, jsonify

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    user = {
        "nombre": data["nombre"],
        "apellidos": data["apellidos"],
        "email": data["email"],
        "password": data["password"],
        "image": data.get("image", "")
    }

    users.append(user)

    return jsonify({
        "msg": "Usuario creado correctamente",
        "user": user
    }), 201