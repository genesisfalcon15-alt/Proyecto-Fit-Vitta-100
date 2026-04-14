import React, { useState, useEffect } from "react";
import { ComposicionCorporal } from "./ComposicionCorporal";
import { GraficaProgreso } from "./GraficasProgresos";
import { AnalisisDetallado } from "./AnalisisDetallado";

//componente principal 
export const Imc = () => {
    const colorVerdeVitta = "#6e8a4f";

    const [editandoPeso, setEditandoPeso] = useState(false); //usesState, lo utilizo para guardar datos dinamicos y asi poder controlar lo que se muestra.
    const [editandoAltura, setEditandoAltura] = useState(false);
    const [tempPeso, setTempPeso] = useState(100);
    const [tempAltura, setTempAltura] = useState(175);
    const [mostrarAnalisis, setMostrarAnalisis] = useState(false);

    useEffect(() => {
        if (mostrarAnalisis === true) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [mostrarAnalisis]);

    const [datosHistorial] = useState([ //historial de datos.
        { fecha: "01/04", peso: 105, objetivo: 90 },
        { fecha: "08/04", peso: 102, objetivo: 90 },
        { fecha: "15/04", peso: 103, objetivo: 90 },
        { fecha: "22/04", peso: 100, objetivo: 90 },
    ]);
    const datosUsuario = {
        peso: 100,
        altura: 175,
        grasa: 22,
    };

    const cardGlassStyle = {
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(12px)",
        borderRadius: "24px",
        padding: "20px",
        marginBottom: "16px",
        width: "100%",
        boxSizing: "border-box",
        border: "1px solid rgba(255, 255, 255, 0.3)",
    };

    return (
        <div style={{
            width: "100%",
            flex: 1,
            position: "relative",
            minHeight: "100vh",
        }}>
            {mostrarAnalisis && (
                <AnalisisDetallado
                    usuario={datosUsuario}
                    alCerrar={() => setMostrarAnalisis(false)} />)}

            <style>
                {`.texto-imc-labels span {
            color:#444444 !important;
            opacity: 1 !important;
            font-weight: 800 !important;
            -webkit-text-fill-color: #444444 !important;}`}
            </style>

            {/*header*/}
            <div style={{ padding: "30px 20px 10px 20px" }}>
                <h2 style={{
                    fontSize: "28px",
                    fontWeight: "800",
                    color: "white",
                    margin: 0,
                    fontFamily: 'Poppins'
                }}>Tu Estado Vitta</h2>
                <p style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "14px",
                    margin: "5px 0 0 0"
                }}>Resumen de tu salud actual</p>
            </div>

            <div style={{
                padding: "0 20px",
                width: "100%",
                boxSizing: "border-box"
            }}>

                {/*peso y altura*/}
                <div style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "16px"
                }}>
                    <div style={{
                        flex: 1,
                        backgroundColor: "rgba(255,255,255,0.2)",
                        borderRadius: "20px",
                        padding: "15px",
                        textAlign: "center",
                        border: "1px solid rgba(255,255,255,0.2)",
                        position: "relative"
                    }}>

                        <span
                            style={{
                                color: "rgba(255,255,255,0.6)",
                                fontSize: "11px",
                                display: "block"
                            }}>PESO ACTUAL</span>

                        {editandoPeso ? (
                            <input type="number" autoFocus value={tempPeso}
                                onChange={(e) => setTempPeso(Number(e.target.value))} onBlur={() => setEditandoPeso(false)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    width: '100%',
                                    fontWeight: '800',
                                    fontSize: '24px',
                                    textAlign: 'center',
                                    outline: 'none'
                                }} />) : (

                            <strong style={{
                                color: "white",
                                fontSize: "24px"
                            }}> {tempPeso}kg</strong>)}
                        <button onClick={() => setEditandoPeso(!editandoPeso)}
                            style={{
                                position: 'absolute',
                                top: '8px',
                                right: '10px',
                                background: 'none',
                                border: 'none',
                                color: 'rgba(255,255,255,0.5)'
                            }}>
                            <i className={`fas ${editandoPeso ? 'fa-check text-success' : 'fa-pencil-alt'}`}></i>
                        </button>
                    </div>


                    <div style={{
                        flex: 1,
                        backgroundColor: "rgba(255,255,255,0.2)",
                        borderRadius: "20px",
                        padding: "15px",
                        textAlign: "center",
                        border: "1px solid rgba(255,255,255,0.2)",
                        position: "relative"
                    }}>
                        <span style={{
                            color: "rgba(255,255,255,0.6)",
                            fontSize: "11px",
                            display: "block"
                        }}>
                            ALTURA
                        </span>
                        {editandoAltura ? (
                            <input type="number" autoFocus value={tempAltura}
                                onChange={(e) => setTempAltura(Number(e.target.value))} onBlur={() => setEditandoAltura(false)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    width: '100%',
                                    fontWeight: '800',
                                    fontSize: '24px',
                                    textAlign: 'center',
                                    outline: 'none'
                                }} />
                        ) : (
                            <strong style={{
                                color: "white",
                                fontSize: "24px"
                            }}>
                                {tempAltura}cm</strong>)}
                        <button onClick={() => setEditandoAltura(!editandoAltura)}
                            style={{
                                position: 'absolute',
                                top: '8px',
                                right: '10px',
                                background: 'none',
                                border: 'none',
                                color: 'rgba(255,255,255,0.5)'
                            }}>
                            <i className={`fas ${editandoAltura ? 'fa-check text-success' : 'fa-pencil-alt'}`}></i>
                        </button>
                    </div>
                </div>

                {/*IMC CARD*/}

                <div style={cardGlassStyle}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "15px"
                    }}>
                        <h4 style={{
                            fontSize: "16px",
                            fontWeight: "700",
                            color: "#333",
                            margin: 0
                        }}> Índice de Masa Corporal</h4>


                        <div style={{
                            backgroundColor: colorVerdeVitta,
                            color: "white",
                            padding: "4px 10px",
                            borderRadius: "8px",
                            fontWeight: "800",
                            fontSize: "14px"
                        }}>26.1
                        </div>
                    </div>


                    <div style={{
                        position: "relative",
                        height: "6px",
                        backgroundColor: "#ccc",
                        borderRadius: "10px",
                        margin: "25px 0"
                    }}>
                        <div style={{
                            position: "absolute",
                            left: "60%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "18px",
                            height: "18px",
                            backgroundColor: "white",
                            border: `3px solid ${colorVerdeVitta}`,
                            borderRadius: "50%",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                        }}>
                        </div>
                    </div>


                    {/*clases para que el inyectado del css funcione*/}
                    <div className="texto-imc-labels"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%"
                        }}>
                        <span>BAJO</span>
                        <span>SALUDABLE</span>
                        <span>SOBREPESO</span>
                    </div>
                </div>

                <div style={cardGlassStyle}>
                    <h4 style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#333",
                        marginBottom: "15px"
                    }}>Composición Corporal</h4>

                    <ComposicionCorporal grasa={22} musculo={45} agua={58} />
                    <button
                        onClick={() => setMostrarAnalisis(true)}
                        className="btn-negro-transparente">
                        VER ANÁLISIS COMPLETO
                    </button>
                </div>

                <div style={cardGlassStyle}>
                    <h4 style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#333",
                        marginBottom: "10px"
                    }}>Evolución de Peso</h4>
                    <GraficaProgreso datos={datosHistorial} />
                </div>
            </div>
        </div>
    );
};
