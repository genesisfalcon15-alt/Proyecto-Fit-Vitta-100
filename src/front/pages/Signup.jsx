import React, { useState } from "react";
import CloudinaryUpload from "../components/CloudinaryUpload.jsx";

const Signup = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    altura: "",
    peso: "",
    genero: ""
  });

  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleUpload = (url) => {
    setImageUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: form.nombre,
          apellidos: form.apellidos,
          email: form.email,
          password: form.password,
          altura: form.altura,
          peso: form.peso,
          genero: form.genero,
          image: imageUrl
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Usuario creado correctamente ✅");
        window.location.href = "/signin";
      } else {
        alert(data.msg || "Error al registrarse");
      }

    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #6e8a4f, #a3b18a)"
      }}
    >
      <div
        className="shadow-lg p-4"
        style={{
          width: "420px",
          borderRadius: "20px",
          backgroundColor: "#fff",
          backdropFilter: "blur(10px)"
        }}
      >
        <div className="text-center mb-3">
          <h2 style={{ fontWeight: "700", color: "#3b3b3b" }}>
            🏋️ Sign Up
          </h2>
          <p style={{ fontSize: "14px", color: "#777" }}>
            Únete a Fit Vitta y empieza tu progreso
          </p>
        </div>

        <div className="text-center mb-3">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="perfil"
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #6e8a4f"
              }}
            />
          ) : (
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                backgroundColor: "#eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                fontSize: "12px",
                color: "#888"
              }}
            >
              Foto
            </div>
          )}
        </div>

        <div className="text-center mb-3">
          <CloudinaryUpload onUpload={handleUpload} />
        </div>

        <form onSubmit={handleSubmit}>

          <div className="row">
            <div className="col-md-6 mb-2">
              <input
                className="form-control"
                placeholder="Nombre"
                name="nombre"
                onChange={handleChange}
                style={{ borderRadius: "10px" }}
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                className="form-control"
                placeholder="Apellidos"
                name="apellidos"
                onChange={handleChange}
                style={{ borderRadius: "10px" }}
              />
            </div>
          </div>

          <input
            className="form-control mb-2"
            placeholder="Correo"
            name="email"
            onChange={handleChange}
            style={{ borderRadius: "10px" }}
          />

          <input
            className="form-control mb-2"
            placeholder="Confirmar correo"
            name="confirmEmail"
            onChange={handleChange}
            style={{ borderRadius: "10px" }}
          />

          <input
            type="password"
            className="form-control mb-2"
            placeholder="Contraseña"
            name="password"
            onChange={handleChange}
            style={{ borderRadius: "10px" }}
          />

          <input
            type="password"
            className="form-control mb-2"
            placeholder="Confirmar contraseña"
            name="confirmPassword"
            onChange={handleChange}
            style={{ borderRadius: "10px" }}
          />

          <div className="row mb-2">
            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="Altura (cm)"
                name="altura"
                type="number"
                onChange={handleChange}
                style={{ borderRadius: "10px" }}
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="Peso (kg)"
                name="peso"
                type="number"
                onChange={handleChange}
                style={{ borderRadius: "10px" }}
              />
            </div>
          </div>

          <select
            className="form-control mb-3"
            name="genero"
            onChange={handleChange}
            style={{ borderRadius: "10px", color: form.genero ? "#3b3b3b" : "#888" }}
          >
            <option value="">Género</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>

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
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;