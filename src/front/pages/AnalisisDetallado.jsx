import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { PlanificadorSemanal } from "./PlanificadorSemanal";
import siluetaImagen from "../assets/img/Silueta-datos.png";

export const AnalisisDetallado = ({ usuario, alCerrar }) => {
    const colorVerdeVitta = "#6e8a4f";
    const [minutosEntreno, setMinutosEntreno] = useState(45);
    const [diasEntreno, setDiasEntreno] = useState(3);

    const handleCambioActividad = (mins, numDias) => {
        setMinutosEntreno(mins);
        setDiasEntreno(numDias);
    };

    const dataDonut = (valor, total) => [{ value: valor }, { value: Math.max(0, total - valor) }];
    const DonutDato = ({ valor, total, etiqueta, subetiqueta, color }) => (
        <div style={{
            textAlign: "center",
            width: "45%",
            marginBottom: "20px"
        }}>
            <div style={{
                position: "relative",
                height: "110px"
            }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={dataDonut(valor, total)}
                            innerRadius={35}
                            outerRadius={45}
                            startAngle={90}
                            endAngle={450}
                            dataKey="value"
                            stroke="none">
                            <Cell fill={color} />
                            <Cell fill="rgba(0,0,0,0.05)" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    textAlign: "center"
                }}>
                    <span style={{
                        fontSize: "19px",
                        fontWeight: "900",
                        display: "block",
                        color: "#333",
                        lineHeight: "1"
                    }}>
                        {valor}
                    </span>
                    <span style={{
                        fontSize: "10px",
                        fontWeight: "800",
                        color: color,
                        marginTop: "2px",
                        display: "block"
                    }}>
                        {subetiqueta}
                    </span>
                </div>
            </div>
            <span style={{
                fontSize: "11px",
                fontWeight: "800",
                color: "#333",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
            }}>
                {etiqueta}
            </span>
        </div>
    );

    return (
        <div style={{
            position: "fixed",
            top: "65px",
            left: 0,
            right: 0,
            bottom: 0,
            maxWidth: "420px",
            margin: "0 auto",
            width: "100%",
            height: "100vh",
            backgroundColor: "white",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            backgroundImage: `url(${siluetaImagen})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}>



            {/* contenido scroll */}
            <div style={{
                flex: 1,
                overflowY: "auto",
                background: "transparent",
                position: "relative",
                zIndex: 5,
                padding: "20px"
            }}>
                <div style={{
                    padding: "30px 20px 120px 20px",
                    minHeight: "100%"
                }}>

                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        maxWidth: "400px",
                        margin: "0 auto 20px auto",
                        position: "relative",
                        zIndex: 20
                    }}>

                        <DonutDato valor={usuario.peso} total={120} etiqueta=" Peso" subetiqueta="kg" color={colorVerdeVitta} />
                        <DonutDato valor={usuario.grasa} total={40} etiqueta="Grasa" subetiqueta="%" color="#ffc107" />
                        <DonutDato valor={2.8} total={4} etiqueta="Agua" subetiqueta="Lts" color="#00bcd4" />
                        <DonutDato valor={minutosEntreno} total={120} etiqueta="Meta" subetiqueta="min" color="#e91e63" />
                    </div>

                    <PlanificadorSemanal colorVerdeVitta={colorVerdeVitta} onCambioActividad={handleCambioActividad} />

                    <div style={{
                        marginTop: "30px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                        width: "100%",
                        maxWidth: "400px",
                        margin: "30px auto 0 auto"
                    }}>


                        <div style={{
                            padding: "20px",
                            borderRadius: "16px",
                            backgroundColor: "rgba(255,255,255,0.95)",
                            border: `1px solid ${colorVerdeVitta}33`,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            zIndex: 30
                        }}>
                            <span style={{ color: "#666", fontSize: "12px", fontWeight: "700" }}>
                                CARGA SEMANAL ESTIMADA
                            </span>
                            <span style={{ color: "#333", fontWeight: "900", fontSize: "18px" }}>
                                {minutosEntreno * diasEntreno} Min
                            </span>
                        </div>


                        <button
                            onClick={alCerrar}
                            style={{
                                width: "100%",
                                height: "55px",
                                borderRadius: "16px",
                                border: "none",
                                background: colorVerdeVitta,
                                color: "white",
                                fontWeight: "900",
                                fontSize: "14px",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                boxShadow: "0 10px 20px rgba(110, 138, 79, 0.3)",
                                cursor: "pointer",
                                marginTop: "10px",
                                marginBottom: "50px"
                            }}
                        >
                            Confirmar y Volver
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
