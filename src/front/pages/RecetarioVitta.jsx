import React, { useState } from 'react';
export const RecetarioVitta = ({ alCerrar }) => {
    const [receta, setReceta] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = '36bc24c63e1d44d1b7dec646851a915b';

    const obtenerRecetaAleatoria = async () => {
        setCargando(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/random?number=1&apiKey=${API_KEY}`
            );

            if (!response.ok) {
                throw new Error(`Error API: ${response.status}`);
            }

            const data = await response.json();

            if (data.recipes && data.recipes.length > 0) {
                setReceta(data.recipes[0]);
            } else {
                throw new Error('No se encontraron recetas.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(10px)',
                zIndex: 20000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px'
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '360px',
                    maxHeight: '85vh',
                    backgroundColor: '#fff',
                    borderRadius: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
                    fontFamily: "'Poppins', sans-serif"
                }}
            >
                <div
                    style={{
                        padding: '20px',
                        borderBottom: '1px solid #f0f0f0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <h2 style={{ fontSize: '16px', fontWeight: '900', color: '#333', margin: 0 }}>
                        VITTA CHEF
                    </h2>
                    <button
                        onClick={alCerrar}
                        style={{
                            border: 'none',
                            background: '#f5f5f5',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px'
                        }}
                    >
                        ✕
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                    {error && (
                        <div style={{ textAlign: 'center', color: '#e74c3c', padding: '20px' }}>
                            <p style={{ fontSize: '12px', fontWeight: 'bold' }}>{error}</p>
                        </div>
                    )}

                    {!receta && !cargando && !error && (
                        <div style={{ textAlign: 'center', marginTop: '40px' }}>
                            <div style={{ fontSize: '50px', marginBottom: '15px' }}>🥗</div>
                            <h3 style={{ fontSize: '18px', fontWeight: '800' }}>
                                ¿Qué cocinamos?
                            </h3>
                            <p style={{ fontSize: '13px', color: '#888' }}>
                                Pulsa el botón para buscar una receta saludable.
                            </p>
                        </div>
                    )}

                    {cargando && (
                        <div style={{ textAlign: 'center', marginTop: '60px' }}>
                            <p style={{ marginTop: '15px', fontWeight: '700' }}>
                                Cargando receta...
                            </p>
                        </div>
                    )}

                    {receta && !cargando && (
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#111' }}>
                                {receta.title}
                            </h3>

                            <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>
                                <span
                                    style={{
                                        fontSize: '10px',
                                        background: '#f0f7eb',
                                        color: '#6e8a4f',
                                        padding: '5px 12px',
                                        borderRadius: '10px',
                                        fontWeight: '800'
                                    }}
                                >
                                    {receta.readyInMinutes} MIN
                                </span>

                                <span
                                    style={{
                                        fontSize: '10px',
                                        background: '#fff0f0',
                                        color: '#e74c3c',
                                        padding: '5px 12px',
                                        borderRadius: '10px',
                                        fontWeight: '800'
                                    }}
                                >
                                    SALUDABLE
                                </span>
                            </div>

                            <div
                                style={{
                                    background: '#f9f9f9',
                                    padding: '15px',
                                    borderRadius: '20px'
                                }}
                            >
                                <h4
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: '900',
                                        color: '#555'
                                    }}
                                >
                                    INGREDIENTES
                                </h4>

                                <ul
                                    style={{
                                        paddingLeft: '15px',
                                        marginTop: '10px',
                                        fontSize: '12px',
                                        color: '#666'
                                    }}
                                >
                                    {receta.extendedIngredients?.map((ing, i) => (
                                        <li key={i} style={{ marginBottom: '4px' }}>
                                            {ing.original}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ padding: '20px' }}>
                    <button
                        onClick={obtenerRecetaAleatoria}
                        disabled={cargando}
                        style={{
                            width: '100%',
                            padding: '16px',
                            borderRadius: '20px',
                            background: '#1a1a1a',
                            color: 'white',
                            border: 'none',
                            fontWeight: '800',
                            fontSize: '13px',
                            opacity: cargando ? 0.6 : 1
                        }}
                    >
                        {cargando
                            ? 'CARGANDO...'
                            : receta
                                ? 'VER OTRA OPCIÓN'
                                : 'OBTENER RECETA'}
                    </button>
                </div>
            </div>
        </div>
    );
};