import React, { useState, useEffect } from "react";
import { AnalisisDetallado } from "./AnalisisDetallado";
import { Link } from "react-router-dom";

export const Imc = () => {
    const colorVerdeVitta = "#6e8a4f";

    // se cargan los datos desde localStorage para no perderlos al recargar
    const [pesoConfirmado, setPesoConfirmado] = useState(() => parseFloat(localStorage.getItem("vitta_peso")) || 100);
    const [alturaConfirmado, setAlturaConfirmado] = useState(() => parseFloat(localStorage.getItem("vitta_altura")) || 175);

    // Estados temporales
    const [tempPeso, setTempPeso] = useState(pesoConfirmado);
    const [tempAltura, setTempAltura] = useState(alturaConfirmado);

    // Control de guardado y modal
    const [guardando, setGuardando] = useState(false);
    const [mostrarAnalisis, setMostrarAnalisis] = useState(false);

    // Historial de ejemplo
    const [datosHistorial] = useState([
        { fecha: "01/04", peso: 105, objetivo: 90 },
        { fecha: "08/04", peso: 102, objetivo: 90 },
        { fecha: "15/04", peso: 103, objetivo: 90 },
        { fecha: "22/04", peso: 100, objetivo: 90 },
    ]);

    const imcCalculado = (pesoConfirmado / ((alturaConfirmado / 100) ** 2)).toFixed(1);

    // Convierte el IMC en una posición dentro de la barra visual
    const calcularPosicion = (valor) => {
        const v = parseFloat(valor);
        const min = 15;
        const max = 35;
        const porcentaje = ((v - min) / (max - min)) * 100;
        return Math.min(Math.max(porcentaje, 5), 95);
    };
    const handleGuardarCambios = () => {
        setGuardando(true);

        const nuevoPeso = parseFloat(tempPeso);
        const nuevaAltura = parseFloat(tempAltura);
        const imcReal = (nuevoPeso / ((nuevaAltura / 100) ** 2)).toFixed(1);

        let estado = "";
        if (imcReal < 18.5) estado = "Bajo peso";
        else if (imcReal < 25) estado = "Peso saludable";
        else if (imcReal < 30) estado = "Sobrepeso";
        else estado = "Obesidad";


        setTimeout(() => {
            // se actuliza estado en React
            setPesoConfirmado(nuevoPeso);
            setAlturaConfirmado(nuevaAltura);

            // se guarda  en localStorage
            localStorage.setItem("vitta_peso", nuevoPeso);
            localStorage.setItem("vitta_altura", nuevaAltura);
            localStorage.setItem("vitta_estado_fisico", estado);
            localStorage.setItem("vitta_valor_imc", imcReal);

            setGuardando(false);
            console.log("Sincronización completa:", estado, imcReal);
        }, 800);
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
                    usuario={{ peso: pesoConfirmado, altura: alturaConfirmado, grasa: 22 }}
                    historial={datosHistorial}
                    alCerrar={() => setMostrarAnalisis(false)}
                />
            )}

            <style>
                {`
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
        `}
            </style>

            <div style={{ padding: "30px 20px 10px 20px" }}>
                <h2 style={{ fontSize: "28px", fontWeight: "800", color: "white", margin: 0 }}>
                    Resumen Saludable
                </h2>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>
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

                    <Link to="/imc/analisis"
                        style={{
                            position: "absolute",
                            top: "-12px",
                            right: "15px",
                            zIndex: 10,
                            background: "linear-gradient(135deg, #6e8a4f 0%, #444 100%)",
                            color: "white",
                            padding: "8px 14px",
                            borderRadius: "12px",
                            textDecoration: "none",
                            fontSize: "10px",
                            fontWeight: "800",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                        }}>
                        BIO-INFORME <i className="fas fa-chart-line"></i>
                    </Link>

                    <h4 style={{
                        marginBottom: "15px",
                        marginTop: "10px",
                        fontSize: "16px",
                        fontWeight: "800"
                    }}>
                        Mis Medidas e IMC
                    </h4>

                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        marginBottom: "20px", alignItems: "center"
                    }}>
                        <div style={{ textAlign: "center" }}>
                            <span
                                style={{
                                    fontSize: "10px",
                                    display: "block",
                                    marginBottom: "5px"
                                }}>PESO (KG)</span>
                            <input type="number" className="input-vitta-new" value={tempPeso} onChange={(e) => setTempPeso(e.target.value)} />
                        </div>

                        <div
                            style={{
                                width: "1px",
                                height: "50px",
                                backgroundColor: "#eee"
                            }}></div>

                        <div style={{ textAlign: "center" }}>
                            <span style={{
                                fontSize: "10px",
                                display: "block",
                                marginBottom: "5px"
                            }}>ALTURA (CM)</span>
                            <input type="number" className="input-vitta-new" value={tempAltura} onChange={(e) => setTempAltura(e.target.value)} />
                        </div>
                    </div>

                    <button
                        onClick={handleGuardarCambios}
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

                    <hr style={{
                        border: "none",
                        borderTop: "1px solid #f0f0f0",
                        margin: "25px 0"
                    }} />

                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px"
                    }}>
                        <span style={{
                            fontSize: "14px",
                            fontWeight: "600"
                        }}>TU IMC ACTUAL</span>
                        <strong style={{
                            fontSize: "24px", color: colorVerdeVitta,
                            fontWeight: "900"
                        }}>
                            {imcCalculado}
                        </strong>
                    </div>

                    <div style={{
                        position: "relative",
                        height: "10px",
                        backgroundColor: "#eee",
                        borderRadius: "10px",
                        margin: "20px 0 10px 0"
                    }}>
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "10px",
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
                            transition: "left 0.7s cubic-bezier(0.23, 1, 0.32, 1)"
                        }}></div>
                    </div>

                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "10px",
                        fontWeight: "700",
                        color: "#999"
                    }}>
                        <span>BAJO</span>
                        <span>NORMAL</span>
                        <span>SOBREPESO</span>
                    </div>

                </div>
            </div>
        </div>
    );
};