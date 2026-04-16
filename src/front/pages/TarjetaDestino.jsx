import React, { useState, useEffect } from "react";

const TarjetaDestino = ({ destino, ubicacionUsuario, alCerrar, colorVerdeVitta, onToggleFavorito, esFavorito }) => {
    const [datosReales, setDatosReales] = useState({ km: 0, pasos: 0 });

    useEffect(() => {
        if (destino && ubicacionUsuario) {
            const R = 6371;
            const dLat = (destino.lat - ubicacionUsuario.lat) * Math.PI / 180;
            const dLon = (destino.lon - ubicacionUsuario.lon) * Math.PI / 180;

            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(ubicacionUsuario.lat * Math.PI / 180) *
                Math.cos(destino.lat * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distancia = R * c;

            setDatosReales({
                km: distancia.toFixed(2),
                pasos: Math.round(distancia * 1315)
            });
        }
    }, [destino, ubicacionUsuario]);

    if (!destino) return null;

    return (
        <div className="mb-3 p-3 shadow-sm" style={{ backgroundColor: "white", borderRadius: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div className="d-flex justify-content-between align-items-center">
                <div style={{ maxWidth: "70%" }}>
                    <span style={{ fontSize: "9px", fontWeight: "900", color: colorVerdeVitta }}>
                        DESTINO SELECCIONADO
                    </span>

                    <h6 style={{ fontWeight: "800", margin: 0, color: "#333", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {destino.nombre}
                    </h6>
                </div>

                <div className="d-flex gap-2">
                    <button
                        onClick={() => onToggleFavorito(destino)}
                        style={{ background: "none", border: "none", color: esFavorito ? "#ffc107" : "#ccc", fontSize: "20px", cursor: "pointer" }}>
                        <i className={`${esFavorito ? "fas" : "far"} fa-star`}></i>
                    </button>

                    <button
                        onClick={alCerrar}
                        style={{ background: "none", border: "none", color: "#ccc", fontSize: "20px", cursor: "pointer" }}>
                        <i className="fas fa-times-circle"></i>
                    </button>
                </div>
            </div>

            <div className="d-flex gap-2" style={{ borderTop: "1px solid #f5f5f5", paddingTop: "12px" }}>
                <div className="text-center flex-grow-1">
                    <i className="fas fa-route mb-1" style={{ color: colorVerdeVitta }}></i>
                    <div style={{ fontSize: "13px", fontWeight: "800", color: "#333" }}>
                        {datosReales.km} km
                    </div>

                    <div style={{ fontSize: "8px", color: "#999", fontWeight: "700" }}>
                        DISTANCIA
                    </div>
                </div>

                <div className="text-center flex-grow-1" style={{ borderLeft: "1px solid #eee", borderRight: "1px solid #eee" }}>
                    <i className="fas fa-shoe-prints mb-1" style={{ color: "#3498db" }}></i>
                    <div style={{ fontSize: "13px", fontWeight: "800", color: "#333" }}>
                        {datosReales.pasos}
                    </div>
                    <div style={{ fontSize: "8px", color: "#999", fontWeight: "700" }}>
                        PASOS ESTIMADOS
                    </div>
                </div>

                <div className="text-center flex-grow-1">
                    <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${destino.lat},${destino.lon}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: "none" }}>
                        <div
                            style={{
                                width: "32px",
                                height: "32px",
                                backgroundColor: colorVerdeVitta,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto"
                            }}><i className="fas fa-directions" style={{ color: "white", fontSize: "12px" }}></i>
                        </div>

                        <div style={{ fontSize: "8px", color: colorVerdeVitta, fontWeight: "900", marginTop: "4px" }}>IR AHORA</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TarjetaDestino;