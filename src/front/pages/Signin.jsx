import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.email || !form.password) {
            setError("Todos los campos son obligatorios");
            return;
        }

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify({
                    nombre: data.user.nombre,
                    apellidos: data.user.apellidos,
                    email: data.user.email,
                    image: data.user.stats?.image || null,
                }));

                window.dispatchEvent(new Event("authChange"));
                navigate("/");
            } else {
                setError(data.msg || "Error al iniciar sesión");
            }
        } catch (err) {
            console.error(err);
            setError("Error de conexión con el servidor");
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundColor: "#6e8b4f" }}
        >
            <div
                className="card p-4 shadow"
                style={{ width: "350px", borderRadius: "15px", backgroundColor: "#f2f2f2" }}
            >
                <h2 className="text-center mb-4 text-dark">Sign In</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    {error && <p className="text-danger small">{error}</p>}

                    <button
                        type="submit"
                        className="btn w-100"
                        style={{ backgroundColor: "#6e8b4f", color: "white", borderRadius: "8px" }}
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