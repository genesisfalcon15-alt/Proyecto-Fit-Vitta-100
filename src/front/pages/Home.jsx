import React, { useState } from "react";
import { Link } from "react-router-dom";
import RetoDiario from "./RetoDiario.jsx";
import { RecetarioVitta } from "./RecetarioVitta.jsx";

export const Home = () => {
	const colorVerdeVitta = "#6e8a4f";
	const [mostrarRecetario, setMostrarRecetario] = useState(false);
	const [moodSeleccionado, setMoodSeleccionado] = useState(null);
	const imcGuardado = Number(localStorage.getItem("vitta_valor_imc")) || 22;
	const pesoGuardado = Number(localStorage.getItem("vitta_peso")) || null;
	const alturaGuardada = Number(localStorage.getItem("vitta_altura")) || null;
	const estadoFisicoGuardado = localStorage.getItem("vitta_estado_fisico") || "Peso saludable";

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

	// cómo se siente el usuario hoy
	const moods = [
		{ id: "cansada", emoji: "😴", texto: "Cansada" },
		{ id: "motivada", emoji: "⚡", texto: "Motivada" },
		{ id: "energia", emoji: "🔥", texto: "Con energía" },
	];

	// recomendación según cómo se siente y su IMC
	const obtenerRecomendacionVitta = () => {
		if (!moodSeleccionado) return null;

		if (imcGuardado >= 25 && moodSeleccionado.id === "cansada") {
			return {
				titulo: "Hoy toca ir suave, pero no parar.",
				texto: `Según tu estado actual (${estadoFisicoGuardado}), VITTA recomienda una caminata ligera, buena hidratación y una comida alta en proteína para mantener el avance sin forzarte.`,
			};
		}

		if (imcGuardado >= 25 && moodSeleccionado.id === "motivada") {
			return {
				titulo: "Aprovecha esa motivación con control.",
				texto: "VITTA recomienda una rutina moderada, pasos extra durante el día y una compra enfocada en alimentos saciantes y bajos en azúcares.",
			};
		}

		if (imcGuardado >= 25 && moodSeleccionado.id === "energia") {
			return {
				titulo: "Buen día para activar el cuerpo.",
				texto: "VITTA recomienda una sesión más intensa, sin olvidar recuperación, agua y una comida equilibrada para sostener tu energía.",
			};
		}

		if (imcGuardado < 18.5 && moodSeleccionado.id === "cansada") {
			return {
				titulo: "Hoy prioriza energía y recuperación.",
				texto: "Tu IMC indica que conviene cuidar el aporte energético. VITTA recomienda movimiento suave y una comida completa con proteína, hidratos y grasas saludables.",
			};
		}

		if (imcGuardado >= 18.5 && imcGuardado < 25 && moodSeleccionado.id === "cansada") {
			return {
				titulo: "Escucha tu cuerpo hoy.",
				texto: "VITTA recomienda una rutina ligera, movilidad y una comida equilibrada para mantener tu bienestar sin exigirte de más.",
			};
		}

		if (moodSeleccionado.id === "motivada") {
			return {
				titulo: "Buen momento para avanzar.",
				texto: "VITTA recomienda una rutina activa, una compra saludable y mantener constancia con tus objetivos del día.",
			};
		}

		if (moodSeleccionado.id === "energia") {
			return {
				titulo: "Aprovecha tu energía.",
				texto: "VITTA recomienda una sesión dinámica, buena hidratación y alimentos que acompañen tu nivel de actividad.",
			};
		}

		return {
			titulo: "VITTA adapta tu día.",
			texto: "Usaremos tu IMC, objetivo y energía del día para recomendarte una rutina y un enfoque más realista.",
		};
	};

	const recomendacionVitta = obtenerRecomendacionVitta();

	// acciones del scroll links y modales
	const acciones = [
		{ id: 1, titulo: "Mi IMC", icono: "fa-weight-hanging", link: "/imc" },
		{ id: 2, titulo: "Mi Lista", icono: "fa-list-ul", link: "/lista" },
		{ id: 4, titulo: "Analisis", icono: "fa-chart-pie", link: "/imc/analisis" },
		{ id: 5, titulo: "Rutinas", icono: "fa-running", link: "/imc/plan" },
		{ id: 6, titulo: "Recetario", icono: "fa-utensils", action: () => setMostrarRecetario(true) },
	];

	return (
		<div
			className="container-fluid p-0 d-flex flex-column"
			style={{
				minHeight: "100vh",
				paddingBottom: "100px",
			}}
		>
			<div
				style={{
					marginTop: "10px",
					marginBottom: "5px",
				}}
			>
				<div
					className="no-scrollbar"
					style={{
						display: "flex",
						overflowX: "auto",
						padding: "10px 25px",
						gap: "15px",
						scrollbarWidth: "none",
						msOverflowStyle: "none",
						cursor: "grab",
					}}
				>


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
								}}
							>
								<i
									className={`fas ${acc.icono} mb-2`}
									style={{
										color: colorVerdeVitta,
										fontSize: "18px",
									}}
								></i>

								<span
									className="d-block fw-bold"
									style={{
										color: "#222",
										fontSize: "11px",
									}}
								>
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

			<div className="px-3 mb-4" style={{ marginTop: "10px" }}>
				<div
					style={{
						...cardGlassStyle,
						padding: "9px 10px",
						borderRadius: "20px",
						background: "rgba(255,255,255,0.14)",
						border: "1px solid rgba(255,255,255,0.18)",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							marginBottom: "4px",
						}}
					>
						<h5
							style={{
								color: "white",
								fontWeight: "800",
								fontSize: "13px",
								margin: 0,
							}}
						>
							¿Cómo te sientes hoy?
						</h5>

						<div
							style={{
								width: "26px",
								height: "26px",
								borderRadius: "50%",
								background: "rgba(255,255,255,0.18)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: "13px",
								transition: "0.2s",
							}}
						>
							{moodSeleccionado?.emoji || "🌱"}
						</div>
					</div>

					<p
						style={{
							color: "rgba(255,255,255,0.75)",
							fontSize: "10.5px",
							lineHeight: "1.25",
							marginBottom: "7px",
						}}
					>
						VITTA adaptará tu recomendación según tu estado, IMC y objetivo.
					</p>
					<div
						style={{
							display: "flex",
							gap: "6px",
							justifyContent: "flex-start",
							width: "fit-content",
							padding: 0,
						}}
					>
						{moods.map((mood) => (
							<button
								key={mood.id}
								onClick={() => setMoodSeleccionado(mood)}
								style={{
									border:
										moodSeleccionado?.id === mood.id
											? "1px solid rgba(255,255,255,0.35)"
											: "1px solid rgba(255,255,255,0.14)",

									borderRadius: "999px",
									padding: "4px 9px",

									background:
										moodSeleccionado?.id === mood.id
											? "rgba(255,255,255,0.16)"
											: "rgba(255,255,255,0.06)",

									color: "rgba(255,255,255,0.92)",

									fontWeight: "600",
									fontSize: "9px",

									display: "flex",
									alignItems: "center",
									gap: "4px",

									cursor: "pointer",

									backdropFilter: "blur(10px)",
									WebkitBackdropFilter: "blur(10px)",
								}}
							>
								<span style={{ fontSize: "10px", lineHeight: "1" }}>
									{mood.emoji}
								</span>

								<span style={{ lineHeight: "1" }}>
									{mood.texto}
								</span>
							</button>
						))}
					</div>

					{recomendacionVitta && (
						<div
							style={{
								marginTop: "7px",
								padding: "7px 9px",
								borderRadius: "14px",
								background: "rgba(255,255,255,0.10)",
							}}
						>
							<p
								style={{
									color: "white",
									fontSize: "11px",
									fontWeight: "800",
									marginBottom: "3px",
									lineHeight: "1.2",
								}}
							>
								{moodSeleccionado?.emoji} {recomendacionVitta.titulo}
							</p>

							<p
								style={{
									color: "rgba(255,255,255,0.72)",
									fontSize: "10.5px",
									lineHeight: "1.25",
									margin: 0,
								}}
							>
								{recomendacionVitta.texto}
							</p>
						</div>
					)}
				</div>
			</div>

			<div style={{ marginTop: "6px" }}>
				<RetoDiario
					cardGlassStyle={cardGlassStyle}
					colorVerdeVitta={colorVerdeVitta}
				/>
			</div>

			<div
				className="w-100 px-4"
				style={{
					paddingTop: "8px",
					marginTop: "6px",
				}}
			>
				<Link to="/conocenos" style={{ textDecoration: "none" }}>
					<button
						className="btn w-100 py-3 shadow-sm"
						style={{
							backgroundColor: "rgba(255,255,255,0.1)",
							color: "white",
							borderRadius: "20px",
							border: "1px solid rgba(255,255,255,0.2)",
							fontWeight: "700",
						}}
					>
						<i className="fas fa-users me-2"></i> Conócenos
					</button>
				</Link>
			</div>

			{mostrarRecetario && (
				<RecetarioVitta alCerrar={() => setMostrarRecetario(false)} />
			)}

			<footer
				className="mt-3"
				style={{
					textAlign: "center",
					padding: "12px 20px 14px",
					margin: "0 18px 10px",
					borderRadius: "28px",
					background: "rgba(255,255,255,0.08)",
					border: "1px solid rgba(255,255,255,0.16)",
					backdropFilter: "blur(10px)",
					WebkitBackdropFilter: "blur(10px)",
				}}
			>
				<p
					style={{
						color: "white",
						opacity: 0.85,
						fontSize: "13px",
						marginBottom: "8px",
						fontWeight: "700",
					}}
				>
					Síguenos
				</p>

				<div className="d-flex justify-content-center gap-4">
					<a
						href="https://www.instagram.com/vittasabio/"
						target="_blank"
						rel="noopener noreferrer"
						className="social-icon"
					>
						<i className="fab fa-instagram" style={{ fontSize: "20px" }}></i>
					</a>

					<a
						href="https://facebook.com/vitta"
						target="_blank"
						rel="noopener noreferrer"
						className="social-icon"
					>
						<i className="fab fa-facebook" style={{ fontSize: "20px" }}></i>
					</a>
				</div>

				<p
					className="mt-3"
					style={{
						color: "white",
						opacity: 0.55,
						fontSize: "10px",
						marginBottom: 0,
					}}
				>
					© 2026 VITTA
				</p>
			</footer>
		</div>
	);
};