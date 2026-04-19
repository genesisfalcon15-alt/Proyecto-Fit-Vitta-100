import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    // controlo si el menú lateral está abierto o cerrado
    const [isOpen, setIsOpen] = useState(false);

    const colorVerdeVitta = "#2a351f";

    return (
        <>
            <nav
                className="navbar navbar-light px-3"
                style={{
                    background: "linear-gradient(135deg, #6e8a4f 0%, #373e2e 100%)",
                    paddingTop: "20px"
                }}>

                <div className="container-fluid d-flex justify-content-between align-items-center">


                    <i
                        className="fas fa-bars fa-lg"
                        style={{ color: "white", cursor: "pointer" }}
                        onClick={() => setIsOpen(true)} ></i>


                    <Link to="/" style={{ textDecoration: "none" }}>
                        <h1 style={{
                            color: "white",
                            fontSize: "32px",
                            fontWeight: "bold",
                            margin: 0
                        }}>
                            VITTA
                        </h1>
                    </Link>

                    <div className="d-flex align-items-center gap-3">
                        <Link to="/buscador" style={{ color: "white" }}>
                            <i className="fas fa-search fa-lg"></i>
                        </Link>
                        <Link to="/perfil" style={{ color: "white" }}>
                            <i className="fas fa-user-circle fa-2x"></i>
                        </Link>
                    </div>
                </div>
            </nav>


            <div
                className={`offcanvas offcanvas-start ${isOpen ? "show" : ""}`}
                style={{
                    visibility: isOpen ? "visible" : "hidden",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    width: "280px"
                }}>


                <div className="offcanvas-header"
                    style={{ paddingTop: "40px" }}>
                    <h5 className="offcanvas-title"
                        style={{
                            fontWeight: "900",
                            color: colorVerdeVitta
                        }}>
                        MENÚ VITTA
                    </h5>


                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setIsOpen(false)}></button>
                </div>


                <div className="offcanvas-body">
                    <ul className="list-unstyled">

                        <li className="mb-4">
                            <Link
                                to="/"
                                className="text-decoration-none d-flex align-items-center gap-3"
                                style={{ color: "#333", fontWeight: "700" }}
                                onClick={() => setIsOpen(false)}>

                                <i className="fas fa-home" style={{ color: colorVerdeVitta }}></i>
                                Inicio
                            </Link>
                        </li>

                        <li className="mb-4">
                            <Link
                                to="/buscador"
                                className="text-decoration-none d-flex align-items-center gap-3"
                                style={{ color: "#333", fontWeight: "700" }}
                                onClick={() => setIsOpen(false)}>

                                <i className="fas fa-map-marked-alt" style={{ color: colorVerdeVitta }}></i>
                                Buscador
                            </Link>
                        </li>

                        <li className="mb-4">
                            <Link
                                to="/imc"
                                className="text-decoration-none d-flex align-items-center gap-3"
                                style={{ color: "#333", fontWeight: "700" }}
                                onClick={() => setIsOpen(false)}>

                                <i className="fas fa-weight" style={{ color: colorVerdeVitta }}></i>
                                Mi Salud e IMC
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>

            {isOpen && (
                <div
                    className="offcanvas-backdrop fade show"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </>
    );
};