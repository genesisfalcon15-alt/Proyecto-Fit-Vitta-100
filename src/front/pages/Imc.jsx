import React, { useState, useEffect } from "react";
import { AnalisisDetallado } from "./AnalisisDetallado";
import { PlanificadorSemanal } from "./PlanificadorSemanal";
import { RutinaIA } from "./RutinaIA";

export const Imc = () => {
    const colorVerdeVitta = "#6e8a4f";


    const [pesoConfirmado, setPesoConfirmado] = useState(100);
    const [alturaConfirmado, setAlturaConfirmado] = useState(175);
    const [tempPeso, setTempPeso] = useState(100);
    const [tempAltura, setTempAltura] = useState(175);

    const [minutosEntreno, setMinutosEntreno] = useState(45);
    const [diasEntreno, setDiasEntreno] = useState(3);

    const [guardando, setGuardando] = useState(false);
    const [mostrarAnalisis, setMostrarAnalisis] = useState(false);
    const [verRutina, setVerRutina] = useState(false);

    useEffect(() => {
        const app = document.getElementById("app-container");

        if (!app) return;

        if (mostrarAnalisis) {
            app.style.overflow = "hidden";
        } else {
            app.style.overflow = "auto";
        }

        return () => {
            app.style.overflow = "auto";
        };
    }, [mostrarAnalisis]);

    const [datosHistorial] = useState([
        { fecha: "01/04", peso: 105, objetivo: 90 },
        { fecha: "08/04", peso: 102, objetivo: 90 },
        { fecha: "15/04", peso: 103, objetivo: 90 },
        { fecha: "22/04", peso: 100, objetivo: 90 },
    ]);

    const imcCalculado = (pesoConfirmado / ((alturaConfirmado / 100) ** 2)).toFixed(1);

    const calcularPosicion = (valor) => {
        const min = 15; const max = 35;
        const porcentaje = ((valor - min) / (max - min)) * 100;
        return Math.min(Math.max(porcentaje, 5), 95);
    };

    const handleGuardarCambios = () => {
        setGuardando(true);
        setTimeout(() => {
            setPesoConfirmado(parseFloat(tempPeso));
            setAlturaConfirmado(parseFloat(tempAltura));
            setGuardando(false);
        }, 800);
    };

    const hayCambios = parseFloat(tempPeso) !== pesoConfirmado || parseFloat(tempAltura) !== alturaConfirmado;

    const cardStyle = {
        background: "rgba(255, 255, 255, 0.98)",
        borderRadius: "24px",
        padding: "20px",
        marginBottom: "16px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)"
    };

    return (
        <div style={{ width: "100%", flex: 1 }}>

            {mostrarAnalisis && (
                <AnalisisDetallado
                    usuario={{
                        peso: pesoConfirmado,
                        altura: alturaConfirmado,
                        grasa: 22,
                        minutos: minutosEntreno,
                        dias: diasEntreno
                    }}
                    historial={datosHistorial}
                    alCerrar={() => setMostrarAnalisis(false)}
                />
            )}

            {verRutina && (
                <RutinaIA
                    imc={imcCalculado}
                    alCerrar={() => setVerRutina(false)}
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
            background: #f0f2f0; border: none; border-radius: 12px;
            color: #333 !important; width: 85px; font-weight: 800;
            font-size: 22px; text-align: center; padding: 10px 5px;
          }
        `}
            </style>

            <div style={{ padding: "30px 20px 10px 20px" }}>
                <h2 style={{ fontSize: "28px", fontWeight: "800", color: "white", margin: 0 }}>Resumen Saludable</h2>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>Datos y Consejos</p>
            </div>

            <div style={{ padding: "0 20px" }} className="seccion-escritura">

                <div style={cardStyle}>
                    <h4 style={{ marginBottom: "15px", fontSize: "16px", fontWeight: '800' }}>Mis Medidas e IMC</h4>

                    <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px", alignItems: 'center' }}>
                        <div style={{ textAlign: "center" }}>
                            <span style={{ fontSize: "10px", display: "block", marginBottom: '5px' }}>PESO (KG)</span>
                            <input type="number" className="input-vitta-new" value={tempPeso} onChange={(e) => setTempPeso(e.target.value)} />
                        </div>
                        <div style={{ width: '1px', height: '50px', backgroundColor: '#eee' }}></div>
                        <div style={{ textAlign: "center" }}>
                            <span style={{ fontSize: "10px", display: "block", marginBottom: '5px' }}>ALTURA (CM)</span>
                            <input type="number" className="input-vitta-new" value={tempAltura} onChange={(e) => setTempAltura(e.target.value)} />
                        </div>
                    </div>

                    <button
                        onClick={handleGuardarCambios}
                        disabled={!hayCambios || guardando}
                        style={{
                            background: hayCambios ? colorVerdeVitta : "#eee",
                            color: hayCambios ? "white" : "#999",
                            border: "none", borderRadius: "14px", padding: "14px", fontWeight: "800", width: "100%", cursor: 'pointer'
                        }}
                    >
                        {guardando ? "GUARDANDO..." : "ACTUALIZAR"}
                    </button>

                    <hr style={{ border: "none", borderTop: "1px solid #f0f0f0", margin: "25px 0" }} />

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                        <span style={{ fontSize: "14px", fontWeight: '600' }}>TU IMC ACTUAL</span>
                        <strong style={{ fontSize: "24px", color: colorVerdeVitta, fontWeight: '900' }}>{imcCalculado}</strong>
                    </div>

                    <div style={{ position: "relative", height: "10px", backgroundColor: "#eee", borderRadius: "10px", margin: "20px 0 10px 0" }}>
                        <div style={{ position: "absolute", inset: 0, borderRadius: "10px", background: "linear-gradient(to right, #3498db, #2ecc71, #f1c40f, #e74c3c)", opacity: 0.25 }}></div>
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

                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", fontWeight: '700', color: '#999' }}>
                        <span>BAJO</span><span>NORMAL</span><span>SOBREPESO</span>
                    </div>

                    <button
                        onClick={() => setVerRutina(true)}
                        style={{
                            marginTop: '25px',
                            backgroundColor: colorVerdeVitta,
                            color: 'white',
                            border: "none", borderRadius: "16px", padding: "16px",
                            fontWeight: "800", width: "100%", cursor: 'pointer',
                            fontSize: '12px', letterSpacing: '0.5px'
                        }}
                    >
                        🔥 VER MI RUTINA PERSONALIZADA
                    </button>
                </div>

                <div style={cardStyle}>
                    <h4 style={{ marginBottom: "15px", fontSize: "16px", fontWeight: '800' }}>Mi Plan de Actividad</h4>
                    <PlanificadorSemanal
                        colorVerdeVitta={colorVerdeVitta}
                        onCambioActividad={(mins, dias) => {
                            setMinutosEntreno(mins);
                            setDiasEntreno(dias);
                        }}
                    />
                </div>

                <button
                    onClick={() => setMostrarAnalisis(true)}
                    style={{
                        width: "100%", background: colorVerdeVitta, color: "white",
                        padding: "18px", borderRadius: "20px", border: "none",
                        fontWeight: "800", fontSize: "14px", letterSpacing: "1px",
                        marginBottom: "30px", boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                        cursor: 'pointer'
                    }}
                >
                    VER INFORME Y EVOLUCIÓN <i className="fas fa-chart-line" style={{ marginLeft: "10px" }}></i>
                </button>

            </div>
        </div>
    );
};