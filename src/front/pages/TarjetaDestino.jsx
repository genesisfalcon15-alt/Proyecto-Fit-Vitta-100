import React, { useState, useEffect } from "react";

const TarjetaDestino = ({ destino, ubicacionUsuario, alCerrar, colorVerdeVitta, onToggleFavorito, esFavorito }) => {
    const [datosReales, setDatosReales] = useState({ km: 0, pasos: 0 });

    useEffect(() => {
        if (destino && ubicacionUsuario) {
            const R = 6371;
            const dLat = (destino.lat - ubicacionUsuario.lat) * Math.PI / 180;
            const dLon = (destino.lon - ubicacionUsuario.lon) * Math.PI / 180;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(ubicacionUsuario.lat * Math.PI / 180) * Math.cos(destino.lat * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distancia = R * c;
            setDatosReales({ km: distancia.toFixed(2), pasos: Math.round(distancia * 1315) });
        }
    }, [destino, ubicacionUsuario]);

    if (!destino) return null;

    return (
        <div style={{
            backgroundColor: "white",
            borderRadius: "20px 20px 0 0",
            padding: "12px 16px 10px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 -2px 16px rgba(0,0,0,0.12)",
            fontFamily: "'Poppins', sans-serif"
        }}>

            <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                backgroundColor: "#fdecea", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center"
            }}>
                <i className="fas fa-map-marker-alt" style={{ color: "#e74c3c", fontSize: "15px" }}></i>
            </div>


            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "13px", fontWeight: "800", color: "#222", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {destino.nombre}
                </div>
                <div style={{ display: "flex", gap: "6px", marginTop: "4px", flexWrap: "wrap" }}>
                    <span style={{
                        fontSize: "10px", fontWeight: "700", color: colorVerdeVitta,
                        backgroundColor: "#f0f4ec", borderRadius: "20px", padding: "2px 8px"
                    }}>
                        <i className="fas fa-route me-1"></i>{datosReales.km} km
                    </span>
                    <span style={{
                        fontSize: "10px", fontWeight: "700", color: "#3498db",
                        backgroundColor: "#eaf4fb", borderRadius: "20px", padding: "2px 8px"
                    }}>
                        <i className="fas fa-shoe-prints me-1"></i>{datosReales.pasos} pasos
                    </span>
                </div>
            </div>


            <div style={{ display: "flex", gap: "6px", alignItems: "center", flexShrink: 0 }}>
                <button onClick={() => onToggleFavorito(destino)} style={{
                    background: "none", border: "none",
                    color: esFavorito ? "#ffc107" : "#ccc",
                    fontSize: "18px", cursor: "pointer", padding: 0
                }}>
                    <i className={`${esFavorito ? "fas" : "far"} fa-star`}></i>
                </button>

                <a href={`https://www.google.com/maps/dir/?api=1&destination=${destino.lat},${destino.lon}`}
                    target="_blank" rel="noreferrer"
                    style={{
                        backgroundColor: colorVerdeVitta, color: "white",
                        borderRadius: "20px", padding: "6px 12px",
                        fontSize: "11px", fontWeight: "800",
                        textDecoration: "none", display: "flex",
                        alignItems: "center", gap: "5px"
                    }}>
                    <i className="fas fa-directions"></i> Ir
                </a>

                <button onClick={alCerrar} style={{
                    background: "none", border: "none",
                    color: "#ccc", fontSize: "18px",
                    cursor: "pointer", padding: 0
                }}>
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </div>
    );
};

export default TarjetaDestino;