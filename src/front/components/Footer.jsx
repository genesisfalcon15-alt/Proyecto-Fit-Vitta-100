import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Footer = () => {
	const location = useLocation();

	const isActive = (path) => location.pathname === path ? "#6e8a4f" : "#999";

	return (
		<footer className="fixed-bottom bg-white border-top d-flex justify-content-around align-items-center"
			style={{ height: "70px", zIndex: 1000, maxWidth: "450px", left: "50%", transform: "translateX(-50%)" }}>




			<Link to="/" className="text-decoration-none text-center">
				<div className="d-flex flex-column align-items-center">
					<i className="fas fa-home" style={{ fontSize: "20px", color: isActive("/") }}></i>
					<span style={{ fontSize: "12px", color: isActive("/"), fontWeight: "600" }}>Inicio</span>
				</div>
			</Link>



			<Link to="/buscador" className="text-decoration-none text-center">
				<div className="d-flex flex-column align-items-center">
					<i className="fas fa-map-marker-alt" style={{ fontSize: "20px", color: isActive("/buscador") }}></i>
					<span style={{ fontSize: "12px", color: isActive("/buscador"), fontWeight: "600" }}>Mapa</span>
				</div>
			</Link>



			<Link to="/imc" className="text-decoration-none text-center">
				<div className="d-flex flex-column align-items-center">
					<i className="fas fa-user-circle" style={{ fontSize: "20px", color: isActive("/imc") }}></i>
					<span style={{ fontSize: "12px", color: isActive("/buscador"), fontWeight: "600" }}>Usuario</span>
				</div>
			</Link>
		</footer>
	);
}
