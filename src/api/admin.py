import os
from flask_admin import Admin
from .models import db, User, UserStats, HistorialPeso, Product
from flask_admin.contrib.sqla import ModelView



class UserAdmin(ModelView):
    column_list = ['id', 'nombre', 'apellidos', 'email', 'genero', 'is_active', 'password']
    column_searchable_list = ['email', 'nombre', 'apellidos']


class UserStatsAdmin(ModelView):
    column_list = ['id', 'user_id', 'image', 'peso', 'altura']


class HistorialPesoAdmin(ModelView):
    column_list = ['id', 'user_id', 'peso', 'altura', 'fecha']
    column_default_sort = ('fecha', True)

class ProductsAdmin(ModelView):
    column_list = ['id', 'name', 'store', 'price']


class ProductAdmin(ModelView):
    column_list = ['id', 'name', 'store', 'price', 'category', 'image', 'added']
    column_searchable_list = ['name', 'store', 'category']


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    admin = Admin(app, name='4Geeks Admin')

    admin.add_view(UserAdmin(User, db.session))
    admin.add_view(UserStatsAdmin(UserStats, db.session))
    admin.add_view(HistorialPesoAdmin(HistorialPeso, db.session))
    admin.add_view(ProductsAdmin(Product, db.session))
