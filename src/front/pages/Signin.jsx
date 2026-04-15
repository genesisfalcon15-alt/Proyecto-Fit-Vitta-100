import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!correo || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    alert("Formulario enviado ✅");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#6e8b4f" }}
    >
      <div
        className="card p-4 shadow"
        style={{
          width: "350px",
          borderRadius: "15px",
          backgroundColor: "#f2f2f2",
        }}
      >
        <h2 className="text-center mb-4 text-dark">Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-danger small">{error}</p>
          )}

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#6e8b4f",
              color: "white",
              borderRadius: "8px",
            }}
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-center mt-3 text-dark">
          ¿No tienes cuenta?{" "}
          <Link to="/signup" style={{ color: "#6e8b4f", fontWeight: "bold" }}>
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;