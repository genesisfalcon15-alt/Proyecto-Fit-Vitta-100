from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Float, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, timezone

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(100), nullable=False)
    apellidos: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    genero: Mapped[str] = mapped_column(String(20), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)

    stats: Mapped["UserStats"] = relationship("UserStats", back_populates="user", uselist=False)
    historial_peso: Mapped[list["HistorialPeso"]] = relationship("HistorialPeso", back_populates="user")

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


class HistorialPeso(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    peso: Mapped[float] = mapped_column(Float, nullable=False)
    altura: Mapped[float] = mapped_column(Float, nullable=False)
    fecha: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    user: Mapped["User"] = relationship("User", back_populates="historial_peso")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "peso": self.peso,
            "altura": self.altura,
            "fecha": self.fecha.isoformat()
        }