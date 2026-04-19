from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()
    

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
