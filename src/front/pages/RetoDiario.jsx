import React, { useState, useEffect } from "react";

const RetoDiario = ({ cardGlassStyle, colorVerdeVitta }) => {
    const [completado, setCompletado] = useState(false);
    const [retoHoy, setRetoHoy] = useState({});

    const retos = [
        { titulo: "Hidratación", desc: "Cambia hoy tu bebida azucarada por agua con limón.", icon: "fa-tint" },
        { titulo: "Fibra Vitta", desc: "Prueba a incluir una pieza de fruta entera en tu desayuno.", icon: "fa-apple-alt" },
        { titulo: "Paseo Activo", desc: "No te olvides de andar e intenta llegar a los 10mil pasos", icon: "fa-walking" },
        { titulo: "Cena Ligera", desc: "Intenta que tu cena sea 50% verduras u hortalizas.", icon: "fa-leaf" },
        { titulo: "Snack Sabio", desc: "Sustituye los ultraprocesados por un puñado de frutos secos.", icon: "fa-seedling" },
        { titulo: "Menos Sal", desc: "Usa especias en lugar de sal para dar sabor a tus platos hoy.", icon: "fa-mortar-pestle" }
    ];

    useEffect(() => {
        const diaDelMes = new Date().getDate();
        const indice = diaDelMes % retos.length;
        setRetoHoy(retos[indice]);
    }, []);

    return (
        <div className="px-3 mb-5">
            <div style={{ ...cardGlassStyle, position: "relative" }}>

                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <span
                            style={{
                                fontSize: "10px",
                                fontWeight: "800",
                                color: colorVerdeVitta,
                                textTransform: "uppercase",
                                letterSpacing: "1px"
                            }}
                        >
                            Reto VITTA del día
                        </span>

                        <h4
                            style={{
                                color: "#222",
                                fontSize: "20px",
                                fontWeight: "800",
                                marginTop: "4px"
                            }}
                        >
                            {retoHoy.titulo}
                        </h4>
                    </div>

                    <div
                        style={{
                            width: "45px",
                            height: "45px",
                            borderRadius: "50%",
                            border: `3px solid ${completado ? colorVerdeVitta : colorVerdeVitta + "33"}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "18px",
                            color: colorVerdeVitta,
                            transition: "all 0.5s ease"
                        }}
                    >
                        <i className={`fas ${completado ? "fa-check" : retoHoy.icon}`}></i>
                    </div>
                </div>

                <p
                    style={{
                        color: "#666",
                        fontSize: "14px",
                        lineHeight: "1.5",
                        marginBottom: "20px"
                    }}
                >
                    "{retoHoy.desc}"
                </p>

                <button
                    className="btn w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                    style={{
                        backgroundColor: completado ? "#4a5240" : colorVerdeVitta,
                        color: "white",
                        borderRadius: "18px",
                        border: "none",
                        fontWeight: "700",
                        fontSize: "14px",
                        transition: "all 0.3s ease",
                        boxShadow: completado ? "none" : `0 8px 20px ${colorVerdeVitta}44`
                    }}
                    onClick={() => setCompletado(!completado)}
                >
                    <i className={`fas ${completado ? "fa-check-circle" : "fa-circle-check"}`}></i>
                    {completado ? "¡Reto logrado!" : "Marcar como hecho"}
                </button>

                {completado && (
                    <div className="text-center mt-3 vitta-fade-in">
                        <span
                            style={{
                                fontSize: "11px",
                                color: colorVerdeVitta,
                                fontWeight: "700"
                            }}
                        >
                            ✨ ¡Sumas +10 puntos de salud!
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RetoDiario;