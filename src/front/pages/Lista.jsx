import React, { useState, useEffect } from "react";
import { fetchListaCompraIA } from "../services/aiService";

function Lista() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showBasket, setShowBasket] = useState(false);
  const [listaIA, setListaIA] = useState(null);
  const [loadingIA, setLoadingIA] = useState(false);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);

  const API = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const authHeaders = token
    ? { Authorization: "Bearer " + token }
    : {};

  const categoryImages = {
    lacteos: "https://images.unsplash.com/photo-1563636619-e9143da7973b",
    frutas_verduras:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=100&h=100&fit=crop",
    carnes_aves:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=100&h=100&fit=crop",
    pescados_mariscos:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
    panaderia:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop",
  };

  const getStoreBadge = (store) => {
    return (store || "VI").slice(0, 2).toUpperCase();
  };

  useEffect(() => {
    fetch(`${API}/api/products`, {
      headers: authHeaders,
    })
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".basket-wrapper")) {
        setShowBasket(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () =>
      document.removeEventListener("click", handleClickOutside);
  }, []);

  const deleteProduct = async (id) => {
    try {
      await fetch(`${API}/api/products/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("DELETE error:", err);
    }
  };

  const toggleProduct = async (id) => {
    try {
      const product = products.find((p) => p.id === id);

      const res = await fetch(`${API}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders,
        },
        body: JSON.stringify({ added: !product.added }),
      });

      const updated = await res.json();

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      );
    } catch (err) {
      console.error("PUT error:", err);
    }
  };

  const filteredProducts =
    search.length >= 3
      ? products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
      : products;

  const totalAdded = Array.isArray(products)
    ? products.filter((p) => p.added).length
    : 0;

  const addedProducts = products.filter((p) => p.added);
  const generarListaIA = async () => {
    setLoadingIA(true);

    try {
      const imcGuardado =
        localStorage.getItem("vitta_valor_imc") || "22";

      const data = await fetchListaCompraIA(imcGuardado);

      setListaIA(data);
    } catch (error) {
      console.error("Error generando lista IA:", error);
    } finally {
      setLoadingIA(false);
    }
  };

  const guardarProductoIA = async (item) => {
    try {
      const productoIA = {
        name: item.nombre,
        store: item.supermercado || "VITTA",
        price: Number(item.precio_estimado || 0),
        category: item.categoria || "frutas_verduras",
        image:
          categoryImages[item.categoria] ||
          categoryImages.frutas_verduras,
      };

      const res = await fetch(`${API}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders,
        },
        body: JSON.stringify(productoIA),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error backend guardando IA:", errorText);
        alert("No se pudo guardar el producto IA");
        return;
      }

      const data = await res.json();
      setProducts((prev) => [...prev, data]);

      alert("Producto guardado en favoritos");
    } catch (err) {
      console.error("Error guardando producto IA:", err);
      alert("Error guardando producto IA");
    }
  };

  return (
    <div
      id="app-container"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #6f8c57 0%, #2f3d27 100%)",
        paddingBottom: "0px",
      }}
    >
      <nav className="navbar">
        <div
          className="basket-wrapper"
          style={{ position: "relative", cursor: "pointer" }}
          onClick={() => setShowBasket((prev) => !prev)}
        >
          {totalAdded > 0 && (
            <span
              style={{
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
                lineHeight: "1",
              }}
            >
              {totalAdded}
            </span>
          )}

          {showBasket && (
            <div
              style={{
                position: "absolute",
                top: "35px",
                right: "0",
                background: "white",
                width: "260px",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                padding: "10px",
                zIndex: 999,
              }}
            >
              <h6 style={{ marginBottom: "10px" }}>Cesta</h6>

              {addedProducts.length === 0 ? (
                <p style={{ fontSize: "13px", color: "#777" }}>
                  No hay productos seleccionados
                </p>
              ) : (
                addedProducts.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        background: "#6e8a4f",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "900",
                        fontSize: "10px",
                        flexShrink: 0,
                      }}
                    >
                      {getStoreBadge(p.store)}
                    </div>

                    <div style={{ fontSize: "13px" }}>
                      <div>{p.name}</div>
                      <small>€{Number(p.price).toFixed(2)}</small>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </nav>

      <div
        className="container-fluid p-3 pb-3"
        style={{ marginTop: "-12px" }}
      >
        <div style={{ marginBottom: "18px", marginTop: "-10px" }}>
          <h2
            style={{
              color: "white",
              fontSize: "30px",
              fontWeight: "900",
              letterSpacing: "-1px",
              marginBottom: "4px",
              lineHeight: "1",
            }}
          >
            Compra Inteligente{" "}
            <i
              className="fas fa-shopping-basket"
              style={{ fontSize: "22px", color: "white" }}
            ></i>
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "12px",
              fontWeight: "800",
              letterSpacing: "3px",
              textTransform: "uppercase",
              margin: 0,
              marginTop: "10px",
            }}
          >
            Productos y ofertas
          </p>
        </div>

        <div className="vitta-card-resumen mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <h6
                style={{
                  color: "#333",
                  fontWeight: "800",
                  margin: 0,
                }}
              >
                Recomendaciones VITTA
              </h6>

              <small style={{ color: "#666" }}>
                Lista saludable para 14 días
              </small>
            </div>

            <i
              className="fas fa-robot"
              style={{
                color: "#6e8a4f",
                fontSize: "20px",
              }}
            ></i>
          </div>

          <button
            onClick={generarListaIA}
            disabled={loadingIA}
            style={{
              backgroundColor: "#556B2F",
              color: "white",
              border: "none",
              padding: "10px",
              width: "100%",
              borderRadius: "10px",
              fontWeight: "700",
              marginTop: "8px",
            }}
          >
            {loadingIA
              ? "Generando lista..."
              : "Generar lista con VITTA"}
          </button>

          {listaIA && (
            <div style={{ marginTop: "14px" }}>
              <p
                style={{
                  color: "#333",
                  fontSize: "13px",
                  marginBottom: "8px",
                }}
              >
                <strong>Objetivo:</strong> {listaIA.objetivo}
              </p>

              {listaIA.productos_recomendados?.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "#f7f9f5",
                    borderRadius: "14px",
                    padding: "10px",
                    marginBottom: "8px",
                    border: "1px solid #e0e8d8",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "8px",
                    }}
                  >
                    <strong
                      style={{
                        color: "#333",
                        fontSize: "13px",
                      }}
                    >
                      {item.nombre}
                    </strong>

                    <span
                      style={{
                        color: "#6e8a4f",
                        fontSize: "12px",
                        fontWeight: "800",
                      }}
                    >
                      €{Number(item.precio_estimado || 0).toFixed(2)}
                    </span>
                  </div>

                  <small style={{ color: "#777" }}>
                    {item.categoria} · {item.supermercado}
                  </small>

                  <button
                    onClick={() => guardarProductoIA(item)}
                    style={{
                      marginTop: "8px",
                      backgroundColor: "#6e8a4f",
                      color: "white",
                      border: "none",
                      padding: "7px 10px",
                      borderRadius: "10px",
                      fontSize: "12px",
                      fontWeight: "700",
                      width: "100%",
                    }}
                  >
                    Guardar en favoritos
                  </button>
                </div>
              ))}

              {listaIA.consejo && (
                <p
                  style={{
                    color: "#666",
                    fontSize: "12px",
                    marginTop: "10px",
                    marginBottom: 0,
                  }}
                >
                  {listaIA.consejo}
                </p>
              )}
            </div>
          )}
        </div>
        <div
          onClick={() => setMostrarFavoritos(!mostrarFavoritos)}
          style={{
            background: "rgba(255,255,255,0.16)",
            borderRadius: "24px",
            padding: "18px",
            marginBottom: "18px",
            backdropFilter: "blur(10px)",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h5
                style={{
                  color: "white",
                  fontWeight: "900",
                  margin: 0,
                  letterSpacing: "0.5px",
                }}
              >
                ⭐ MIS PRODUCTOS
              </h5>

              <small
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontWeight: "700",
                }}
              >
                ({filteredProducts.length}) productos guardados
              </small>
            </div>

            <i
              className={`fas ${mostrarFavoritos
                ? "fa-chevron-up"
                : "fa-chevron-right"
                }`}
              style={{
                color: "white",
                fontSize: "18px",
              }}
            ></i>
          </div>
        </div>

        {mostrarFavoritos && (
          <div style={{ marginTop: "10px" }}>
            {filteredProducts.length === 0 ? (
              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "13px",
                }}
              >
                Aún no tienes productos guardados.
              </p>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => toggleProduct(product.id)}
                  style={{
                    background: product.added
                      ? "#c2c9c2"
                      : "#ffffff",
                    color: product.added ? "white" : "#333",
                    borderRadius: "16px",
                    padding: "12px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "0.2s",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div
                      className="me-2"
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        background: "#6e8a4f",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "900",
                        fontSize: "13px",
                        border: "2px solid white",
                        flexShrink: 0,
                      }}
                    >
                      {getStoreBadge(product.store)}
                    </div>

                    <div>
                      <p
                        className="mb-0"
                        style={{
                          color: product.added
                            ? "white"
                            : "#333",
                          fontWeight: "700",
                          textDecoration: product.added
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {product.name}
                      </p>

                      <small
                        style={{
                          color: "rgba(11, 11, 11, 0.7)",
                        }}
                      >
                        {product.store}
                      </small>
                    </div>
                  </div>

                  <div>
                    <strong>
                      €{Number(product.price || 0).toFixed(2)}
                    </strong>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProduct(product.id);
                      }}
                      style={{
                        background: "rgba(110,138,79,0.18)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        color: "#6e8a4f",
                        borderRadius: "50%",
                        width: "42px",
                        height: "42px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "0.2s",
                        marginTop: "8px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.10)",
                      }}
                    >
                      <i
                        className="fas fa-trash-alt"
                        style={{
                          fontSize: "15px",
                          color: "#6e8a4f",
                        }}
                      ></i>
                    </button>

                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div >
  );
}

export default Lista;