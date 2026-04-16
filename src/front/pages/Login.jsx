import React, { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("token", data.token);
        window.location.href = "/private";
      } else {
        alert(data.msg || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(135deg, #6e8a4f, #a3b18a)" }}
    >
      <div
        className="shadow-lg p-4"
        style={{ width: "380px", borderRadius: "20px", backgroundColor: "#fff" }}
      >
        <div className="text-center mb-4">
          <h2 style={{ fontWeight: "700", color: "#3b3b3b" }}>🏋️ Login</h2>
          <p style={{ fontSize: "14px", color: "#777" }}>Inicia sesión en Fit Vitta</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Correo"
            name="email"
            onChange={handleChange}
            style={{ borderRadius: "10px" }}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Contraseña"
            name="password"
            onChange={handleChange}
            style={{ borderRadius: "10px" }}
          />
          <button
            type="submit"
            className="btn w-100"
            style={{
              background: "#6e8a4f",
              color: "white",
              borderRadius: "10px",
              padding: "10px",
              fontWeight: "600"
            }}
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;