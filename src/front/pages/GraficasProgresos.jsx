import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";


/* determina que icono muestra según el peso y el objetivo*/

const obtenerEmoji = (peso, objetivo) => {
    const dif = peso - objetivo;
    if (dif <= 0) return "😊";
    if (dif <= 3) return "🙂";
    if (dif <= 7) return "😐";
    return "😡";
};


/*personalización del grafico, se reemplaza el dot por defecto */

const CustomDot = ({ cx, cy, payload }) => {
    const emoji = obtenerEmoji(payload.peso, payload.objetivo);
    return (
        <g>
            <circle cx={cx} cy={cy}
                r="14"
                fill="white"
                stroke="#6e8a4f"
                strokeWidth="2" />
            <text x={cx} y={cy}
                dy={5} fontSize="15"
                textAnchor="middle"
                style={{ pointerEvents: "none" }}>
                {emoji}
            </text>
        </g>
    );
};

/*personalización que aparece si se pone el raton, muestra la fecha el peso y el objetivo  */
const CustomTooltip = ({ active, payload, label }) => {
    /*se renderiza solo si tooltip está activo y hay dato */
    if (active && payload?.length) {
        return (
            <div style={{
                backgroundColor: "rgba(0,0,0,0.85)",
                color: "white",
                padding: "10px",
                borderRadius: "10px",
                fontSize: "12px"
            }}>
                <p style={{
                    margin: "0 0 5px 0",
                    fontWeight: "bold",
                    color: "#ccc"
                }}>{label}</p>
                <p style={{ margin: 0 }}>
                    <span style={{
                        color: "#6e8a4f"
                    }}>●</span> Peso: <b>{payload[1].value} kg</b>
                </p>
                <p style={{ margin: 0 }}>
                    <span style={{ color: "#ffc107" }}>●</span> Ideal: <b>{payload[0].value} kg</b>
                </p>
            </div>
        );
    }

    return null;
};

/*componente que genera la grafica del progreso, recibe array de datos fecha, peso y objetivos */

export const GraficaProgreso = ({ datos }) => {
    if (!datos?.length) return null;
    return (
        <LineChart width={330}
            height={200}
            data={datos}
            margin={{
                top: 20,
                right: 30,
                left: -20,
                bottom: 5
            }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis dataKey="fecha" axisLine={false} tickLine={false}
                tick={{
                    fontSize: 10,
                    fill: "#999",
                    fontWeight: "bold"
                }} />
            <YAxis hide domain={[
                "dataMin - 5",
                "dataMax + 5"]} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone"
                dataKey="objetivo"
                stroke="#ffc107"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false} activeDot={false} />
            <Line type="monotone"
                dataKey="peso"
                stroke="#6e8a4f"
                strokeWidth={3}
                dot={<CustomDot />} activeDot={{ r: 8 }} />
        </LineChart>
    );
}

