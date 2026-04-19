import React, { useState, useEffect } from 'react';

export const RutinaIA = ({ alCerrar }) => {
    // Estado de carga 
    const [cargando, setCargando] = useState(true);

    // Aquí se guarda el plan generado
    const [plan, setPlan] = useState(null);

    useEffect(() => {
        const datoGuardado = localStorage.getItem("vitta_valor_imc");
        const valorParaCalcular = datoGuardado ? parseFloat(datoGuardado) : 22;

        //  se genera el plan según el IMC del usuario
        const nuevoPlan = obtenerPlanTexto(valorParaCalcular);

        //  se guarda el plan en el estado
        setPlan(nuevoPlan);

        const timer = setTimeout(() => setCargando(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    // aqui se decide qué tipo de rutina se va a crear según el IMC
    const obtenerPlanTexto = (valorImc) => {
        if (valorImc > 25) {
            return {
                categoria: "QUEMA DE GRASA",
                color: "#e74c3c",
                bloques: [
                    { titulo: "Cardio", tiempo: "45 min", detalle: "Caminar rápido o elíptica suave." },
                    { titulo: "Pierna", tiempo: "15 min", detalle: "Sentadillas (3x15) y Zancadas (3x12)." },
                    { titulo: "Core", tiempo: "10 min", detalle: "Plancha frontal (3x45 seg)." }
                ]
            };
        } else if (valorImc < 18.5) {
            return {
                categoria: "GANANCIA MUSCULAR",
                color: "#3498db",
                bloques: [
                    { titulo: "Calentamiento", tiempo: "10 min", detalle: "Movilidad articular suave." },
                    { titulo: "Brazo/Pecho", tiempo: "30 min", detalle: "Flexiones (4x10) y Press militar." },
                    { titulo: "Inferior", tiempo: "20 min", detalle: "Sentadilla con peso (4x10)." }
                ]
            };
        } else {
            return {
                categoria: "TONIFICACIÓN",
                color: "#6e8a4f",
                bloques: [
                    { titulo: "HIIT", tiempo: "20 min", detalle: "1 min intenso / 1 min descanso." },
                    { titulo: "Full Body", tiempo: "30 min", detalle: "Burpees (3x10) y Squats (3x15)." },
                    { titulo: "Estiramiento", tiempo: "10 min", detalle: "Cadena muscular completa." }
                ]
            };
        }
    };

    if (!plan) return null;

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
                        }}>RUTINA IA</span>
                        <p style={{
                            margin: 0,
                            fontSize: '9px',
                            color: '#999',
                            fontWeight: '700'
                        }}>ADAPTADA A TU IMC</p>
                    </div>
                    <button onClick={alCerrar}
                        style={{
                            background: '#eee',
                            border: 'none',
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                            cursor: 'pointer',
                            fontSize: '12px'
                        }}>✕</button>
                </div>

                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '20px'
                }}>


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
                            backgroundColor: plan.color,
                            marginTop: '5px',
                            borderRadius: '2px'
                        }}></div>
                    </div>

                    {cargando ? (
                        <div style={{ textAlign: 'center', marginTop: '40px' }}>
                            <i className="fas fa-spinner fa-spin"
                                style={{
                                    color: plan.color,
                                    fontSize: '24px',
                                    marginBottom: '10px'
                                }}></i>
                            <p style={{
                                color: '#888',
                                fontSize: '13px',
                                fontWeight: '600'
                            }}>Analizando biometría...</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '12px' }}>

                            {/* Lista de bloques de entrenamiento */}
                            {plan.bloques.map((bloque, index) => (
                                <div key={index} style={{
                                    background: '#fff',
                                    padding: '16px',
                                    borderRadius: '20px',
                                    borderLeft: `6px solid ${plan.color}`,
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
                                    width: '100%',
                                    padding: '16px',
                                    borderRadius: '18px',
                                    background: plan.color, color: 'white',
                                    border: 'none',
                                    fontWeight: '800',
                                    marginTop: '15px', fontSize: '14px',
                                    boxShadow: `0 8px 20px ${plan.color}44`
                                }}>
                                CONFIRMAR Y EMPEZAR
                            </button>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};