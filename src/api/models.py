from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(100), nullable=False)
    apellidos: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    genero: Mapped[str] = mapped_column(String(20), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)

    stats: Mapped["UserStats"] = relationship("UserStats", back_populates="user", uselist=False)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellidos": self.apellidos,
            "email": self.email,
            "genero": self.genero,
            "stats": self.stats.serialize() if self.stats else None
        }


class UserStats(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    image: Mapped[str] = mapped_column(String(300), nullable=True)
    peso: Mapped[float] = mapped_column(Float, nullable=True)
    altura: Mapped[float] = mapped_column(Float, nullable=True)

    user: Mapped["User"] = relationship("User", back_populates="stats")

    def serialize(self):
        return {
            "peso": self.peso,
            "altura": self.altura,
            "image": self.image
            
        }
    

class Product(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    store: Mapped[str] = mapped_column(String(120), nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False)
    image: Mapped[str] = mapped_column(String(300), nullable=True)
    added: Mapped[bool] = mapped_column(Boolean, default=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "store": self.store,
            "price": self.price,
            "category": self.category,
            "image": self.image,
            "added": self.added
}
