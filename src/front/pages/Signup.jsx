import React, { useState } from "react";
import CloudinaryUpload from "../components/CloudinaryUpload.jsx";

const Signup = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: ""
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

  const response = await fetch("http://localhost:3000/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...form,
      image: imageUrl
    })
  });

  const data = await response.json();
  console.log(data);
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

        {/* FORM */}
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
            className="form-control mb-3"
            placeholder="Confirmar contraseña"
            name="confirmPassword"
            onChange={handleChange}
            style={{ borderRadius: "10px" }}
          />

          {/* BUTTON */}
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