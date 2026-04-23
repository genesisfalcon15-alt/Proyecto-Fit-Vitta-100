import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RetoDiario from "./RetoDiario.jsx";
import { RecetarioVitta } from "./RecetarioVitta.jsx";

export const Home = () => {
	const colorVerdeVitta = "#6e8a4f";
	const navigate = useNavigate();
	const [mostrarRecetario, setMostrarRecetario] = useState(false);

	// efecto vidrio
	const cardGlassStyle = {
		background: "rgba(255, 255, 255, 0.82)",
		backdropFilter: "blur(15px)",
		WebkitBackdropFilter: "blur(15px)",
		borderRadius: "30px",
		border: "1px solid rgba(255, 255, 255, 0.4)",
		padding: "25px",
		boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
	};

	// acciones del scroll links y modales
	const acciones = [
		{ id: 1, titulo: "Mi IMC", icono: "fa-weight-hanging", link: "/imc" },
		{ id: 2, titulo: "Mi Lista", icono: "fa-list-ul", link: "/lista" },
		{ id: 3, titulo: "Analisis", icono: "fa-chart-pie", link: "/imc/analisis" },
		{ id: 4, titulo: "Rutinas", icono: "fa-running", link: "/imc/plan" },
		{ id: 5, titulo: "Recetario", icono: "fa-utensils", action: () => setMostrarRecetario(true) },
	];

	return (
		<div
			className="container-fluid p-0 d-flex flex-column"
			style={{
				minHeight: "100vh",
				paddingBottom: "100px"
			}}>

			{/* scroll horizontal */}
			<div style={{
				marginTop: "10px",
				marginBottom: "5px"
			}}>
				<div
					className="no-scrollbar"
					style={{
						display: "flex",
						overflowX: "auto",
						padding: "10px 25px",
						gap: "15px",
						scrollbarWidth: "none",
						msOverflowStyle: "none",
					}}>

					{acciones.map((acc) => {
						const content = (
							<div
								style={{
									...cardGlassStyle,
									minWidth: "100px",
									padding: "15px 10px",
									textAlign: "center",
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									cursor: "pointer",
								}}>

								<i
									className={`fas ${acc.icono} mb-2`}
									style={{
										color: colorVerdeVitta,
										fontSize: "18px"
									}}>
								</i>
								<span
									className="d-block fw-bold"
									style={{
										color: "#222",
										fontSize: "11px"
									}}>

									{acc.titulo}
								</span>
							</div>
						);

						return acc.link ? (
							<Link key={acc.id} to={acc.link} className="text-decoration-none">
								{content}
							</Link>
						) : (
							<div key={acc.id} onClick={acc.action} style={{ textDecoration: "none" }}>
								{content}
							</div>
						);
					})}
				</div>
			</div>


			<div className="px-4 mb-3">
				<span
					className="text-white-50 text-uppercase fw-bold"
					style={{
						fontSize: "10px",
						letterSpacing: "2px"
					}}>
					Bienvenido a
				</span>

				<h2
					style={{
						color: "white",
						fontSize: "32px",
						fontWeight: "800",
						letterSpacing: "-1.5px",
						marginTop: "0px",
						lineHeight: "1",
					}}>

					VITTA
				</h2>

				<p
					style={{
						color: "rgba(255,255,255,0.7)",
						fontSize: "14px",
						marginTop: "5px",
						fontWeight: "400",
					}}>

					"Vive sano, compra sabio"
				</p>
			</div>


			<div className="px-3">
				<Link to="/buscador" className="text-decoration-none">
					<div
						style={{
							...cardGlassStyle,
							background: `linear-gradient(135deg, ${colorVerdeVitta}dd, #4a5240ee)`,
							padding: "25px",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							border: "1px solid rgba(255,255,255,0.2)",
							marginBottom: "15px",
						}}>

						<div>
							<h3
								style={{
									color: "white",
									fontSize: "20px",
									fontWeight: "800",
									margin: 0,
								}}>

								Compra Inteligente
							</h3>

							<p
								style={{
									color: "rgba(255,255,255,0.8)",
									fontSize: "12px",
									margin: 0,
								}}>

								Busca Tu Ahorro más cercano
							</p>
						</div>

						<i className="fas fa-shopping-basket text-white"
							style={{
								fontSize: "35px",
								opacity: 0.8
							}}></i>
					</div>
				</Link>
			</div>


			<RetoDiario cardGlassStyle={cardGlassStyle} colorVerdeVitta={colorVerdeVitta} />


			<div className="w-100 px-4 mt-auto" style={{ paddingTop: "20px" }}>
				<Link to="/conocenos" style={{ textDecoration: "none" }}>
					<button
						className="btn w-100 py-3 shadow-sm"
						style={{
							backgroundColor: "rgba(255,255,255,0.1)",
							color: "white",
							borderRadius: "20px",
							border: "1px solid rgba(255,255,255,0.2)",
							fontWeight: "700",
						}}>

						<i className="fas fa-users me-2"></i> Conócenos
					</button>
				</Link>
			</div>


			{mostrarRecetario && (
				<RecetarioVitta alCerrar={() => setMostrarRecetario(false)} />
			)}
			<footer className="pb-3 mt-1" style={{ textAlign: 'center' }}>

				<hr style={{ border: '0', borderTop: '1px solid rgba(255,255,255,0.1)', width: '40%', margin: '0 auto 10px auto' }} />

				<p style={{ color: 'white', opacity: 0.7, fontSize: '12px', marginBottom: '8px' }}>Síguenos</p>

				<div className="d-flex justify-content-center gap-4">

					<a href="https://www.instagram.com/vittasabio/" target="_blank" rel="noopener noreferrer" className="social-icon">
						<i className="fab fa-instagram fa-lg"></i>
					</a>

					<a href="https://facebook.com/vitta" target="_blank" rel="noopener noreferrer" className="social-icon">
						<i className="fab fa-facebook fa-lg"></i>
					</a>
				</div>
				<p className="mt-3" style={{ color: 'white', opacity: 0.5, fontSize: '10px' }}>
					© 2026 VITTA
				</p>
			</footer>

		</div>
	);
};