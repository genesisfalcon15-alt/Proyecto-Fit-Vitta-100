import React, { useState } from "react";


function Lista() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const [price, setPrice] = useState("");
  const [store, setStore] = useState("");
  const [category, setCategory] = useState("");

  const categoryImages = {
    lacteos: "/images/lacteos.jpg",
    frutas_verduras: "/images/frutas.jpg",
    carnes_aves: "/images/carne.jpg",
    pescados_mariscos: "/images/pescado.jpg",
    panaderia: "/public/pan.jpeg",
  };

  const addProduct = () => {
    if (!newProduct.trim() || !price || !store.trim() || !category) return;

    const newItem = {
      id: Date.now(),
      name: newProduct,
      store: store,
      price: parseFloat(price),
      category: category,
      image: categoryImages[category],
      added: false,
  
    };

    setProducts([...products, newItem]);
    setNewProduct("");
    setPrice("");
    setStore("");
    setCategory("");
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
    <div 
      id="app-container"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(145deg, #556B2F, #3E4E22)"
      }}
    >

      {/* HEADER */}
      <nav className="navbar">
        <h1 className="vitta-title" style={{ color:"white"}}>VITTA</h1>
        <div style={{ position: "relative", cursor: "pointer" }}>


     <i
        className="fas fa-shopping-basket"
        style={{ fontSize: "24px", color: "white" }}
      ></i>


      {totalAdded > 0 && (
        <span style={{
          position: "absolute",
          top: "-6px",
          right: "-8px",
          background: "red",
          color: "white",
          borderRadius: "50%",
          padding: "3px 6px",
          fontSize: "11px",
          fontWeight: "bold",
          minWidth: "16px",
          textAlign: "center",
          lineHeight: "1"
        }}>
          {totalAdded}
        </span>
     )}

       </div>
      </nav>

      {/* CONTENIDO */}
      <div className="container-fluid p-3">

        <h4 style={{ color: "white", fontWeight: "600" }}>Los favoritos de VITTA</h4>
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

            <select
              className="form-control mb-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >

              <option value="">Selecciona categoría</option>
              <option value="lacteos">🥛 Lácteos</option>
              <option value="frutas_verduras">🍎 Frutas y verduras</option>
              <option value="carnes_aves">🍗 Carnes y aves</option>
              <option value="pescados_mariscos">🐟 Pescados y mariscos</option>
              <option value="panaderia">🥖 Panadería</option>

            </select>
          
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
            onClick={addProduct}
            style={{
               backgroundColor: "#556B2F",
               color: "white",
               border: "none",
               padding: "10px",
               width: "100%",
               borderRadius: "8px",
               fontWeight: "600"
               

            }}
           >
            Añadir producto
          </button>
        </div>

        {/* LISTA */}
        {filteredProducts.map((product) => (
        <div
            key={product.id}
            onClick={() => toggleProduct(product.id)}
            style={{
              background: product.added ? "#2e7d32" : "#ffffff", // ⚪ blanco por defecto
              color: product.added ? "white" : "#333",
              borderRadius: "12px",
              padding: "10px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              transition: "0.2s",
            }}
            
              
          >
            <div className="d-flex align-items-center">
              <img
                src={product.image}
                alt={product.name}
                className="rounded-circle me-2"
                width="40"
              />
              <div>
                <p
                 className="mb-0"
                 style={{
                   color: product.added ? "white" : "#333",
                   fontWeight: "500",
                   textDecoration: product.added ? "line-through" : "none",
                }}
               >
                  {product.name}
               </p>
                <small style={{ color: "rgba(11, 11, 11, 0.7)" }}>
                  {product.store}
                </small>
              </div>
            </div>

            <div>
              <strong>€{product.price.toFixed(2)}</strong>

             <button
               onClick={(e) => {
                 e.stopPropagation();
                 deleteProduct(product.id);
              }}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                borderRadius: "10px",
                width: "34px",
                height: "34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "0.2s"
              }}
              onMouseOver={(e) => {
                e.target.style.background = "rgba(220, 53, 69, 0.3)";
                e.target.style.border = "1px solid rgba(220, 53, 69, 0.5)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "rgba(255,255,255,0.12)";
                e.target.style.border = "1px solid rgba(255,255,255,0.2)";
              }}
            >
              <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Lista; 
