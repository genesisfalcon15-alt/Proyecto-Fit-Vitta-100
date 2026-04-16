import React, { useState, useEffect } from 'react';
export const RutinaIA = ({ imc, alCerrar }) => {


    const [cargando, setCargando] = useState(true);
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

    const plan = obtenerPlanTexto(imc);
    useEffect(() => {
        const timer = setTimeout(() => setCargando(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 10000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: "'Poppins', sans-serif",
            padding: '20px'
        }}>

            <div style={{
                width: '100%',
                maxWidth: '360px',
                height: '85vh',
                backgroundColor: '#f8f9fa',
                borderRadius: '30px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}>

                <div style={{ padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderBottom: '1px solid #eee' }}>
                    <span style={{ fontSize: '13px', fontWeight: '900', color: '#333' }}>RUTINA IA</span>
                    <button onClick={alCerrar} style={{ background: '#eee', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', fontSize: '14px' }}>✕</button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#1a1a1a' }}>
                            {plan.categoria}
                        </h2>
                        <div style={{ width: '30px', height: '3px', backgroundColor: plan.color, marginTop: '5px' }}></div>
                    </div>
                    {cargando ? (
                        <p style={{ textAlign: 'center', color: '#888', fontSize: '14px' }}>
                            Calculando bloques...</p>
                    ) : (
                        <div style={{ display: 'grid', gap: '12px' }}>
                            {plan.bloques.map((bloque, index) => (
                                <div
                                    key={index}
                                    style={{
                                        background: '#fff',
                                        padding: '15px',
                                        borderRadius: '18px',
                                        borderLeft: `5px solid ${plan.color}`,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                                    }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#333' }}>
                                            {bloque.titulo}
                                        </h4>
                                        <span style={{ fontSize: '10px', background: '#f0f0f0', padding: '2px 8px', borderRadius: '6px', fontWeight: '800' }}>
                                            {bloque.tiempo}
                                        </span>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '12px', color: '#666', lineHeight: '1.4' }}>
                                        {bloque.detalle}
                                    </p>
                                </div>
                            ))}
                        </div>)}

                    <button
                        onClick={alCerrar}
                        style={{
                            width: '100%',
                            padding: '15px',
                            borderRadius: '15px',
                            background: plan.color,
                            color: 'white',
                            border: 'none',
                            fontWeight: '800',
                            marginTop: '25px',
                            fontSize: '13px'
                        }}>
                        CONFIRMAR Y EMPEZAR
                    </button>
                </div>
            </div>
        </div>
    );
};