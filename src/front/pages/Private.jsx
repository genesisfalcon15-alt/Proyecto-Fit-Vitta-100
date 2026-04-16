import React, { useEffect, useState } from "react";

const Private = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch(import.meta.env.VITE_BACKEND_URL + "/api/private", {
      headers: { Authorization: "Bearer " + token }
    })
      .then((res) => {
        if (!res.ok) {
          sessionStorage.removeItem("token");
          window.location.href = "/login";
        }
        return res.json();
      })
      .then((data) => setUser(data.user))
      .catch(() => window.location.href = "/login");
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!user) return <p className="text-center mt-5">Cargando...</p>;

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(135deg, #6e8a4f, #a3b18a)" }}
    >
      <div
        className="shadow-lg p-4 text-center"
        style={{ width: "400px", borderRadius: "20px", backgroundColor: "#fff" }}
      >
        {user.image && (
          <img
            src={user.image}
            alt="perfil"
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #6e8a4f",
              marginBottom: "15px"
            }}
          />
        )}
        <h3 style={{ fontWeight: "700", color: "#3b3b3b" }}>
          Bienvenido, {user.nombre} 👋
        </h3>
        <p style={{ color: "#777" }}>{user.email}</p>
        {user.stats && (
          <div className="mt-3">
            <p><strong>Peso:</strong> {user.stats.peso} kg</p>
            <p><strong>Altura:</strong> {user.stats.altura} cm</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="btn w-100 mt-3"
          style={{
            background: "#c0392b",
            color: "white",
            borderRadius: "10px",
            padding: "10px",
            fontWeight: "600"
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Private;