import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { GraficaProgreso } from "./GraficasProgresos";
import siluetaImagen from "../assets/img/Silueta-datos.png";

const ContadorAnimado = ({ valorFinal, decimales = 0, color = "#333" }) => {
    const [valor, setValor] = useState(0);

    useEffect(() => {
        let inicio = 0;
        const duracion = 800;
        const fps = 60;
        const totalFrames = (duracion / 1000) * fps;
        const incremento = valorFinal / totalFrames;

        const timer = setInterval(() => {
            inicio += incremento;
            if (inicio >= valorFinal) {
                setValor(valorFinal);
                clearInterval(timer);
            } else {
                setValor(inicio);
            }
        }, 1000 / fps);

        return () => clearInterval(timer);
    }, [valorFinal]);

    return <span style={{ color }}>{valor.toFixed(decimales)}</span>;
};

export const AnalisisDetallado = ({ usuario, historial, alCerrar }) => {
    const colorVerdeVitta = "#6e8a4f";
    const { peso, grasa, minutos, dias } = usuario;

    const dataDonut = (valor, total) => [
        { value: valor },
        { value: Math.max(0, total - valor) },
    ];

    const DonutDato = ({ valor, total, etiqueta, subetiqueta, color }) => (
        <div style={{ textAlign: "center", width: "48%", marginBottom: "25px" }}>
            <div style={{ position: "relative", height: "110px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={dataDonut(valor, total)}
                            innerRadius={34}
                            outerRadius={44}
                            startAngle={90}
                            endAngle={450}
                            dataKey="value"
                            stroke="none"
                        >
                            <Cell fill={color} />
                            <Cell fill="rgba(0,0,0,0.08)" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                    }}
                >
                    <span style={{
                        fontSize: "18px",
                        fontWeight: "900",
                        color: "#333"
                    }}>
                        <ContadorAnimado valorFinal={valor} decimales={valor % 1 !== 0 ? 1 : 0} />
                    </span>
                    <span style={{
                        fontSize: "10px",
                        fontWeight: "800",
                        color
                    }}>
                        {subetiqueta}
                    </span>
                </div>
            </div>

            <span style={{
                fontSize: "11px",
                fontWeight: "800",
                color: "#333"
            }}>
                {etiqueta}
            </span>
        </div>
    );

    return (
        <div
            style={{
                position: "fixed",
                top: "60px",
                bottom: "70px",
                left: 0,
                right: 0,
                width: "100%",
                maxWidth: "450px",
                margin: "0 auto",
                backgroundColor: "white",
                zIndex: 999,
                display: "flex",
                flexDirection: "column",
            }}
        >

            <div style={{
                flex: 1,
                minHeight: 0,
                position: "relative",
                overflowY: "auto"
            }}>

                <div
                    style={{
                        position: "absolute",
                        top: "35px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "300px",
                        height: "560px",
                        backgroundImage: `url(${siluetaImagen})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center top",
                        backgroundRepeat: "no-repeat",
                        zIndex: 1,
                        opacity: 1,
                        pointerEvents: "none"
                    }}
                />

                <div style={{
                    padding: "0 15px 20px",
                    position: "relative",
                    zIndex: 2,
                }}>

                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap"
                    }}>
                        <DonutDato valor={peso} total={120} etiqueta="Peso" subetiqueta="kg" color={colorVerdeVitta} />
                        <DonutDato valor={grasa} total={40} etiqueta="Grasa" subetiqueta="%" color="#ffc107" />
                        <DonutDato valor={2.8} total={4} etiqueta="Agua" subetiqueta="Lts" color="#00bcd4" />
                        <DonutDato valor={minutos} total={120} etiqueta="Meta" subetiqueta="min" color="#e91e63" />
                    </div>

                    <div
                        style={{
                            background: "white",
                            padding: "20px",
                            borderRadius: "24px",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                            marginBottom: "25px"
                        }}
                    >
                        <h4 style={{
                            fontSize: "12px",
                            fontWeight: "800",
                            color: "#333"
                        }}>
                            EVOLUCIÓN
                        </h4>
                        <GraficaProgreso datos={historial} />
                    </div>

                    <div
                        style={{
                            padding: "20px",
                            borderRadius: "20px",
                            backgroundColor: "#f9faf9",
                            textAlign: "center",
                            border: "1px solid #eee",
                            marginBottom: "25px"
                        }}
                    >
                        <span style={{
                            color: "#888",
                            fontSize: "10px",
                            fontWeight: "700"
                        }}>
                            ENTRENAMIENTO SEMANAL
                        </span>

                        <div style={{
                            fontSize: "28px",
                            fontWeight: "900",
                            color: "#333"
                        }}>
                            <ContadorAnimado valorFinal={minutos * dias} /> min
                        </div>
                    </div>

                    <button
                        onClick={alCerrar}
                        style={{
                            width: "100%",
                            height: "55px",
                            borderRadius: "18px",
                            background: colorVerdeVitta,
                            color: "white",
                            fontWeight: "800",
                            border: "none"
                        }}
                    >
                        VOLVER
                    </button>


                </div>
            </div>
        </div>
    );
};