"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


from flask import request, jsonify


users = []

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    # Validación básica, si no se rellena ni Email ni Contraseña
    if not data.get("email") or not data.get("password"):
        return jsonify({"msg": "Email y Contraseña son obligatorios"}), 400

    # Evitar duplicados si ya existe un email y se introduce ese mismo devuelve error 
    existing_user = next((u for u in users if u["email"] == data["email"]), None)
    if existing_user:
        return jsonify({"msg": "El usuario ya existe"}), 400

    # Creacion usuario: Datos que se piden
    user = {
        "id": len(users) + 1,
        "nombre": data.get("nombre"),
        "apellidos": data.get("apellidos"),
        "email": data.get("email"),
        "password": data.get("password"),
        "altura": data.get("altura"),
        "peso": data.get("peso"),
        "genero": data.get("genero"),
        "image": data.get("image", "")
    }

    users.append(user)

    return jsonify({
        "msg": "Usuario creado correctamente",
        "user": user
    }), 201

@api.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    
    # Verificacion de Credenciales
    user = next(
        (u for u in users if u["email"] == data.get("email") and u["password"] == data.get("password")),
        None
    )
    # En caso de introducir credenciales
    if not user:
        return jsonify({"msg": "Correo o contraseña incorrecta , intente de nuevo"}), 401

    # Creacion del token para el usuario
    token = create_access_token(identity=user["id"])

    return jsonify({
        "token": token,
        "user": user
    }), 200
