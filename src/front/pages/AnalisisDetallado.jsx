import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { GraficaProgreso } from "./GraficasProgresos";
import siluetaImagen from "../assets/img/Silueta-datos.png";

// contador animado para dar sensación de dato vivo
const ContadorAnimado = ({ valorFinal, decimales = 0, color = "#333" }) => {
    const [valor, setValor] = useState(0);

    useEffect(() => {
        let inicio = 0;
        const duracion = 800;
        const framesPorSegundo = 60;
        const totalFrames = (duracion / 1000) * framesPorSegundo;
        const incremento = valorFinal / totalFrames;

        const timer = setInterval(() => {
            inicio += incremento;

            if (inicio >= valorFinal) {
                setValor(valorFinal);
                clearInterval(timer);
            } else {
                setValor(inicio);
            }
        }, 1000 / framesPorSegundo);

        return () => clearInterval(timer);
    }, [valorFinal]);

    return <span style={{ color: color }}>{valor.toFixed(decimales)}</span>;
};

export const AnalisisDetallado = ({ usuario, historial, alCerrar }) => {
    const colorVerdeVitta = "#6e8a4f";

    if (!usuario) return null;

    const { peso, grasa, minutos, dias } = usuario;

    // genero datos para  el donut valor vs resto
    const dataDonut = (valor, total) => [
        { value: valor },
        { value: Math.max(0, total - valor) },
    ];

    // componente reutilizable para donuts pequeños
    const DonutDato = ({ valor, total, etiqueta, subetiqueta, color }) => (
        <div style={{
            textAlign: "center",
            width: "48%",
            marginBottom: "15px",
            position: "relative",
            zIndex: 10
        }}>

            <div style={{ position: "relative", height: "90px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={dataDonut(valor, total)}
                            innerRadius={28}
                            outerRadius={38}
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
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                }}>

                    <span style={{
                        fontSize: "15px",
                        fontWeight: "900",
                        color: "#333"
                    }}>

                        <ContadorAnimado valorFinal={valor} decimales={valor % 1 !== 0 ? 1 : 0} />
                    </span>
                    <span style={{
                        fontSize: "8px",
                        fontWeight: "800",
                        color: color,
                        display: "block"
                    }}>

                        {subetiqueta}
                    </span>
                </div>
            </div>

            <span style={{
                fontSize: "9px",
                fontWeight: "800",
                color: "#333",
                textTransform: "uppercase"
            }}>

                {etiqueta}
            </span>
        </div>
    );

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column"
        }}>

            <div style={{
                padding: "15px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #f0f0f0",
                flexShrink: 0,
                zIndex: 100,
            }}>

                <button
                    onClick={alCerrar}
                    style={{
                        background: "none",
                        border: "none", color:
                            colorVerdeVitta, fontSize: "20px"
                    }}>

                    <i className="fas fa-arrow-left"></i>
                </button>

                <span style={{
                    color: "#333",
                    fontWeight: "800",
                    fontSize: "13px",
                    letterSpacing: "1px"
                }}>
                    BIO-INFORME
                </span>

                <div style={{ width: "20px" }}></div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>

                {/* imagen de fondo decorativa */}
                <div style={{
                    position: "absolute",
                    top: "-30px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "200%",
                    height: "600px",
                    backgroundImage: `url(${siluetaImagen})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center top",
                    backgroundRepeat: "no-repeat",
                    pointerEvents: "none",
                    zIndex: 1,
                    opacity: 1,
                }}></div>

                <div style={{
                    padding: "20px",
                    position: "relative",
                    zIndex: 10
                }}>


                    <div className="animar-entrada delay-1" style={{
                        maxWidth: "340px",
                        margin: "0 auto 30px auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>


                        <div style={{
                            textAlign: "center",
                            width: "100%",
                            marginBottom: "20px"
                        }}>

                            <div style={{ position: "relative", height: "130px", width: "100%" }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={dataDonut(minutos * dias, 200)}
                                            innerRadius={35}
                                            outerRadius={46}
                                            startAngle={90}
                                            endAngle={450}
                                            dataKey="value"
                                            stroke="none">

                                            <Cell fill="#bd1ee9" />
                                            <Cell fill="rgba(0,0,0,0.05)" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>

                                <div style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    textAlign: "center",
                                }}>
                                    <span style={{
                                        fontSize: "26px",
                                        fontWeight: "900",
                                        color: "#333"
                                    }}>
                                        <ContadorAnimado valorFinal={minutos * dias} />
                                    </span>
                                    <span style={{
                                        fontSize: "11px",
                                        fontWeight: "800",
                                        color: "#91148d"
                                    }}>
                                        MIN
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* donuts pequeños */}
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap", width: "100%"
                        }}>
                            <DonutDato valor={peso} total={120} etiqueta="Peso" subetiqueta="kg" color={colorVerdeVitta} />
                            <DonutDato valor={grasa} total={40} etiqueta="Grasa" subetiqueta="%" color="#ffc107" />
                            <DonutDato valor={2.8} total={4} etiqueta="Agua" subetiqueta="Lts" color="#00bcd4" />
                            <DonutDato valor={minutos} total={120} etiqueta="Meta" subetiqueta="min" color="#e91e63" />
                        </div>
                    </div>

                    <div className="animar-entrada delay-2" style={{
                        background: "white",
                        padding: "20px 10px",
                        borderRadius: "24px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                        border: "1px solid #f5f5f5",
                    }}>
                        <h4 style={{
                            fontSize: "11px",
                            fontWeight: "800",
                            color: "#333",
                            marginBottom: "15px",
                            textAlign: "center"
                        }}>
                            HISTÓRICO DE PROGRESO
                        </h4>

                        <GraficaProgreso datos={historial} />
                    </div>

                    <div style={{ height: "40px" }}></div>
                </div>
            </div>
        </div>
    );
};