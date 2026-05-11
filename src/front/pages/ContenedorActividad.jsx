import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlanificadorSemanal } from "./PlanificadorSemanal";
import { RutinaIA } from "./RutinaIA";

export const ContenedorActividad = () => {
    const navigate = useNavigate();
    const colorVerdeVitta = "#6e8a4f";

    const [verRutina, setVerRutina] = useState(false);
    const [diasEntreno, setDiasEntreno] = useState(3);

    // Recibe los datos del planificador
    const manejarCambioActividad = (mins, diasActivos) => {
        setDiasEntreno(diasActivos);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column"
            }}
        >

            <div
                style={{
                    padding: "15px 20px",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "transparent",
                }}
            >
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

                <span
                    style={{
                        marginLeft: "15px",
                        fontWeight: "800",
                        fontSize: "14px",
                        color: "white",
                        letterSpacing: "0.5px"
                    }}
                >
                    MI ACTIVIDAD
                </span>
            </div>

            <div style={{ padding: "10px 20px 20px 20px" }}>

                <div style={{ marginBottom: "30px", marginTop: "10px" }}>
                    <button
                        onClick={() => setVerRutina(true)}
                        style={{
                            width: "100%",
                            padding: "22px",
                            borderRadius: "24px",
                            background: "rgba(173, 202, 130, 0.18)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.10)",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                            color: "white",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                            textAlign: "left",
                        }}
                    >
                        <div
                            style={{
                                width: "72px",
                                height: "72px",
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.10)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                boxShadow: "0 0 18px rgba(255,255,255,0.25)",
                            }}
                        >
                            <img
                                src="/icono-ia-perfecto.png"
                                alt="IA Vitta"
                                style={{
                                    width: "62px",
                                    height: "62px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>

                        <div>
                            <div
                                style={{
                                    fontSize: "13px",
                                    fontWeight: "800",
                                    letterSpacing: "2px",
                                    textTransform: "uppercase",
                                    color: "rgba(255,255,255,0.72)",
                                    marginBottom: "6px",
                                }}
                            >
                                VITTA IA
                            </div>

                            <div
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "900",
                                    lineHeight: "1.2",
                                    color: "white",
                                }}
                            >
                                Generar mi rutina personalizada
                            </div>
                        </div>
                    </button>
                </div>

                <div style={{ textAlign: "center" }}>
                    <h4
                        style={{
                            color: "white",
                            marginBottom: "20px",
                            fontSize: "17px",
                            fontWeight: "800"
                        }}
                    >
                        Ajustes de entrenamiento
                    </h4>

                    <PlanificadorSemanal
                        colorVerdeVitta={colorVerdeVitta}
                        onCambioActividad={manejarCambioActividad}
                    />
                </div>

                {verRutina && (
                    <RutinaIA
                        dias={diasEntreno}
                        alCerrar={() => setVerRutina(false)}
                    />
                )}
            </div>
        </div>
    );
};