import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "recharts";

// convierto diferencia de peso en una emoción visual
const obtenerEmoji = (peso, objetivo) => {
    const dif = peso - objetivo;

    if (dif <= 0) return "😊";
    if (dif <= 3) return "🙂";
    if (dif <= 7) return "😐";
    return "😡";
};

// personalizo los puntos de la gráfica con emojis
const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    const emoji = obtenerEmoji(payload.peso, payload.objetivo);

    return (
        <g>
            <circle cx={cx} cy={cy} r="14" fill="white" stroke="#6e8a4f" strokeWidth="2" />
            <text
                x={cx}
                y={cy}
                dy={5}
                fontSize="15"
                textAnchor="middle"
                style={{ pointerEvents: "none" }}>
                {emoji}
            </text>
        </g>
    );
};

// tooltip personalizado para mostrar datos al pasar por la gráfica
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div
                style={{
                    backgroundColor: "rgba(0,0,0,0.85)",
                    color: "white",
                    padding: "10px",
                    borderRadius: "10px",
                    fontSize: "12px",
                }}
            >
                <p style={{ margin: "0 0 5px 0", fontWeight: "bold", color: "#ccc" }}>
                    {label}
                </p>
                <p style={{ margin: 0 }}>
                    <span style={{ color: "#6e8a4f" }}>●</span> Peso:{" "}
                    <b>{payload[1].value} kg</b>
                </p>
                <p style={{ margin: 0 }}>
                    <span style={{ color: "#ffc107" }}>●</span> Ideal:{" "}
                    <b>{payload[0].value} kg</b>
                </p>
            </div>
        );
    }

    return null;
};

export const GraficaProgreso = ({ datos }) => {
    // si no hay datos, muestro estado vacío
    if (!datos || datos.length === 0) {
        return (
            <p style={{ fontSize: "10px", color: "#999", textAlign: "center" }}>
                Cargando datos de progreso...
            </p>
        );
    }

    return (
        <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={datos} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>

                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />

                    <XAxis
                        dataKey="fecha"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: "#999", fontWeight: "bold" }} />

                    <YAxis hide domain={["dataMin - 5", "dataMax + 5"]} />

                    <Tooltip content={<CustomTooltip />} />

                    <Line
                        type="monotone"
                        dataKey="objetivo"
                        stroke="#ffc107"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                        activeDot={false} />
                    <Line
                        type="monotone"
                        dataKey="peso"
                        stroke="#6e8a4f"
                        strokeWidth={3}
                        dot={<CustomDot />}
                        activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};