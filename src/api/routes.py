from flask import Blueprint, request, jsonify
from api.models import db, User, UserStats, Product
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import bcrypt

api = Blueprint('api', __name__)


@api.route("/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify([p.serialize() for p in products]), 200



@api.route("/products", methods=["POST"])
def create_product():
    data = request.get_json()

    new_product = Product(
        name=data["name"],
        store=data["store"],
        price=data["price"],
        category=data["category"],
        image=data.get("image"),
        added=False
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
