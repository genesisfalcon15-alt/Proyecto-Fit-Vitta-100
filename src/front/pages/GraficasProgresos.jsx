import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const obtenerEmojiProgreso = (peso, objetivo) => {
    const diferencia = peso - objetivo;
    if (diferencia <= 0) return "😊";
    if (diferencia <= 2) return "🙂";
    if (diferencia <= 5) return "😐";
    if (diferencia <= 10) return "😟";
    return "😡";
};

const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    const emoji = obtenerEmojiProgreso(payload.peso, payload.objetivo);

    return (
        <g>
            <circle
                cx={cx}
                cy={cy}
                r="14"
                fill="white"
                stroke="#eee"
                strokeWidth="1"
                style={{
                    filter: "drop-shadow(0px 3px 3px rgba(0,0,0,0.15))"
                }} />

            {/*centrado de emojis*/}
            <text
                x={cx}
                y={cy}
                dy={6}
                fontSize="16"
                textAnchor="middle"
                style={{ pointerEvents: 'none' }}>
                {emoji}
            </text>
        </g>
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                color: "white",
                padding: "10px 15px",
                borderRadius: "12px",
                fontSize: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                border: "none"
            }}>
                <p style={{
                    margin: "0 0 5px 0",
                    fontWeight: 800,
                    color: "#aaa"
                }}>{label}</p>
                <p style={{
                    margin: 0,
                    fontWeight: 700
                }}>
                    <span style={{
                        color: "#88a070",
                        marginRight: "8px"
                    }}>●</span>
                    Mi Peso:<span style={{
                        fontSize: "14px"
                    }}>{payload[0].value}Kg</span></p>

                <p style={{
                    margin: "3px 0 0 0",
                    fontWeight: 700
                }}>
                    <span style={{
                        color: "#ffc107",
                        marginRight: "8px"
                    }}>●</span>
                    Objetivo: <span style={{ fontSize: "14px" }}>{payload[1].value} kg</span></p>
            </div>
        );
    }
    return null;
};


export const GraficaProgreso = ({ datos }) => {
    if (!datos || datos.length === 0) {
        return (
            <div style={{
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#999",
                fontSize: "14px",
                fontStyle: "italic"
            }}>Empieza a registrar tu peso para ver la evolución
            </div>);
    }

    const colorVerdeVitta = "#6e8a4f";
    const colorObjetivo = "#ffc107";

    return (
        <div style={{
            width: "100%",
            height: "220px",
            marginTop: "15px",
            position: "relative"
        }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={datos}
                    margin={{ top: 20, right: 15, left: -25, bottom: 5 }}>

                    <defs>
                        <linearGradient id="colorPeso" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={colorVerdeVitta} stopOpacity={0.2} />
                            <stop offset="95%" stopColor={colorVerdeVitta} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.04)" />
                    <XAxis
                        dataKey="fecha"
                        tick={{ fontSize: 10, fontWeight: 700, fill: "#999" }}
                        axisLine={false}
                        tickLine={false}
                        dy={10} />

                    <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(0,0,0,0.1)', strokeWidth: 1 }} />
                    <Area
                        type="monotone"
                        dataKey="objetivo"
                        stroke={2}
                        strokeDasharray="6 6"
                        fill="none"
                        activeDot={false}
                        dot={false} />

                    <Area
                        type="monotone"
                        dataKey="peso"
                        stroke={colorVerdeVitta}
                        strokeWidth={4}
                        fill="url(#colorPeso)"
                        dot={<CustomDot />}
                        activeDot={{ r: 8, stroke: 'white', strokeWidth: 3 }} />

                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
