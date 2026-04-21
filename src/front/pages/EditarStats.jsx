import React, { useEffect, useState } from "react";

const EditarStats = () => {
  const [form, setForm] = useState({ peso: "", altura: "" });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const token = sessionStorage.getItem("token");

  // GET - cargar peso y altura al entrar
  useEffect(() => {
    if (!token) {
      window.location.href = "/signin";
      return;
    }

    fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/stats", {
      headers: { Authorization: "Bearer " + token }
    })
      .then((res) => res.json())
      .then((data) => {
        setForm({
          peso: data.peso ?? "",
          altura: data.altura ?? ""
        });
      })
      .catch(() => setError("Error al cargar los datos"));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // PUT - actualizar peso y/o altura
  const handleUpdate = async () => {
    setMensaje("");
    setError("");
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/stats", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          peso: parseFloat(form.peso),
          altura: parseFloat(form.altura)
        })
      });
      const data = await res.json();
      if (res.ok) setMensaje("✅ " + data.msg);
      else setError("❌ " + data.msg);
    } catch {
      setError("Error de conexión");
    }
  };

  // DELETE - borrar peso y altura
  const handleDelete = async () => {
    if (!confirm("¿Seguro que quieres borrar tu peso y altura?")) return;
    setMensaje("");
    setError("");
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/stats", {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token }
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje("✅ " + data.msg);
        setForm({ peso: "", altura: "" });
      } else {
        setError("❌ " + data.msg);
      }
    } catch {
      setError("Error de conexión");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(135deg, #6e8a4f, #a3b18a)" }}
    >
      <div
        className="shadow-lg p-4"
        style={{ width: "400px", borderRadius: "20px", backgroundColor: "#fff" }}
      >
        <h3 className="text-center mb-4" style={{ fontWeight: "700", color: "#3b3b3b" }}>
          📊 Mi Peso y Altura
        </h3>

        {mensaje && <div className="alert alert-success">{mensaje}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label fw-bold">Peso (kg)</label>
          <input
            className="form-control"
            name="peso"
            type="number"
            value={form.peso}
            onChange={handleChange}
            placeholder="Ej: 70.5"
            style={{ borderRadius: "10px" }}
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-bold">Altura (cm)</label>
          <input
            className="form-control"
            name="altura"
            type="number"
            value={form.altura}
            onChange={handleChange}
            placeholder="Ej: 175"
            style={{ borderRadius: "10px" }}
          />
        </div>

        <button
          className="btn w-100 mb-2"
          onClick={handleUpdate}
          style={{ background: "#6e8a4f", color: "white", borderRadius: "10px", padding: "10px", fontWeight: "600" }}
        >
          Guardar cambios
        </button>

        <button
          className="btn w-100 mb-2"
          onClick={handleDelete}
          style={{ background: "#dc3545", color: "white", borderRadius: "10px", padding: "10px", fontWeight: "600" }}
        >
          Borrar peso y altura
        </button>

        <button
          className="btn w-100"
          onClick={() => window.location.href = "/private"}
          style={{ background: "#aaa", color: "white", borderRadius: "10px", padding: "10px", fontWeight: "600" }}
        >
          Volver a mi perfil
        </button>
      </div>
    </div>
  );
};

export default EditarStats;