import React from 'react';
export const MisLugaresFavoritos = ({ favoritos, alCerrar, alSeleccionar, alEliminar, colorVerdeVitta }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(5px)',
            zIndex: 12000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }}>

            <div style={{
                width: '100%',
                maxWidth: '360px',
                height: '80vh',
                backgroundColor: '#f8f9fa',
                borderRadius: '30px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                fontFamily: "'Poppins', sans-serif"
            }}>

                <div style={{
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderBottom: '1px solid #eee'
                }}>
                    <div>
                        <h2 style={{ fontSize: '16px', fontWeight: '900', margin: 0, color: '#333' }}>MIS LUGARES</h2>
                        <span style={{ fontSize: '10px', color: colorVerdeVitta, fontWeight: '800' }}>Guardados</span>
                    </div>
                    <button onClick={alCerrar} style={{ background: '#f0f0f0', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}>
                        <i className="fas fa-times" style={{ fontSize: '12px' }}></i>
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                    {favoritos.length === 0 ? (
                        <div style={{ textAlign: 'center', marginTop: '50px' }}>
                            <div style={{
                                width: '60px', height: '60px', backgroundColor: '#eee',
                                borderRadius: '50%', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', margin: '0 auto 15px'
                            }}>
                                <i className="fas fa-star" style={{ color: '#ccc', fontSize: '24px' }}></i>
                            </div>
                            <p style={{ color: '#999', fontSize: '13px', fontWeight: '600' }}>No hay lugares guardados aún</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '12px' }}>
                            {favoritos.map((fav, index) => (
                                <div key={index} style={{
                                    background: '#fff',
                                    padding: '15px',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                                    border: '1px solid #f0f0f0'
                                }}>
                                    <div style={{ maxWidth: '75%', cursor: 'pointer' }} onClick={() => alSeleccionar(fav)}>
                                        <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '800', color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {fav.nombre}
                                        </h4>
                                        <span style={{ fontSize: '9px', color: colorVerdeVitta, fontWeight: '800' }}>
                                            VER RUTA AHORA
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => alEliminar(fav)}
                                        style={{ background: '#fff0f0', border: 'none', color: '#ff5c5c', width: '32px', height: '32px', borderRadius: '10px' }}
                                    >
                                        <i className="fas fa-trash-alt" style={{ fontSize: '12px' }}></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ padding: '15px 20px', backgroundColor: '#fff', borderTop: '1px solid #eee' }}>
                    <button
                        onClick={alCerrar}
                        style={{
                            width: '100%', padding: '12px', borderRadius: '15px',
                            background: '#1a1a1a', color: 'white', border: 'none',
                            fontWeight: '800', fontSize: '12px'
                        }}
                    >
                        VOLVER AL BUSCADOR
                    </button>
                </div>
            </div>
        </div>
    );
};