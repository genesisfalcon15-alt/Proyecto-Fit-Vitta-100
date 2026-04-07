import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#6e8a4f" }}
    >
      <div className="card shadow p-4" style={{ width: "400px", borderRadius: "15px" }}>
        
        <h2 className="text-center mb-4">Sign Up</h2>

        <form>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="nombre"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Apellidos"
                name="apellidos"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Correo"
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Confirmar correo"
              name="confirmEmail"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              name="password"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirmar contraseña"
              name="confirmPassword"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 text-white"
            style={{ backgroundColor: "#6e8a4f" }}
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;