import React, { useState, useEffect, useRef } from "react";
import { Mapa } from "./Mapa.jsx";

export const Buscador = () => {
    const [query, setQuery] = useState("");
    const [sugerencias, setSugerencias] = useState([]);
    const mapRef = useRef();


    {/* Este useEffect se encarga de obtener las sugerencias de búsqueda cada vez que el query cambia */ }
    useEffect(() => {
        const fetchSugerencias = async () => {
            if (query.length < 3) {
                setSugerencias([]);
                return;
            }


            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`);
                const data = await response.json();
                setSugerencias(data);
            } catch (error) {
                console.error("Error en autocompletado:", error);
            }
        };


        const timeout = setTimeout(fetchSugerencias, 300); // aqui se Espera el error 300! después de que el usuario deje de escribir
        return () => clearTimeout(timeout); // con este limpio el timeout si el usuario sigue escribiendo antes de los 300.
    }, [query]);



    const seleccionarDireccion = (item) => {
        setQuery(item.display_name);
        setSugerencias([]);
        // aqui declaro las coordenadas del item seleccionado y muevo el mapa a esa ubicación
        if (mapRef.current) {
            mapRef.current.moverA(parseFloat(item.lat), parseFloat(item.lon));
        }
    };

    return (
        <div className="container-fluid p-0 d-flex flex-column" style={{ minHeight: "auto" }}>
            <div className="mt-4 mb-4 px-3">
                <h2>Buscador VITTA</h2>
            </div>

            {/* personalización del input */}
            <div className="position-relative px-3 mb-4">
                <div className="d-flex align-items-center bg-white p-3 shadow-sm" style={{ borderRadius: "15px" }}>
                    <i className="fas fa-search me-3 text-success"></i>
                    <input
                        type="text"
                        className="form-control border-0 p-0"
                        placeholder="Busca una dirección..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{ boxShadow: "none" }}
                    />
                </div>

                {/* el bloque encargado de mostrar las sugerecias*/}

                {sugerencias.length > 0 && (
                    <ul className="list-group position-absolute w-100 shadow-lg" style={{ zIndex: 1050, borderRadius: "15px", marginTop: "5px" }}>
                        {sugerencias.map((item, index) => (
                            <li
                                key={index}
                                className="list-group-item list-group-item-action border-0"
                                onClick={() => seleccionarDireccion(item)}
                                style={{ cursor: "pointer", fontSize: "14px" }}>
                                <i className="fas fa-map-marker-alt me-2 text-muted"></i>
                                {item.display_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <Mapa ref={mapRef} />

            {/* esta es la sección que he creado para Tiendas Favoritas / Frecuentes */}
            <div className="px-3 mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className="mb-0" style={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "14px",
                        fontWeight: "bold",
                        letterSpacing: "1px",
                        textTransform: "uppercase"
                    }}>
                        Tiendas Frecuentes
                    </p>
                    <i className="fas fa-star text-warning" style={{ fontSize: "12px" }}></i>
                </div>

                {/* Contenedor de scroll horizontal para las tiendas */}
                <div className="d-flex gap-3 pb-2" style={{ overflowX: "auto", scrollbarWidth: "none" }}>

                    {/* Tienda 1 */}
                    <div style={{
                        minWidth: "160px",
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        borderRadius: "15px",
                        padding: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(5px)"
                    }}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "35px", height: "35px" }}>
                                <i className="fas fa-store text-success" style={{ fontSize: "18px" }}></i>
                            </div>
                            <span className="badge rounded-pill bg-success" style={{ fontSize: "9px" }}>Sano</span>
                        </div>
                        <p className="mb-0 text-white fw-bold" style={{ fontSize: "13px" }}>EcoMarket Sol</p>
                        <p className="mb-0" style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px" }}>A 300m de ti</p>
                    </div>

                    {/* Tienda 2 */}
                    <div style={{
                        minWidth: "160px",
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        borderRadius: "15px",
                        padding: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(5px)"
                    }}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "35px", height: "35px" }}>
                                <i className="fas fa-apple-alt text-danger" style={{ fontSize: "18px" }}></i>
                            </div>
                            <span className="badge rounded-pill bg-warning text-dark" style={{ fontSize: "9px" }}>Oferta</span>
                        </div>
                        <p className="mb-0 text-white fw-bold" style={{ fontSize: "13px" }}>Frutas Doña Ana</p>
                        <p className="mb-0" style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px" }}>A 1.2km de ti</p>
                    </div>

                    {/* Card para añadir más */}
                    <div className="d-flex align-items-center justify-content-center" style={{
                        minWidth: "60px",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "15px",
                        border: "1px dashed rgba(255, 255, 255, 0.3)"
                    }}>
                        <i className="fas fa-plus text-white-50"></i>
                    </div>
                </div>
            </div>

            <div style={{ height: "40px" }}></div>


        </div>


    );
};