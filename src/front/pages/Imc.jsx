import React, { useState, useEffect } from "react";
import { AnalisisDetallado } from "./AnalisisDetallado";
import { Link, useNavigate } from "react-router-dom";
import { fetchNutricionIA } from "../services/aiService";

export const Imc = () => {
    const colorVerdeVitta = "#6e8a4f";
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [pesoConfirmado, setPesoConfirmado] = useState(
        () => parseFloat(localStorage.getItem("vitta_peso")) || 100
    );
    const [alturaConfirmado, setAlturaConfirmado] = useState(
        () => parseFloat(localStorage.getItem("vitta_altura")) || 175
    );
    const [tempPeso, setTempPeso] = useState(pesoConfirmado);
    const [tempAltura, setTempAltura] = useState(alturaConfirmado);

    const [guardando, setGuardando] = useState(false);
    const [mostrarAnalisis, setMostrarAnalisis] = useState(false);
    const [datosHistorial, setDatosHistorial] = useState([]);
    const [genero, setGenero] = useState("hombre");
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [nutricion, setNutricion] = useState(null);
    const [loadingNutri, setLoadingNutri] = useState(false);

    useEffect(() => {
        //if (!token) {
        //    window.location.href = "/signin";
        //    return;
        //}

        fetch(import.meta.env.VITE_BACKEND_URL + "/api/private", {
            headers: { Authorization: "Bearer " + token }
        })
            .then((res) => res.json())
            .then((data) => setGenero(data.user.genero?.toLowerCase() || "hombre"))
            .catch(() => console.error("Error al cargar género"));

        const statsPromise = fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/stats", {
            headers: { Authorization: "Bearer " + token }
        })
            .then((res) => res.json())
            .catch(() => null);

        const historialPromise = fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/historial", {
            headers: { Authorization: "Bearer " + token }
        })
            .then((res) => res.json())
            .catch(() => null);

        Promise.all([statsPromise, historialPromise]).then(([stats, historial]) => {
            let peso = stats?.peso ?? parseFloat(localStorage.getItem("vitta_peso")) ?? 100;
            let altura = stats?.altura ?? parseFloat(localStorage.getItem("vitta_altura")) ?? 175;

            if (historial && historial.length > 0) {
                setDatosHistorial(historial);
                const ordenado = [...historial].sort(
                    (a, b) => new Date(b.fecha) - new Date(a.fecha)
                );
                const ultimo = ordenado[0];
                if (ultimo.peso) peso = ultimo.peso;
                if (ultimo.altura) altura = ultimo.altura;
            }

            setPesoConfirmado(peso);
            setAlturaConfirmado(altura);
            setTempPeso(peso);
            setTempAltura(altura);
        });
    }, []);

    const imcCalculado = tempAltura > 0
        ? (parseFloat(tempPeso) / ((parseFloat(tempAltura) / 100) ** 2)).toFixed(1)
        : "0.0";

    const calcularPosicion = (valor) => {
        const v = parseFloat(valor);
        const min = 15;
        const max = 35;
        const porcentaje = ((v - min) / (max - min)) * 100;
        return Math.min(Math.max(porcentaje, 5), 95);
    };

    const obtenerUltimoPesoHistorial = () => {
        if (!datosHistorial || datosHistorial.length === 0) return null;
        const ordenado = [...datosHistorial].sort(
            (a, b) => new Date(b.fecha) - new Date(a.fecha)
        );
        return ordenado[0].peso ?? null;
    };

    const handleClickActualizar = () => {
        const nuevoPeso = parseFloat(tempPeso);
        const ultimoPeso = obtenerUltimoPesoHistorial();

        if (ultimoPeso !== null) {
            const diferencia = Math.abs(nuevoPeso - ultimoPeso) / ultimoPeso;
            if (diferencia > 0.1) {
                setMostrarConfirmacion(true);
                return;
            }
        }

        handleGuardarCambios();
    };

    const handleGuardarCambios = async () => {
        setMostrarConfirmacion(false);
        setGuardando(true);
        const nuevoPeso = parseFloat(tempPeso);
        const nuevaAltura = parseFloat(tempAltura);

        try {
            const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/historial", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify({ peso: nuevoPeso, altura: nuevaAltura })
            });

            const data = await res.json();

            if (res.ok) {
                setPesoConfirmado(nuevoPeso);
                setAlturaConfirmado(nuevaAltura);
                setDatosHistorial((prev) => [...prev, data.entrada]);

                const imcReal = (nuevoPeso / ((nuevaAltura / 100) ** 2)).toFixed(1);
                setLoadingNutri(true);
                const dataNutri = await fetchNutricionIA(imcReal);
                setNutricion(dataNutri);
                setLoadingNutri(false);
                let estado = "";
                if (imcReal < 18.5) estado = "Bajo peso";
                else if (imcReal < 25) estado = "Peso saludable";
                else if (imcReal < 30) estado = "Sobrepeso";
                else estado = "Obesidad";

                localStorage.setItem("vitta_peso", nuevoPeso);
                localStorage.setItem("vitta_altura", nuevaAltura);
                localStorage.setItem("vitta_estado_fisico", estado);
                localStorage.setItem("vitta_valor_imc", imcReal);
            } else {
                console.error("Error al guardar:", data.msg);
            }
        } catch {
            console.error("Error de conexión");
        } finally {
            setGuardando(false);
        }
    };

    const handleEliminarEntrada = async (id) => {
        try {
            const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/historial/" + id, {
                method: "DELETE",
                headers: { Authorization: "Bearer " + token }
            });
            if (res.ok) {
                setDatosHistorial((prev) => prev.filter((e) => e.id !== id));
            }
        } catch {
            console.error("Error al eliminar entrada");
        }
    };

    const hayCambios =
        parseFloat(tempPeso) !== pesoConfirmado ||
        parseFloat(tempAltura) !== alturaConfirmado;

    const cardStyle = {
        background: "rgba(255, 255, 255, 0.98)",
        borderRadius: "24px",
        padding: "20px",
        marginBottom: "16px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        position: "relative"
    };

    return (
        <div style={{ width: "100%", flex: 1 }}>

            {mostrarAnalisis && (
                <AnalisisDetallado
                    usuario={{
                        peso: pesoConfirmado,
                        altura: alturaConfirmado,
                        grasa: 22,
                        minutos: 45,
                        dias: 3
                    }}
                    historial={datosHistorial}
                    alCerrar={() => setMostrarAnalisis(false)}
                />
            )}

            {mostrarConfirmacion && (
                <div style={{
                    position: "fixed", inset: 0, zIndex: 9999,
                    background: "rgba(0,0,0,0.5)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "20px"
                }}>
                    <div style={{
                        background: "white", borderRadius: "24px",
                        padding: "28px 24px", maxWidth: "340px", width: "100%",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
                        textAlign: "center"
                    }}>
                        <div style={{
                            width: "56px", height: "56px", borderRadius: "50%",
                            background: "#fff5e6", display: "flex",
                            alignItems: "center", justifyContent: "center",
                            margin: "0 auto 16px auto", fontSize: "24px"
                        }}>
                            ⚠️
                        </div>
                        <h3 style={{
                            fontSize: "17px", fontWeight: "800",
                            color: "#333", marginBottom: "10px"
                        }}>
                            ¿Estás seguro que quieres ingresar este dato?
                        </h3>
                        <p style={{
                            fontSize: "13px", color: "#888",
                            marginBottom: "24px", lineHeight: "1.5"
                        }}>
                            El peso introducido ({parseFloat(tempPeso)} kg) difiere más de un{" "}
                            <strong>10%</strong> respecto al último registrado (
                            {obtenerUltimoPesoHistorial()} kg).
                        </p>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button
                                onClick={() => setMostrarConfirmacion(false)}
                                style={{
                                    flex: 1, padding: "13px",
                                    borderRadius: "14px", border: "2px solid #eee",
                                    background: "white", color: "#666",
                                    fontWeight: "700", fontSize: "13px",
                                    cursor: "pointer"
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleGuardarCambios}
                                style={{
                                    flex: 1, padding: "13px",
                                    borderRadius: "14px", border: "none",
                                    background: colorVerdeVitta, color: "white",
                                    fontWeight: "800", fontSize: "13px",
                                    cursor: "pointer"
                                }}
                            >
                                Sí, guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                #app-container .seccion-escritura span,
                #app-container .seccion-escritura p,
                #app-container .seccion-escritura h4 {
                    color: #333333 !important;
                    font-family: 'Poppins', sans-serif;
                }
                .input-vitta-new {
                    background: #f0f2f0;
                    border: none;
                    border-radius: 12px;
                    color: #333 !important;
                    width: 85px;
                    font-weight: 800;
                    font-size: 22px;
                    text-align: center;
                    padding: 10px 5px;
                    outline: none;
                }
            `}</style>

            <div style={{ padding: "16px 20px 16px 20px" }}>
                <h2 style={{ 
                    fontSize: "26px", 
                    fontWeight: "800", 
                    color: "white", 
                    margin: "0 0 4px 0",
                    letterSpacing: "-0.5px",
                    textShadow: "0 2px 8px rgba(0,0,0,0.2)"
                }}>
                    Resumen Saludable
                </h2>
                <p style={{ 
                    color: "rgba(255,255,255,0.6)", 
                    fontSize: "12px",
                    margin: 0,
                    fontWeight: "500",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase"
                }}>
                    Datos y Control
                </p>
            </div>

            <div style={{ padding: "0 20px" }} className="seccion-escritura">
                <div style={cardStyle}>

                    <Link to="/imc/plan" style={{
                        position: "absolute", top: "-12px", left: "15px", zIndex: 10,
                        background: "linear-gradient(135deg, #6e8a4f 0%, #444 100%)",
                        color: "white", padding: "8px 14px", borderRadius: "12px",
                        textDecoration: "none", fontSize: "10px", fontWeight: "800",
                        display: "flex", alignItems: "center", gap: "6px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                    }}>
                        <i className="fas fa-calendar-alt"></i> MI ACTIVIDAD
                    </Link>

                    <button onClick={() => navigate("/imc/analisis")} style={{
                        position: "absolute", top: "-12px", right: "15px", zIndex: 10,
                        background: "linear-gradient(135deg, #6e8a4f 0%, #444 100%)",
                        color: "white", padding: "8px 14px", borderRadius: "12px",
                        border: "none", cursor: "pointer", fontSize: "10px", fontWeight: "800",
                        display: "flex", alignItems: "center", gap: "6px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                    }}>
                        BIO-INFORME <i className="fas fa-chart-line"></i>
                    </button>

                    <h4 style={{ marginBottom: "15px", marginTop: "10px", fontSize: "16px", fontWeight: "800" }}>
                        Mis Medidas e IMC
                    </h4>

                    <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px", alignItems: "center" }}>
                        <div style={{ textAlign: "center" }}>
                            <span style={{ fontSize: "10px", display: "block", marginBottom: "5px" }}>PESO (KG)</span>
                            <input
                                type="number"
                                className="input-vitta-new"
                                value={tempPeso}
                                onChange={(e) => setTempPeso(e.target.value)}
                            />
                        </div>
                        <div style={{ width: "1px", height: "50px", backgroundColor: "#eee" }}></div>
                        <div style={{ textAlign: "center" }}>
                            <span style={{ fontSize: "10px", display: "block", marginBottom: "5px" }}>ALTURA (CM)</span>
                            <input
                                type="number"
                                className="input-vitta-new"
                                value={tempAltura}
                                onChange={(e) => setTempAltura(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleClickActualizar}
                        disabled={!hayCambios || guardando}
                        style={{
                            background: hayCambios ? colorVerdeVitta : "#eee",
                            color: hayCambios ? "white" : "#999",
                            border: "none", borderRadius: "14px",
                            padding: "14px", fontWeight: "800",
                            width: "100%", cursor: "pointer", transition: "0.3s"
                        }}
                    >
                        {guardando ? "GUARDANDO..." : "ACTUALIZAR DATOS"}
                    </button>

                    <hr style={{ border: "none", borderTop: "1px solid #f0f0f0", margin: "25px 0" }} />

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                        <span style={{ fontSize: "14px", fontWeight: "600" }}>TU IMC ACTUAL</span>
                        <strong style={{ fontSize: "24px", color: colorVerdeVitta, fontWeight: "900" }}>
                            {imcCalculado}
                        </strong>
                    </div>

                    <div style={{ position: "relative", height: "10px", backgroundColor: "#eee", borderRadius: "10px", margin: "20px 0 10px 0" }}>
                        <div style={{
                            position: "absolute", inset: 0, borderRadius: "10px",
                            background: "linear-gradient(to right, #3498db, #2ecc71, #f1c40f, #e74c3c)",
                            opacity: 0.25
                        }}></div>
                        <div style={{
                            position: "absolute",
                            left: `${calcularPosicion(imcCalculado)}%`,
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "18px", height: "18px",
                            backgroundColor: "white",
                            border: `4px solid ${colorVerdeVitta}`,
                            borderRadius: "50%",
                            boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
                            transition: "left 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
                        }}></div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", fontWeight: "700", color: "#999" }}>
                        <span>BAJO</span>
                        <span>NORMAL</span>
                        <span>SOBREPESO</span>
                    </div>
                </div>

                {datosHistorial.length > 0 && (
                    <div style={cardStyle}>
                        <h4 style={{ fontSize: "14px", fontWeight: "800", marginBottom: "12px" }}>HISTORIAL DE PESO</h4>
                        {datosHistorial.map((entrada) => (
                            <div key={entrada.id} style={{
                                display: "flex", justifyContent: "space-between",
                                alignItems: "center", padding: "8px 0",
                                borderBottom: "1px solid #f0f0f0"
                            }}>
                                <span style={{ fontSize: "12px", color: "#999" }}>
                                    {new Date(entrada.fecha).toLocaleDateString("es-ES")}
                                </span>
                                <span style={{ fontWeight: "700", color: colorVerdeVitta }}>
                                    {entrada.peso} kg
                                </span>
                                <button
                                    onClick={() => handleEliminarEntrada(entrada.id)}
                                    style={{
                                        background: "none", border: "none",
                                        color: "#e74c3c", cursor: "pointer", fontSize: "14px"
                                    }}
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {loadingNutri && (
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: '20px',
                        color: colorVerdeVitta
                    }}>
                    <i className="fas fa-spinner fa-spin"></i>
                    <span style={{ fontSize: '12px', fontWeight: '600' }}>
                        Vitta IA analizando tu nutrición...
                    </span>
                </div>
            )}

            {nutricion && !loadingNutri && (
                <div className="card-nutri">
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '10px'
                    }}>
                        <span style={{ fontSize: '20px' }}>🥑</span>
                        <h5 style={{
                            margin: 0,
                            fontSize: '14px',
                            fontWeight: '800',
                            color: colorVerdeVitta
                        }}>VITTA NUTRI-BOT</h5>
                    </div>

                    <p style={{ fontSize: '12px', margin: '5px 0' }}>
                        <strong>Objetivo:</strong> {nutricion.objetivo}
                    </p>

                    <p style={{ fontSize: '12px', margin: '5px 0', color: '#555' }}>
                        "{nutricion.consejo_clave}"
                    </p>

                    <div style={{
                        background: 'white',
                        padding: '10px',
                        borderRadius: '10px',
                        marginTop: '10px',
                        borderLeft: `4px solid ${colorVerdeVitta}`
                    }}>
                        <span style={{
                            fontSize: '10px',
                            fontWeight: '800',
                            color: colorVerdeVitta,
                            display: 'block'
                        }}>
                            PLATO RECOMENDADO:
                        </span>
                        <span style={{ fontSize: '13px', color: '#333' }}>
                            {nutricion.ejemplo_plato}
                        </span>
                    </div>

                    <p style={{
                        fontSize: '10px',
                        marginTop: '10px',
                        color: '#e74c3c',
                        fontWeight: '700'
                    }}>
                        <i className="fas fa-exclamation-triangle"></i> EVITAR: {nutricion.evitar}
                    </p>
                </div>
            )}
        </div>
    );
};