from flask import Blueprint, request, jsonify
from api.models import db, User, UserStats, HistorialPeso
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import bcrypt

api = Blueprint('api', __name__)


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not data.get("email") or not data.get("password"):
        return jsonify({"msg": "Email y contraseña son obligatorios"}), 400

    existing_user = User.query.filter_by(email=data["email"]).first()
    if existing_user:
        return jsonify({"msg": "El usuario ya existe"}), 400

    hashed_password = bcrypt.hashpw(
        data["password"].encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    new_user = User(
        nombre=data.get("nombre"),
        apellidos=data.get("apellidos"),
        email=data.get("email"),
        password=hashed_password,
        genero=data.get("genero"),
        is_active=True
    )

    db.session.add(new_user)
    db.session.commit()

    new_stats = UserStats(
        user_id=new_user.id,
        image=data.get("image", ""),
        peso=data.get("peso"),
        altura=data.get("altura")
    )

    db.session.add(new_stats)
    db.session.commit()

    return jsonify({
        "msg": "Usuario creado correctamente",
        "user": new_user.serialize()
    }), 201


@api.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    if not data.get("email") or not data.get("password"):
        return jsonify({"msg": "Email y contraseña son obligatorios"}), 400

    user = User.query.filter_by(email=data["email"]).first()
    if not user:
        return jsonify({"msg": "Correo o contraseña incorrectos"}), 401

    password_valid = bcrypt.checkpw(
        data["password"].encode("utf-8"),
        user.password.encode("utf-8")
    )
    if not password_valid:
        return jsonify({"msg": "Correo o contraseña incorrectos"}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({"token": token, "user": user.serialize()}), 200


@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    return jsonify({"user": user.serialize()}), 200


@api.route('/user/stats', methods=['GET'])
@jwt_required()
def get_user_stats():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or not user.stats:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    return jsonify({"peso": user.stats.peso, "altura": user.stats.altura}), 200


@api.route('/user/stats', methods=['PUT'])
@jwt_required()
def update_user_stats():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or not user.stats:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    data = request.get_json()
    if "peso" in data:
        user.stats.peso = data["peso"]
    if "altura" in data:
        user.stats.altura = data["altura"]
    db.session.commit()
    return jsonify({"msg": "Datos actualizados correctamente", "peso": user.stats.peso, "altura": user.stats.altura}), 200


@api.route('/user/stats', methods=['DELETE'])
@jwt_required()
def delete_user_stats():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or not user.stats:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    user.stats.peso = None
    user.stats.altura = None
    db.session.commit()
    return jsonify({"msg": "Peso y altura eliminados correctamente"}), 200


# ── HistorialPeso ──────────────────────────────────────────────────────────────

@api.route('/user/historial', methods=['POST'])
@jwt_required()
def add_historial():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    data = request.get_json()
    if not data.get("peso") or not data.get("altura"):
        return jsonify({"msg": "Peso y altura son obligatorios"}), 400

    entrada = HistorialPeso(
        user_id=user.id,
        peso=data["peso"],
        altura=data["altura"]
    )
    db.session.add(entrada)
    db.session.commit()

    return jsonify({
        "msg": "Entrada añadida al historial",
        "entrada": entrada.serialize()
    }), 201


@api.route('/user/historial', methods=['GET'])
@jwt_required()
def get_historial():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    historial = HistorialPeso.query.filter_by(user_id=user.id)\
        .order_by(HistorialPeso.fecha.asc()).all()

    return jsonify([entrada.serialize() for entrada in historial]), 200


@api.route('/user/historial/<int:entrada_id>', methods=['DELETE'])
@jwt_required()
def delete_historial_entrada(entrada_id):
    current_user_id = get_jwt_identity()
    entrada = HistorialPeso.query.filter_by(id=entrada_id, user_id=current_user_id).first()
    if not entrada:
        return jsonify({"msg": "Entrada no encontrada"}), 404

    db.session.delete(entrada)
    db.session.commit()
    return jsonify({"msg": "Entrada eliminada correctamente"}), 200