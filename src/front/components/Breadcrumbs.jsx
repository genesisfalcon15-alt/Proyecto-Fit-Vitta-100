import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Breadcrumbs = () => {

    const location = useLocation();

    const pathnames = location.pathname.split("/").filter((x) => x);

    // si estoy en home no muestro nada
    if (pathnames.length === 0) return null;

    // aquí traduzco las rutas a nombres más bonitos para el usuario
    const nombresAmigables = {
        imc: "Calculadora",
        analisis: "Bio-Informe",
        lista: "Mi Compra",
        buscador: "Buscador",
        recetario: "Vitta Chef",
        perfil: "Mi Perfil",
    };

    return (
        <nav
            style={{
                padding: "15px 20px 5px 20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                overflowX: "auto",
                whiteSpace: "nowrap",
            }} >

            <Link
                to="/"
                style={{
                    backgroundColor: "#f0f2ee",
                    padding: "6px 10px",
                    borderRadius: "12px",
                    color: "#6e8a4f",
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                }}
            >
                <i className="fas fa-home" style={{ fontSize: "14px" }}></i>
            </Link>

            {pathnames.map((name, index) => {

                const rutaCompleta = `/${pathnames.slice(0, index + 1).join("/")}`;

                const esUltimo = index === pathnames.length - 1;

                // uso nombre bonito :)
                const nombreMostrar =
                    nombresAmigables[name] || name.toUpperCase();

                return (
                    <React.Fragment key={rutaCompleta}>
                        <i
                            className="fas fa-chevron-right"
                            style={{ fontSize: "10px", color: "#ccc" }}></i>

                        {esUltimo ? (

                            <div
                                style={{
                                    background: "linear-gradient(135deg, #6e8a4f 0%, #4a5d35 100%)",
                                    color: "white",
                                    padding: "6px 14px",
                                    borderRadius: "12px",
                                    fontSize: "11px",
                                    fontWeight: "700",
                                    boxShadow: "0 4px 10px rgba(110, 138, 79, 0.3)",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                }}>
                                {nombreMostrar}
                            </div>) : (

                            <Link
                                to={rutaCompleta}
                                style={{
                                    color: "#666",
                                    textDecoration: "none",
                                    fontSize: "11px",
                                    fontWeight: "600",
                                    textTransform: "uppercase",
                                }} >
                                {nombreMostrar}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};