import React from "react"
import { Link } from "react-router-dom";

export const Home = () => {
	const colorVerdeVitta = "#6e8a4f";

	return (
		<div className="container-fluid p-0 d-flex flex-column" style={{ minHeight: "100vh" }}>

			<div className="mt-4 mb-2 text-center">

				<h2 style={{
					fontSize: "18px",
					color: "white",
					fontWeight: "300",
					letterSpacing: "2px",
					textTransform: "uppercase",
					fontFamily: "Trebuchet MS', sans-serif",
					marginBottom: "5px",
				}}>
					Bienvenido a <span style={{ fontWeight: "800" }}>Vitta</span>
				</h2>

				<p className="mb-0" style={{
					fontSize: "13px",
					color: "rgba(255,255,255,0.7)",
					fontStyle: "italic",
					letterSpacing: "0.5px",
				}}>
					"Vive sano, compra sabio"
				</p>
			</div>

			{/*botones en formato triangulo*/}

			<div className="px-3 mb-5 mt-3 d-flex flex-column align-items-center">
				<div className="mb-4">
					<Link to="/buscador" className="text-decoration-none text-center d-flex flex-column align-items-center">
						<div className="rounded-circle d-flex align-items-center justify-content-center shadow-lg"
							style={{
								backgroundColor: colorVerdeVitta,
								width: "100px",
								height: "100px",
								border: "2px solid rgba(255,255,255,0.2)"
							}}>
							<i className=" fas fa-search-location text-white" style={{ fontSize: "40px" }}></i>
						</div>
						<span className="fw-bold d-block text-white" style={{ fontSize: "15px", letterSpacing: "1px" }}> Compra Inteligente</span>
					</Link>
				</div>

				<div className="d-flex justify-content-center gap-5 w-100">
					<Link to="/imc" className="text-decoration-none text-center d-flex flex-column align-items-center">
						<div className="rounded-circle d-flex align-items-center justify-content-center shadow"
							style={{
								backgroundColor: colorVerdeVitta,
								width: "80px",
								height: "80px",
								border: "1px solid rgba(255,255,255,0.2)"
							}}>
							<i className="fas fa-weight-hanging text-white" style={{ fontSize: "30px" }}></i>
						</div>
						<span className="fw-bold d-block text-white" style={{ fontSize: "12px" }}> MI IMC</span>
					</Link>

					<Link to="/lista" className="text-decoration-none text-center d-flex flex-column align-items-center">
						<div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 shadow"
							style={{
								backgroundColor: colorVerdeVitta,
								width: "80px",
								height: "80px",
								border: "1px solid rgba(255,255,255,0.2)"
							}}>
							<i className="fas fa-clipboard-list text-white" style={{ fontSize: "30px" }}></i>
						</div>
						<span className="fw-bold d-block text-white" style={{ fontSize: "13px" }}>Lista</span>
					</Link>
				</div>
			</div>

			<div className="px-3 mb-4">
				<div style={{
					backgroundColor: "rgba(255, 255, 255, 0.25)",
					borderRadius: "20px",
					padding: "20px",
					backdropFilter: "blur(10px)",
					border: "1px solid rgba(255, 255, 255, 0.3)",
					boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
				}}>

					{/*cabecera de carta*/}
					<div className="d-flex justify-content-between align-items-center mb-2">
						<h3 style={{
							color: "white",
							fontSize: "18px",
							fontWeight: "700",
							margin: "0",
							fontFamily: "Georgia, serif"
						}}>Evolución del IMC </h3>


						<Link to="/evolucion" style={{
							color: "rgba(255,255,255,0.8)",
							fontSize: "12px",
							textDecoration: "none",
							fontWeight: "bold"
						}}>

							Ver todo <i className="fas fa-arrow-right ms-1"></i>

						</Link>
					</div>
				</div>




				<div className="text-center py-3" style={{
					borderTop: "1px solid rgba(255,255,255,0.2)",
					marginTop: "10px"
				}}>
					<p style={{
						color: "rgba(255,255,255,0.7)",
						fontSize: "12px",
						fontStyle: "italic",
						margin: 0
					}}>Sin registros aún. ¡Empieza a registrar tu IMC!</p>
				</div>

			</div>

			<div className="w-100 px-4 mt-auto mb-5">
				<div className="d-flex justify-content-center gap-3">
					<button className="btn btn-negro-transparente flex-grow-1"
						style={{
							borderRadius: "15px",
							padding: "18px 10px",
						}}>
						<i className="fas fa-users me-2"></i>
						Conócenos
					</button>

					<button className="btn btn-negro-transparente flex-grow-1 py-2" style={{ borderRadius: "12px" }}>
						<i className="fas fa-users me-2"></i>
						Comparte
					</button>

				</div>
			</div>
		</div>
	);
};

