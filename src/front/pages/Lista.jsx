import React, { useState } from "react";


function Lista() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const [price, setPrice] = useState("");
  const [store, setStore] = useState("");

  const addProduct = () => {
    if (!newProduct || !price || !store) return;

    const image = `https://loremflickr.com/40/40/${newProduct}`;

    const newItem = {
      id: Date.now(),
      name: newProduct,
      store: store,
      price: parseFloat(price),
      added: false,
      image: image,
    };

    setProducts([...products, newItem]);
    setNewProduct("");
    setPrice("");
    setStore("");
  };

  const toggleProduct = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, added: !p.added } : p
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProducts =
    search.length >= 3
      ? products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
      : products;

  const totalAdded = products.filter((p) => p.added).length;

  return (
    <div id="app-container">

      {/* HEADER */}
      <nav className="navbar">
        <h1 className="vitta-title">VITTA</h1>
        <span className="text-muted">🛒 {totalAdded}</span>
      </nav>

      {/* CONTENIDO */}
      <div className="container-fluid p-3">

        <h4>Los favoritos de VITTA</h4>
        <p className="text-muted">
          Encuentra las mejores ofertas para ti
        </p>

        {/* BUSCADOR */}
        <input
          className="form-control mb-3"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* FORMULARIO */}
        <div className="vitta-card-resumen mb-3">
          <input
            className="form-control mb-2"
            placeholder="Producto"
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
          />
          <input
            className="form-control mb-2"
            placeholder="Supermercado"
            value={store}
            onChange={(e) => setStore(e.target.value)}
          />
          <input
            className="form-control mb-2"
            type="number"
            placeholder="€"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button
            className="btn-negro-transparente w-100"
            onClick={addProduct}
          >
            Añadir producto
          </button>
        </div>

        {/* LISTA */}
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="vitta-card-resumen mb-2 d-flex justify-content-between align-items-center"
            onClick={() => toggleProduct(product.id)}
          >
            <div className="d-flex align-items-center">
              <img
                src={product.image}
                alt={product.name}
                className="rounded-circle me-2"
                width="40"
              />
              <div>
                <p className="mb-0">{product.name}</p>
                <small className="text-muted">
                  {product.store}
                </small>
              </div>
            </div>

            <div>
              <strong>€{product.price.toFixed(2)}</strong>

              <button
                className="ms-2"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteProduct(product.id);
                }}
              >
                ❌
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Lista;
