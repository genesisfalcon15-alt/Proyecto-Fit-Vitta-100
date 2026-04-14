import React, { useState } from "react";


const TarjetaDestino = ({ destino, alCerrar, colorVerdeVitta }) => {
    const [esFavorito, setEsFavorito] = useState(false);

    if (!destino) return null;

    return (
        <div
            className="mt-3 p-3 shadow-sm vitta-route-card"
            style={{
                backgroundColor: "white",
                borderRadius: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
            }}
        >
            {/* Cabecera*/}
            <div className="d-flex justify-content-between align-items-center">
                <div style={{ maxWidth: "75%" }}>
                    <span
                        style={{
                            fontSize: "9px",
                            fontWeight: "900",
                            color: colorVerdeVitta,
                            textTransform: "uppercase"
                        }}
                    >
                        Destino Seleccionado
                    </span>

                    <h6
                        style={{
                            fontWeight: "800",
                            margin: 0,
                            color: "#333",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}
                    >
                        {destino.nombre}
                    </h6>
                </div>

                <div className="d-flex gap-2">
                    {/* Ubicación favorita */}
                    <button
                        onClick={() => setEsFavorito(!esFavorito)}
                        className="vitta-btn-animation"
                        style={{
                            background: "none",
                            border: "none",
                            color: esFavorito ? "#ffc107" : "#ccc",
                            fontSize: "18px",
                            transition: "transform 0.2s"
                        }}
                    >
                        <i className={`${esFavorito ? "fas" : "far"} fa-star`} />
                    </button>

                    {/* boton cerrar */}
                    <button
                        onClick={alCerrar}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#ccc",
                            fontSize: "18px"
                        }}
                    >
                        <i className="fas fa-times-circle" />
                    </button>
                </div>
            </div>

            {/* contenido */}
            <div
                className="d-flex gap-2"
                style={{
                    borderTop: "1px solid #f0f0f0",
                    paddingTop: "12px"
                }}
            >
                {/* tiempo */}
                <div className="text-center flex-grow-1">
                    <i
                        className="fas fa-walking mb-1"
                        style={{ color: colorVerdeVitta }}
                    />
                    <div style={{ fontSize: "12px", fontWeight: "800", color: "#333" }}>
                        12 min
                    </div>
                    <div style={{ fontSize: "8px", color: "#999" }}>
                        A PIE
                    </div>
                </div>

                {/* kalorias */}
                <div
                    className="text-center flex-grow-1"
                    style={{
                        borderLeft: "1px solid #eee",
                        borderRight: "1px solid #eee"
                    }}
                >
                    <i
                        className="fas fa-fire mb-1"
                        style={{ color: "#ffc107" }}
                    />
                    <div style={{ fontSize: "12px", fontWeight: "800", color: "#333" }}>
                        54 kcal
                    </div>
                    <div style={{ fontSize: "8px", color: "#999" }}>
                        QUEMADAS
                    </div>
                </div>

                {/* acción */}
                <div className="text-center flex-grow-1">
                    <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${destino.lat},${destino.lon}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: "none" }}
                    >
                        <div
                            style={{
                                width: "35px",
                                height: "35px",
                                backgroundColor: colorVerdeVitta,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto"
                            }}
                        >
                            <i
                                className="fas fa-directions"
                                style={{ color: "white", fontSize: "14px" }}
                            />
                        </div>

                        <div
                            style={{
                                fontSize: "8px",
                                color: colorVerdeVitta,
                                fontWeight: "900",
                                marginTop: "4px"
                            }}
                        >
                            CÓMO LLEGAR
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TarjetaDestino;