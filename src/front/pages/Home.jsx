import React from "react";
import { Link } from "react-router-dom";
import RetoDiario from "./RetoDiario";


export const Home = () => {
	const colorVerdeVitta = "#6e8a4f";

	//  efecto vidrio
	const cardGlassStyle = {
		background: "rgba(255, 255, 255, 0.82)",
		backdropFilter: "blur(15px)",
		WebkitBackdropFilter: "blur(15px)",
		borderRadius: "30px",
		border: "1px solid rgba(255, 255, 255, 0.4)",
		padding: "25px",
		boxShadow: "0 15px 35px rgba(0,0,0,0.1)"
	};

	const manejarCompartir = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: "VITTA - Ahorro y Salud",
					text: "¡Mira esta app para ahorrar en el súper y cuidar tu salud!",
					url: window.location.href
				});
				console.log("Contenido compartido con éxito");
			} catch (error) {
				console.log("Error al compartir:", error);
			}
		} else {
			alert("Copiado al portapapeles: " + window.location.href);
			navigator.clipboard.writeText(window.location.href);
		}
	};

	return (
		<div
			className="container-fluid p-0 d-flex flex-column"
			style={{ minHeight: "100vh", paddingBottom: "100px" }}
		>

			<div className="px-4 mt-5 mb-4">
				<span
					className="text-white-50 text-uppercase fw-bold"
					style={{ fontSize: "12px", letterSpacing: "2px" }}
				>
					Bienvenido a
				</span>

				<h2
					style={{
						color: "white",
						fontSize: "38px",
						fontWeight: "800",
						letterSpacing: "-1.5px",
						marginTop: "5px",
						lineHeight: "1"
					}}
				>
					VITTA
				</h2>

				<p
					style={{
						color: "rgba(255,255,255,0.7)",
						fontSize: "15px",
						marginTop: "10px",
						fontWeight: "400"
					}}
				>
					"Vive sano, compra sabio"
				</p>
			</div>

			{/* boton principal */}
			<div className="px-3 vitta-fade-in">
				<Link to="/buscador" className="text-decoration-none">
					<div
						style={{
							...cardGlassStyle,
							background: `linear-gradient(135deg, ${colorVerdeVitta}dd, #4a5240ee)`,
							padding: "30px",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							border: "1px solid rgba(255,255,255,0.2)",
							marginBottom: "20px"
						}}
					>
						<div>
							<h3
								style={{
									color: "white",
									fontSize: "22px",
									fontWeight: "800",
									margin: 0
								}}
							>
								Compra Inteligente
							</h3>

							<p
								style={{
									color: "rgba(255,255,255,0.8)",
									fontSize: "12px",
									margin: 0
								}}
							>
								Busca Tu Ahorro mas cercano
							</p>
						</div>

						<i
							className="fas fa-shopping-basket text-white"
							style={{ fontSize: "40px", opacity: 0.8 }}
						></i>
					</div>
				</Link>

				{/* botones secundario */}

				<div className="d-flex gap-3 mb-4">
					<Link to="/imc" className="flex-grow-1 text-decoration-none">
						<div
							style={{
								...cardGlassStyle,
								padding: "20px",
								textAlign: "center"
							}}
						>
							<i
								className="fas fa-weight-hanging mb-2"
								style={{
									color: colorVerdeVitta,
									fontSize: "20px"
								}}
							></i>

							<span
								className="d-block fw-bold"
								style={{ color: "#222", fontSize: "14px" }}
							>
								Mi IMC
							</span>
						</div>
					</Link>

					<Link to="/lista" className="flex-grow-1 text-decoration-none">
						<div
							style={{
								...cardGlassStyle,
								padding: "20px",
								textAlign: "center"
							}}
						>
							<i
								className="fas fa-list-ul mb-2"
								style={{
									color: colorVerdeVitta,
									fontSize: "20px"
								}}
							></i>

							<span
								className="d-block fw-bold"
								style={{ color: "#222", fontSize: "14px" }}
							>
								Mi Lista
							</span>
						</div>
					</Link>
				</div>
			</div>

			{/* reto diario del usuario  */}
			<RetoDiario
				cardGlassStyle={cardGlassStyle}
				colorVerdeVitta={colorVerdeVitta}
			/>
			{/* botones inferiores */}
			<div className="w-100 px-4 mt-auto">
				<div className="d-flex justify-content-center gap-3">

					{/* conocenos :) */}
					<Link
						to="/conocenos"
						className="flex-grow-1"
						style={{ textDecoration: "none" }}
					>
						<button
							className="btn w-100 py-3 shadow-sm"
							style={{
								backgroundColor: "rgba(0,0,0,0.2)",
								color: "white",
								borderRadius: "20px",
								border: "1px solid rgba(255,255,255,0.1)",
								fontWeight: "700"
							}}
						>
							<i className="fas fa-users me-2"></i> Conócenos
						</button>
					</Link>

					{/* boton para compartir */}
					<button
						className="btn flex-grow-1 py-3 shadow-sm"
						onClick={manejarCompartir}
						style={{
							backgroundColor: "rgba(0,0,0,0.2)",
							color: "white",
							borderRadius: "20px",
							border: "1px solid rgba(255,255,255,0.1)",
							fontWeight: "700"
						}}
					>
						<i className="fas fa-share-alt me-2"></i> Comparte
					</button>
				</div>
			</div>
		</div>
	);
};












