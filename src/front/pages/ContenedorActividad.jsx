import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlanificadorSemanal } from "./PlanificadorSemanal";
import { RutinaIA } from "./RutinaIA";

export const ContenedorActividad = () => {
    const navigate = useNavigate();
    const colorVerdeVitta = "#6e8a4f";

    const [verRutina, setVerRutina] = useState(false);

    // Recibe los datos del planificador
    const manejarCambioActividad = (mins, diasActivos) => {
        console.log("Sesión:", mins, "Días:", diasActivos);
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <div style={{
                padding: "15px 20px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "transparent",
            }}>
                <button
                    onClick={() => navigate("/imc")}
                    style={{
                        background: "rgba(255,255,255,0.2)",
                        border: "none",
                        color: "white",
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer"
                    }}
                >
                    <i className="fas fa-arrow-left"></i>
                </button>

                <span style={{
                    marginLeft: "15px",
                    fontWeight: "800",
                    fontSize: "14px",
                    color: "white",
                    letterSpacing: "0.5px"
                }}>
                    MI ACTIVIDAD
                </span>
            </div>

            <div style={{ padding: "10px 20px 20px 20px" }}>
                <div style={{ marginBottom: "30px", marginTop: "10px" }}>
                    <button
                        onClick={() => setVerRutina(true)}
                        style={{
                            width: '100%',
                            padding: '22px',
                            borderRadius: '24px',
                            background: `linear-gradient(135deg, ${colorVerdeVitta} 0%, #5a7241 100%)`,
                            color: 'white',
                            fontWeight: '800',
                            border: '1px solid rgba(255,255,255,0.2)',
                            fontSize: '13px',
                            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>

                        <i className="ai-icon" style={{ display: "flex", alignItems: "center" }}>
                            <img
                                src="/icono-ia-perfecto.png"
                                alt="AI Vitta"
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "50%",
                                    background: "white",
                                    padding: "4px",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                    transform: "scale(1.12)",
                                    boxShadow: "0 0 8px rgba(255,255,255,0.4)"
                                }} />
                        </i>

                        GENERAR MI RUTINA PERSONALIZADA
                    </button>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <h4 style={{
                        color: "white",
                        marginBottom: "20px",
                        fontSize: "17px",
                        fontWeight: '800'
                    }}>
                        Ajustes de entrenamiento
                    </h4>

                    <PlanificadorSemanal
                        colorVerdeVitta={colorVerdeVitta}
                        onCambioActividad={manejarCambioActividad} />
                </div>

                {verRutina && (
                    <RutinaIA
                        alCerrar={() => setVerRutina(false)} />
                )}

            </div>
        </div>
    );
};