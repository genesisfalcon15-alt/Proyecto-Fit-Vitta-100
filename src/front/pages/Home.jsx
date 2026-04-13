import React from "react"
import { Link } from "react-router-dom";

export const Home = () => {
	const colorVerdeVitta = "#6e8a4f";
	const cardGlassStyle = {
		background: "rgba(255, 255, 255, 0.82)",
		backdropFilter: "blur(15px)",
		WebkitBackdropFilter: "blur(15px)",
		borderRadius: "30px",
		border: "1px solid rgba(255,255,255,0.4)",
		padding: "25px",
		boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
	};

	return (
		<div className="container-fluid p-0 d-flex flex-column"
			style={{
				minHeight: "100vh",
				paddingBottom: "100px"
			}}>

			<div className="px-4 mt-5 mb-4">
				<span className="text-white-50 text-uppercase fw-bold"
					style={{
						fontSize: "12px",
						letterSpacing: "2px"
					}}>
					Bienvenido
				</span>
				<h2 style={{
					color: "white",
					fontSize: "38px",
					fontWeight: "800",
					letterSpacing: "-1.5px",
					marginTop: "5px",
					lineHeight: "1"
				}}>
					VITTA 🌱
				</h2>
				<p style={{
					color: "rgba(255,255,255,0.7)",
					fontSize: "15px",
					marginTop: "10px",
					fontWeight: "400"
				}}>
					"Vive sano, compra sabio"
				</p>
			</div>

			{/*ACCESO RAPIDO PREMIUM*/}

			<div className="px-3 vitta-fade-in">
				<Link to="/buscador" className="text-decoration-none">
					<div style={{
						...cardGlassStyle,
						background: `linear-gradient(135deg, ${colorVerdeVitta}dd, #4a5240ee)`,
						padding: "30px",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						border: "1px solid rgba(255,255,255,0.2)",
						marginBottom: "20px"
					}}>
						<div>
							<h3 style={{
								color: "white",
								fontSize: "22px",
								fontWeight: "800",
								margin: 0
							}}>Compra Inteligente</h3>
							<p style={{
								color: "rgba(255,255,255,0.8)",
								fontSize: "12px",
								margin: 0
							}}>Busca Tu Ahorro mas cercano</p>
						</div>
						<i className="fa-solid fa-map-location-dot" style={{ color: "white", fontSize: "35px" }}></i>
					</div>
				</Link>
			</div>


			<div className="d-flex gap-3 mb-4 px-3">
				<Link to="/imc" className="flex-grow-1 text-decoration-none">
					<div
						style={{
							...cardGlassStyle,
							padding: "20px",
							textAlign: "center"
						}}>
						<i className="fa-solid fa-weight-scale mb-2"
							style={{
								color: colorVerdeVitta,
								fontSize: "20px"
							}}></i>
						<span className="d-block fw-bold"
							style={{
								color: "#222",
								fontSize: "14px"
							}}>Mi IMC</span>
					</div>
				</Link>

				<Link to="/lista" className="flex-grow-1 text-decoration-none">
					<div style={{
						...cardGlassStyle,
						padding: "20px",
						textAlign: "center"
					}}>
						<i className="fas fa-list-ul mb-2"
							style={{
								color: colorVerdeVitta,
								fontSize: "20px"
							}}></i>
						<span className="d-block fw-bold"
							style={{
								color: "#222",
								fontSize: "14px"
							}}>Mi Lista</span>
					</div>
				</Link>
			</div>


			{/*apartado de evolución*/}
			<div className="px-3 mb-5">
				<div style={cardGlassStyle}>
					<div className="d-flex justify-content-between align-items-center mb-3">
						<h4 style={{
							color: "#222",
							fontSize: "16px",
							fontWeight: "800",
							marginBottom: "5px"
						}}></h4>
						<p style={{
							color: "#666",
							fontSize: "12px",
							margin: 0
						}}>
							Analiza si tu compra es Vitta en segundos.</p>
					</div>

					<div style={{
						width: "50px",
						height: "50px",
						borderRadius: "15px",
						backgroundColor: colorVerdeVitta,
						color: "white",
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					}}>
					</div>
				</div>
			</div>


			<div className="w-100 px-4 mt-auto">
				<div className="d-flex justify-content-center gap-3">
					<button className="btn flex-grow-1 py-3 shadow-sm"
						style={{
							backgroundColor: "rgba(0,0,0,0.2)",
							color: "white",
							borderRadius: "15px",
							border: "1px solid rgba(255,255,255,0.1)",
							fontWeight: "800",
							fontSize: "14px"
						}}>
						<i className="fas fa-users me-2"></i>
						Conócenos
					</button>

					<button className="btn flex-grow-1 py-3 shadow-sm"
						style={{
							backgroundColor: "rgba(0,0,0,0.2)",
							color: "white",
							borderRadius: "20px",
							border: "1px solid rgba(255,255,255,0.1)",
							fontWeight: "800",
							fontSize: "14px"
						}}>
						<i className="fas fa-users me-2"></i>
						Comparte
					</button>
				</div>
			</div>
		</div >
	);
};
















