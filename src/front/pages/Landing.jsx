import React from "react";
import { useNavigate } from "react-router-dom";
import fondoNaturaleza from "../assets/img/fondo_naturaleza.jpg";
import logoVittaVerde from "../assets/img/logo-vitta.png";
import Login from "./Signin";
import Signup from "./Signup";

export const Landing = () => {
    // Hook de navegación para cambiar de rutas
    const navigate = useNavigate();

    return (
        <div
            // Contenedor principal ocupando toda la pantalla
            className="vh-100 position-relative"
            style={{
                backgroundImage: `url(${fondoNaturaleza})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                    background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)",
                }} />
            <div
                className="position-relative d-flex flex-column align-items-center h-100 px-4"
                style={{ zIndex: 2 }}>
                <div className="text-center pt-5 mt-4 mb-auto">
                    <img
                        src={logoVittaVerde}
                        alt="Logo VITTA"
                        className="img-fluid"
                        style={{
                            maxHeight: '120px',
                            marginBottom: '10px'
                        }} />
                    <p
                        style={{
                            color: '#4a5043',
                            fontSize: '1rem',
                            fontWeight: '400',
                            letterSpacing: '1px'
                        }}>
                        Comienza tu nueva VITTA
                    </p>
                </div>
                <div
                    className="d-flex flex-column align-items-center w-100 mb-5 pb-5"
                    style={{ maxWidth: '600px' }}>
                    <div className="d-flex flex-row justify-content-center gap-3 w-100">

                        <button
                            className="btn py-3 fw-bold shadow-sm flex-fill"
                            style={{
                                borderRadius: '12px',
                                backgroundColor: '#dce5d1',
                                color: '#4a5043',
                                fontSize: '0.9rem',
                                border: 'none'
                            }}
                            onClick={() => navigate("/signin")}
                        >
                            INICIAR SESIÓN
                        </button>


                        <button
                            className="btn py-3 fw-bold shadow-sm flex-fill"
                            style={{
                                borderRadius: '12px',
                                backgroundColor: '#dce5d1',
                                color: '#4a5043',
                                fontSize: '0.9rem',
                                border: 'none'
                            }}
                            onClick={() => navigate("/signup")}
                        >
                            REGISTRARME
                        </button>
                    </div>


                    <button
                        className="btn mt-4"
                        style={{
                            color: '#4a5043',
                            fontSize: '0.85rem',
                            textDecoration: 'underline',
                            background: 'none',
                            border: 'none',
                            opacity: 0.8
                        }}
                        onClick={() => navigate("/home")}
                    >Entrar sin sesión
                    </button>
                </div>

                <p
                    className="mb-4"
                    style={{
                        fontSize: '11px',
                        color: '#6c7860',
                        opacity: 0.7
                    }} >
                    © 2026 VITTA
                </p>

            </div>
        </div>
    );
};