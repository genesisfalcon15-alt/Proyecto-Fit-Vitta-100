from flask import Blueprint, request, jsonify
from api.models import db, User, UserStats, Product, HistorialPeso, FavoritoSupermercado
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import bcrypt
from flask_cors import CORS

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
    db.session.flush()  # Genera el ID sin commit todavía

    new_stats = UserStats(
        user_id=new_user.id,
        image=data.get("image", ""),
        peso=data.get("peso"),
        altura=data.get("altura")
    )
    db.session.add(new_stats)

    if data.get("peso") and data.get("altura"):
        primer_registro = HistorialPeso(
            user_id=new_user.id,
            peso=data["peso"],
            altura=data["altura"]
        )
        db.session.add(primer_registro)

    db.session.commit()

    return jsonify({
        "msg": "Usuario creado correctamente",
        "user": new_user.serialize()
    }), 201


@api.route('/signin', methods=['POST', 'OPTIONS'])
def signin():
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

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


# Historial Peso

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

    entrada = HistorialPeso.query.filter_by(
        id=entrada_id,
        user_id=current_user_id
    ).first()

    if not entrada:
        return jsonify({"msg": "Entrada no encontrada"}), 404

    db.session.delete(entrada)
    db.session.commit()

    return jsonify({"msg": "Entrada eliminada correctamente"}), 200


@api.route("/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify([p.serialize() for p in products]), 200


@api.route("/products", methods=["POST"])
@jwt_required()
def create_product():
    data = request.json
    current_user_id = get_jwt_identity()
    new_product = Product(
        name=data["name"],
        store=data["store"],
        price=data["price"],
        category=data["category"],
        image=data["image"],
        added=False,
        user_id=current_user_id
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify(new_product.serialize()), 201


@api.route("/products/<int:id>", methods=["DELETE"])
def delete_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"msg": "Not found"}), 404

    db.session.delete(product)
    db.session.commit()

    return jsonify({"msg": "deleted"}), 200


@api.route("/products/<int:id>", methods=["PUT"])
def toggle_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"msg": "Not found"}), 404

    product.added = not product.added
    db.session.commit()

    return jsonify(product.serialize()), 200


@api.route('/user/profile', methods=['PUT'])
@jwt_required()
def update_user_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    data = request.get_json()
    if "genero" in data:
        user.genero = data["genero"]
    db.session.commit()
    return jsonify({"msg": "Perfil actualizado correctamente", "user": user.serialize()}), 200


@api.route("/user/favoritos", methods=["GET"])
@jwt_required()
def get_favoritos():
    user_id = get_jwt_identity()
    favoritos = FavoritoSupermercado.query.filter_by(user_id=user_id).all()
    return jsonify([f.serialize() for f in favoritos]), 200


@api.route('/user/favoritos', methods=['POST'])
@jwt_required()
def add_favorito():
    data = request.json
    user_id = get_jwt_identity()

    nuevo = FavoritoSupermercado(
        user_id=user_id,
        place_id=data.get("place_id"),
        nombre=data.get("nombre"),
        direccion=data.get("direccion"),
        lat=data.get("lat"),
        lng=data.get("lng")
    )

    db.session.add(nuevo)
    db.session.commit()

    return jsonify(nuevo.serialize()), 200  # 🔥 CLAVE


@api.route("/user/favoritos/<int:favorito_id>", methods=["DELETE"])
@jwt_required()
def delete_favorito(favorito_id):
    user_id = get_jwt_identity()
    favorito = FavoritoSupermercado.query.filter_by(
        id=favorito_id, user_id=user_id).first()
    if not favorito:
        return jsonify({"msg": "No encontrado"}), 404
    db.session.delete(favorito)
    db.session.commit()
    return jsonify({"msg": "Eliminado"}), 200
