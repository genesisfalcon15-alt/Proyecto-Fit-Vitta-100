import React, { useState } from "react";

export const PlanificadorSemanal = ({ colorVerdeVitta, onCambioActividad }) => {
    const [minutos, setMinutos] = useState(45);
    const [dias, setDias] = useState([
        { id: 0, nombre: "L", activo: true }, { id: 1, nombre: "M", activo: true },
        { id: 2, nombre: "X", activo: false }, { id: 3, nombre: "J", activo: true },
        { id: 4, nombre: "V", activo: false }, { id: 5, nombre: "S", activo: false },
        { id: 6, nombre: "D", activo: false },
    ]);

    const update = (m, d) => onCambioActividad(m, d.filter(x => x.activo).length);

    return (
        <div style={{
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(8px)",
            borderRadius: "24px",
            padding: "20px",
            border: `1px solid ${colorVerdeVitta}33`,
            maxWidth: "360px",
            margin: "0 auto",
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
        }}>

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px"
            }}>

                <span style={{
                    color: "#333",
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "0.5px"
                }}>MINUTOS SESIÓN</span>

                <input
                    type="number"
                    value={minutos}
                    onChange={(e) => {
                        const val = parseInt(e.target.value)
                        setMinutos(val);
                        update(val, dias);
                    }}

                    style={{
                        width: "65px",
                        height: "40px",
                        background: "white",
                        border: `2px solid ${colorVerdeVitta}`,
                        borderRadius: "10px",
                        color: "#333",
                        textAlign: "center",
                        fontSize: "18px",
                        fontWeight: "900",
                        outline: "none"
                    }} />
            </div>


            <div style={{ display: "flex", justifyContent: "space-between", gap: "6px" }}>
                {dias.map(d => (
                    <button
                        key={d.id}
                        onClick={() => {
                            const nuevos = dias.map(x => x.id === d.id ? { ...x, activo: !x.activo } : x);
                            setDias(nuevos);
                            update(minutos, nuevos);
                        }}

                        style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "50%",
                            backgroundColor: d.activo ? colorVerdeVitta : "white",
                            border: `2px solid ${colorVerdeVitta}`,
                            color: d.activo ? "white" : colorVerdeVitta,
                            fontWeight: "900",
                            fontSize: "13px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            trasition: "all 0.2s aese",
                            flexShrink: 0
                        }}>
                        {d.nombre}
                    </button>
                ))}
            </div>
            <p style={{
                textAlign: "center",
                color: colorVerdeVitta,
                fontSize: "10px",
                marginTop: "15px",
                fontWeight: "700",
                opacity: 0.8
            }}>
                SELECCIONA TUS DÍAS DE ACTIVIDAD
            </p>
        </div>
    );
};
