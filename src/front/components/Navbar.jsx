import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const colorVerdeVitta = "#2a351f";

    const checkUser = () => {
        const token = localStorage.getItem("token");
        if (!token) { setUser(null); return; }

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            if (payload.exp && payload.exp * 1000 < Date.now()) {
                handleLogout();
                return;
            }
            const storedUser = localStorage.getItem("user");
            if (storedUser) setUser(JSON.parse(storedUser));
        } catch {
            handleLogout();
        }
    };

    useEffect(() => {
        checkUser();
        window.addEventListener("authChange", checkUser);
        return () => window.removeEventListener("authChange", checkUser);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setDropdownOpen(false);
        navigate("/");
    };

    const getInitials = (user) => {
        if (!user) return "?";
        const n = user.nombre?.[0] || "";
        const a = user.apellidos?.[0] || "";
        return (n + a).toUpperCase() || "?";
    };

    const Avatar = ({ size = 32, borderColor = "white" }) => {
        if (user?.image) {
            return (
                <img
                    src={user.image}
                    alt="avatar"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={{
                        width: size,
                        height: size,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: `2px solid ${borderColor}`,
                        cursor: "pointer",
                        display: "block"
                    }}
                />
            );
        }
        return (
            <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    background: "#6e8a4f",
                    border: `2px solid ${borderColor}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: size * 0.35,
                    color: "white",
                    cursor: "pointer",
                    userSelect: "none"
                }}
            >
                {getInitials(user)}
            </div>
        );
    };

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
                        onClick={() => setIsOpen(true)} />

                    <Link to="/" style={{ textDecoration: "none" }}>
                        <h1 style={{ color: "white", fontSize: "32px", fontWeight: "bold", margin: 0 }}>
                            VITTA
                        </h1>
                    </Link>

                    <div className="d-flex align-items-center gap-3">
                        <Link to="/buscador" style={{ color: "white" }}>
                            <i className="fas fa-search fa-lg" />
                        </Link>

                        {!user ? (
                            <Link to="/signin" style={{ color: "white" }}>
                                <i className="fas fa-user-circle fa-2x" />
                            </Link>
                        ) : (
                            <div ref={dropdownRef} style={{ position: "relative" }}>
                                <Avatar size={36} borderColor="white" />

                                {dropdownOpen && (
                                    <div style={{
                                        position: "absolute",
                                        right: 0,
                                        top: "calc(100% + 12px)",
                                        background: "white",
                                        borderRadius: "12px",
                                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                                        minWidth: "200px",
                                        padding: "8px",
                                        zIndex: 1050
                                    }}>
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            padding: "10px 12px 12px",
                                            borderBottom: "1px solid #eee",
                                            marginBottom: "4px"
                                        }}>
                                            {user.image ? (
                                                <img
                                                    src={user.image}
                                                    alt="avatar"
                                                    style={{
                                                        width: 42,
                                                        height: 42,
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                        border: "2px solid #e0e0e0",
                                                        flexShrink: 0
                                                    }}
                                                />
                                            ) : (
                                                <div style={{
                                                    width: 42,
                                                    height: 42,
                                                    borderRadius: "50%",
                                                    background: "#6e8a4f",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontWeight: 700,
                                                    fontSize: 15,
                                                    color: "white",
                                                    flexShrink: 0
                                                }}>
                                                    {getInitials(user)}
                                                </div>
                                            )}
                                            <div style={{ overflow: "hidden" }}>
                                                <p style={{
                                                    margin: 0,
                                                    fontWeight: 700,
                                                    fontSize: "14px",
                                                    color: colorVerdeVitta,
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis"
                                                }}>
                                                    {user.nombre} {user.apellidos}
                                                </p>
                                                <p style={{
                                                    margin: 0,
                                                    fontSize: "12px",
                                                    color: "#888",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis"
                                                }}>
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>

                                        <Link
                                            to="/perfil"
                                            onClick={() => setDropdownOpen(false)}
                                            style={{
                                                display: "flex", alignItems: "center", gap: "10px",
                                                padding: "9px 12px", borderRadius: "8px",
                                                color: "#333", textDecoration: "none",
                                                fontWeight: 600, fontSize: "14px"
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = "#f5f5f5"}
                                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                        >
                                            <i className="fas fa-user" style={{ color: colorVerdeVitta }} />
                                            Mi perfil
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            style={{
                                                display: "flex", alignItems: "center", gap: "10px",
                                                padding: "9px 12px", borderRadius: "8px",
                                                color: "#c0392b", background: "transparent",
                                                border: "none", width: "100%",
                                                fontWeight: 600, fontSize: "14px", cursor: "pointer"
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = "#fff0f0"}
                                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                        >
                                            <i className="fas fa-sign-out-alt" style={{ color: "#c0392b" }} />
                                            Cerrar sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
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
                <div className="offcanvas-header" style={{ paddingTop: "40px" }}>
                    <h5 className="offcanvas-title" style={{ fontWeight: "900", color: colorVerdeVitta }}>
                        MENÚ VITTA
                    </h5>
                    <button type="button" className="btn-close" onClick={() => setIsOpen(false)} />
                </div>
                <div className="offcanvas-body">
                    <ul className="list-unstyled">
                        <li className="mb-4">
                            <Link to="/" className="text-decoration-none d-flex align-items-center gap-3"
                                style={{ color: "#333", fontWeight: "700" }} onClick={() => setIsOpen(false)}>
                                <i className="fas fa-home" style={{ color: colorVerdeVitta }} />
                                Inicio
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/buscador" className="text-decoration-none d-flex align-items-center gap-3"
                                style={{ color: "#333", fontWeight: "700" }} onClick={() => setIsOpen(false)}>
                                <i className="fas fa-map-marked-alt" style={{ color: colorVerdeVitta }} />
                                Buscador
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/imc" className="text-decoration-none d-flex align-items-center gap-3"
                                style={{ color: "#333", fontWeight: "700" }} onClick={() => setIsOpen(false)}>
                                <i className="fas fa-weight" style={{ color: colorVerdeVitta }} />
                                Mi Salud e IMC
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {isOpen && (
                <div className="offcanvas-backdrop fade show" onClick={() => setIsOpen(false)} />
            )}
        </>
    );
};