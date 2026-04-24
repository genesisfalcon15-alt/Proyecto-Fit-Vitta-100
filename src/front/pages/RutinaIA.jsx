import React, { useState, useEffect } from 'react';
import { fetchRutinaIA } from '../services/aiService';

export const RutinaIA = ({ alCerrar }) => {
    // Estado de carga 
    const [cargando, setCargando] = useState(true);

    // Aquí se guarda el plan generado
    const [plan, setPlan] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerRutinaReal = async () => {
            try {
                const datoGuardado = localStorage.getItem("vitta_valor_imc");
                const valorParaCalcular = datoGuardado ? parseFloat(datoGuardado) : 22;

                // ahora genera el plan según el imc del Us y se llama a la ia 
                const rutinaIA = await fetchRutinaIA(valorParaCalcular);

                //  se guarda el plan en el estado
                setPlan(rutinaIA);

            } catch (err) {
                console.error("Error obteniendo rutina:", err);
                setError("No pudimos conectar con Vitta AI. Revisa que el servidor esté encendido.");
            } finally {
                const timer = setTimeout(() => setCargando(false), 1000);
                return () => clearTimeout(timer);
            }
        };

        obtenerRutinaReal();
    }, []);

    if (error) {
        return (
            <div style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.6)',
                zIndex: 10000, display: 'flex',
                justifyContent: 'center',
                alignItems: 'center', padding: '20px'
            }}>
                <div style={{
                    background: 'white',
                    padding: '30px',
                    borderRadius: '20px',
                    textAlign: 'center', maxWidth: '300px'
                }}>
                    <i className="fas fa-exclamation-triangle"
                        style={{
                            fontSize: '30px',
                            color: '#e74c3c',
                            marginBottom: '15px'
                        }}></i>
                    <p style={{
                        fontSize: '14px',
                        fontWeight: '700'
                    }}>{error}</p>
                    <button onClick={alCerrar}
                        style={{
                            background: '#333',
                            color: 'white', border: 'none',
                            padding: '10px 20px',
                            borderRadius: '10px',
                            marginTop: '10px'
                        }}>CERRAR</button>
                </div>
            </div>
        );
    }

    // si no hay plan y no se esta cargando, no se renderiza nada
    if (!plan && !cargando) return null;


    const colorTema = plan?.color || "#6e8a4f";

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 10000,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            fontFamily: "'Poppins', sans-serif", padding: '20px', backdropFilter: 'blur(4px)'
        }}>

            <div style={{
                width: '100%', maxWidth: '360px', height: '85vh',
                backgroundColor: '#f8f9fa', borderRadius: '30px',
                display: 'flex', flexDirection: 'column', overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}>


                <div style={{
                    padding: '15px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderBottom: '1px solid #eee'
                }}>
                    <div>
                        <span style={{
                            fontSize: '13px',
                            fontWeight: '900',
                            color: '#333'
                        }}>
                            VITTA AI COACH</span>
                        <p style={{
                            margin: 0,
                            fontSize: '9px',
                            color: '#999',
                            fontWeight: '700'
                        }}>INTELIGENCIA ARTIFICIAL ACTIVA</p>
                    </div>
                    <button onClick={alCerrar} style={{
                        background: '#eee',
                        border: 'none',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        cursor: 'pointer',
                        fontSize: '12px'
                    }}>✕</button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>

                    {cargando ? (
                        <div style={{ textAlign: 'center', marginTop: '60px' }}>
                            <i className="fas fa-circle-notch fa-spin"
                                style={{
                                    color: colorTema,
                                    fontSize: '40px',
                                    marginBottom: '20px'
                                }}></i>
                            <h2
                                style={{
                                    fontSize: '18px',
                                    fontWeight: '900',
                                    color: '#333'
                                }}>CREANDO TU PLAN</h2>
                            <p style={{
                                color: '#888',
                                fontSize: '12px',
                                fontWeight: '600'
                            }}>
                                Analizando tu IMC y optimizando ejercicios...</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '12px' }}>

                            <div style={{ marginBottom: '20px' }}>
                                <h2 style={{
                                    margin: 0,
                                    fontSize: '20px',
                                    fontWeight: '900',
                                    color: '#1a1a1a'
                                }}>{plan.categoria}</h2>
                                <div style={{
                                    width: '40px',
                                    height: '4px',
                                    backgroundColor: colorTema,
                                    marginTop: '5px',
                                    borderRadius: '2px'
                                }}></div>
                            </div>

                            {/* Lista de bloques de entrenamiento */}
                            {plan.bloques?.map((bloque, index) => (
                                <div key={index} style={{
                                    background: '#fff',
                                    padding: '16px',
                                    borderRadius: '20px',
                                    borderLeft: `6px solid ${colorTema}`,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '6px'
                                    }}>
                                        <h4 style={{
                                            margin: 0,
                                            fontSize: '14px',
                                            fontWeight: '800',
                                            color: '#333'
                                        }}>{bloque.titulo}</h4>
                                        <span style={{
                                            fontSize: '10px',
                                            background: '#f0f0f0',
                                            color: '#666',
                                            padding: '3px 10px',
                                            borderRadius: '8px',
                                            fontWeight: '800'
                                        }}>
                                            {bloque.tiempo}
                                        </span>
                                    </div>
                                    <p style={{
                                        margin: 0,
                                        fontSize: '12px',
                                        color: '#777',
                                        lineHeight: '1.5'
                                    }}>
                                        {bloque.detalle}
                                    </p>
                                </div>
                            ))}

                            <button
                                onClick={alCerrar}
                                style={{
                                    width: '100%', padding: '16px', borderRadius: '18px',
                                    background: colorTema, color: 'white', border: 'none',
                                    fontWeight: '800', marginTop: '15px', fontSize: '14px',
                                    boxShadow: `0 8px 20px ${colorTema}44`
                                }}
                            >
                                EMPEZAR ENTRENAMIENTO IA
                            </button>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};