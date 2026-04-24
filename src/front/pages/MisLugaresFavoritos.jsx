import React from "react";

export const Favoritos = ({ lista, onDelete, cargando }) => {
    const colorVerdeVitta = "#008f00";

    return (
        <div style={{ 
            width: "100%", 
            padding: "0 15px 100px 15px", // El padding bottom evita que el footer tape la última card
            display: "flex",
            flexDirection: "column",
            gap: "15px"
        }}>
            {cargando ? (
                <p className="text-center text-white p-5">Cargando favoritos...</p>
            ) : lista.length === 0 ? (
                <div className="text-center p-5" style={{ color: "rgba(255,255,255,0.4)" }}>
                    <i className="fas fa-heart-broken mb-2" style={{ fontSize: "30px" }}></i>
                    <p>No hay sitios guardados</p>
                </div>
            ) : (
                lista.map((fav, index) => {
                    const idParaBorrar = fav.id || fav.place_id;
                    return (
                        <div key={idParaBorrar || index} style={{
                            background: "white",
                            borderRadius: "25px",
                            padding: "18px",
                            display: "flex",
                            flexDirection: "column",
                            position: "relative",
                            borderLeft: `10px solid ${colorVerdeVitta}`,
                            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                            flexShrink: 0
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <h5 style={{ 
                                    margin: 0, fontWeight: "800", color: "#1a1a1a", 
                                    fontSize: "16px", maxWidth: "70%" 
                                }}>
                                    {fav.nombre || "Sitio guardado"}
                                </h5>
                                <div style={{
                                    background: "#f0f2f5", padding: "4px 10px", borderRadius: "10px",
                                    fontSize: "10px", fontWeight: "700", color: "#666"
                                }}>
                                    FAVORITO
                                </div>
                            </div>

                            <p style={{ margin: "5px 0 12px 0", fontSize: "12px", color: "#777", lineHeight: "1.3" }}>
                                {fav.direccion || "Dirección no disponible."}
                            </p>

                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <button 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        if(idParaBorrar) onDelete(idParaBorrar);
                                    }}
                                    style={{ 
                                        border: "none", background: "#fee2e2", color: "#ef4444", 
                                        fontSize: "11px", fontWeight: "800", padding: "6px 12px",
                                        borderRadius: "8px", cursor: "pointer"
                                    }}
                                >
                                    <i className="fas fa-trash-alt me-1"></i> ELIMINAR
                                </button>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};