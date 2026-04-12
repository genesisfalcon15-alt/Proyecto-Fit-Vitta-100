import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

export const Imc = () => {
    const colorVerdeVitta = "#6e8a4f";

    // Datos del usuario
    const usuarioInfo = {
        pesoActual: 80,
        alturaActual: 1.75,
        imcActual: 26.1,
        imcRecomendado: 22.0
    };

    // efecto Glassmorphism
    const cardGlassStyle = {
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "28px",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        padding: "25px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        marginBottom: "25px"
    };


    const calcularPosicion = (valor) => {
        const min = 15;
        const max = 35;
        const porcentaje = ((valor - min) / (max - min)) * 100; // aqui claculo el porcentaje que ocupa valor dentro del rango min-max.
        return Math.min(Math.max(porcentaje, 0), 100);
    };

    //usando hook. declaro la varible donde guardare los datos y la funcion para actualizarlos.
    const [datosHistorial, setDatosHistorial] = useState([
        { fecha: '01/04', peso: 85, objetivo: 75 },
        { fecha: '08/04', peso: 83, objetivo: 75 },
        { fecha: '15/04', peso: 84, objetivo: 75 },
        { fecha: '22/04', peso: 81, objetivo: 75 },
        { fecha: '29/04', peso: 80, objetivo: 75 },
    ]);

    const [nuevoPeso, setNuevoPeso] = useState("");
    const [animo, setAnimo] = useState("null");
    const [isPressing, setIsPressing] = useState(false);


    return (
        <div className="container-fluid p-0 d-flex flex-column"
            style={{
                minHeight: "100%",
                paddingBottom: "150px"
            }}>

            {/* Cabecera */}
            <div className="px-4 mt-4 mb-3">
                <h2 style={{
                    color: "white",
                    fontSize: "28px",
                    fontWeight: "800",
                    letterSpacing: "-0.5px"
                }}>
                    Tu estado Vitta
                </h2>
                <p style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "14px"
                }}>
                    Resumen de salud actual</p>
            </div>

            {/* caja de peso y altura */}
            <div className="px-3 mb{-4 d-flex gap-3">
                <div className="flex-grow-1 p-3 text-center"
                    style={{
                        backgroundColor: "rgba(255,255,255,0.2)",
                        borderRadius: "22px",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.2)"
                    }}>
                    <span className="d-block text-white-50 small mb-1">Peso Actual</span>
                    <strong className="text-white fs-3">{usuarioInfo.pesoActual}<span style={{ fontSize: "14px" }}>kg</span></strong>
                </div>
            </div>

            {/* imc */}
            <div className="px-3">
                <div style={cardGlassStyle}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 style={{
                            fontSize: "17px",
                            fontWeight: "700",
                            color: "#222",
                            margin: 0
                        }}>
                            Indice de Masa Corporal
                        </h4>
                        <div style={{
                            backgroundColor: colorVerdeVitta,
                            color: "white",
                            padding: "4px 12px",
                            borderRadius: "10px",
                            fontWeight: "800"
                        }}>
                            {usuarioInfo.imcActual}
                        </div>
                    </div>

                    <div style={{
                        position: "relative",
                        height: "10px",
                        width: "100%",
                        borderRadius: "10px",
                        background: "linear-gradient(to right, #ffeb3b, #4caf50, #ffeb3b, #f44336)",
                        marginTop: "10px"
                    }}>

                        <div style={{
                            position: "absolute",
                            left: `${calcularPosicion(usuarioInfo.imcRecomendado)}%`,
                            top: "-18px",
                            transform: "translateX(-50%)"
                        }}>
                            <small style={{
                                fontSize: "9px",
                                color: "#444",
                                fontWeight: "700"
                            }}>
                                IDEAL</small>
                            <div style={{ width: "2px", height: "15px", backgroundColor: "#444", margin: "0 auto" }}></div>
                        </div>


                        <div style={{
                            position: "absolute",
                            left: `${calcularPosicion(usuarioInfo.imcActual)}%`,
                            top: "50%", transform: "translate(-50%, -50%)",
                            width: "22px",
                            height: "22px",
                            backgroundColor: "white", border: `4px solid ${colorVerdeVitta}`,
                            borderRadius: "50%",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
                        }}></div>
                    </div>

                    <div className="d-flex justify-content-between mt-3">
                        <span style={{ fontSize: "9px", color: "black", fontWeight: "800" }}>BAJO</span>
                        <span style={{ fontSize: "9px", color: "black", fontWeight: "800" }}>SALUDABLE</span>
                        <span style={{ fontSize: "9px", color: "black", fontWeight: "800" }}>SOBREPESO</span>
                    </div>
                </div>
            </div>

            {/*actulización de registro */}

            <div className="px-3">
                <div style={cardGlassStyle}>
                    <p className="text-center fw-bold mb-3" style={{ color: "#222", fontSize: "16px" }}>¿Cómo te sientes hoy?.</p>

                    {/*espacio de iconos con iteracción*/}
                    <div className="d-flex justify-content-between px-1 mb-4">
                        {["😊", "🙂", "😐", "😟", "😡"].map((emoji, i) => (
                            <button
                                key={i}
                                onClick={() => setAnimo(i)}
                                style={{
                                    fontSize: "32px",
                                    transform: animo === i ? "scale(1.3)" : "scale(1)",
                                    background: animo === i ? "rgba(110, 138, 79, 0.15)" : "transparent",
                                    border: "none",
                                    borderRadius: "20px",
                                    padding: "10px",
                                    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                    cursor: "pointer",
                                    filter: animo === i ? "grayscale(0)" : "grayscale(0.5)",
                                    opacity: animo === i ? 1 : 0.7
                                }}>
                                {emoji}
                            </button>
                        ))}
                    </div>


                    <div className="mb-3">
                        <input type="number" className="form-control" style={{
                            backgroundColor: "rgba(0,0,0,0.05)",
                            border: "1px solid rgba(0,0,0,0.05)",
                            borderRadius: "15px",
                            padding: "14px"
                        }}
                            placeholder="Nuevo peso (kg)" value={nuevoPeso} onChange={(e) => setNuevoPeso(e.target.value)} />
                    </div>
                    <button
                        onMouseDown={() => setIsPressing(true)}
                        onMouseUp={() => setIsPressing(false)}
                        onMouseLeave={() => setIsPressing(false)}
                        className="btn w-100 py-3 shadow"
                        style={{
                            backgroundColor: "#222",
                            color: "white",
                            borderRadius: "18px",
                            fontWeight: "800",
                            border: "none",
                            transition: "all 0.1s ease",
                            transform: isPressing ? "scale(0.96)" : "scale(1)",
                            boxShadow: isPressing ? "0 2px 5px rgba(0,0,0,0.2)" : "0 10px 20px rgba(0,0,0,0.3)"
                        }}>
                        ACTUALIZAR PROGRESO
                    </button>
                </div>
            </div>

            {/*historial*/}

            <div className="px-3">
                <div style={cardGlassStyle}>
                    <h4 style={{ fontSize: "17px", fontWeight: "700", color: "#222" }} className="mb-4">Evolución de Peso</h4>
                    <div style={{ width: '100%', height: '180px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={datosHistorial}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="fecha" tick={{ fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} />
                                <YAxis hide />
                                <Line
                                    name="Mi Peso"
                                    type="monotone"
                                    dataKey="peso"
                                    stroke={colorVerdeVitta}
                                    strokeWidth={4}
                                    dot={{ r: 6, fill: colorVerdeVitta, strokeWidth: 3, stroke: "#fff" }} />

                                <Line
                                    name="Objetivo"
                                    type="stepAfter"
                                    dataKey="objetivo"
                                    stroke="#ffc107" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );



















































}
