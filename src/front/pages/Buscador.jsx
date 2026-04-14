import React, { useState, useEffect, useRef } from "react";
import Mapa from "./Mapa.jsx";
import TarjetaDestino from "./TarjetaDestino.jsx";

export const Buscador = () => {
    const [query, setQuery] = useState("");
    const [sugerencias, setSugerencias] = useState([]);
    const [buscando, setBuscando] = useState(false);
    const [destino, setDestino] = useState(null);
    const [tiendas, setTiendas] = useState([]);
    const mapRef = useRef();

    const colorVerdeVitta = "#6e8a4f";

    const categorias = [
        { id: "super", label: "Supermercado", icon: "fa-shopping-cart" },
        { id: "bio", label: "Tienda Bio", icon: "fa-leaf" },
        { id: "fruit", label: "Frutería", icon: "fa-apple-alt" },
        { id: "market", label: "Mercados", icon: "fa-store" },
    ];

    // tiendas en el mapa (Overpass API)
    const buscarTiendasCercanas = async (lat, lon) => {
        setBuscando(true);
        try {
            const queryOverpass = `[out:json];node["shop"="supermarket"](around:1500,${lat},${lon});out;`;
            const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(queryOverpass)}`);
            const data = await response.json();

            const tiendasMapeadas = data.elements.map(item => ({
                id: item.id,
                nombre: item.tags.name || "Supermercado",
                lat: item.lat,
                lon: item.lon
            }));

            setTiendas(tiendasMapeadas);
        } catch (error) {
            console.error("Error buscando tiendas", error);
        } finally {
            setBuscando(false);
        }
    };

    const manejarClickCategoria = (catId, label) => {
        if (catId === "super" && destino) {
            buscarTiendasCercanas(destino.lat, destino.lon);
        } else {
            setQuery(label);
        }
    };

    {/* Este useEffect se encarga de obtener las sugerencias de búsqueda cada vez que el query cambia */ }
    useEffect(() => {
        const fetchSugerencias = async () => {
            if (query.length < 3) {
                setSugerencias([]);
                return;
            }
            setBuscando(true);
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
                );
                const data = await response.json();
                setSugerencias(data);
            } catch (error) {
                console.error("Error en autocompletado", error);
            } finally {
                setBuscando(false);
            }
        };

        const timeout = setTimeout(fetchSugerencias, 300); // aqui se Espera el error 300! después de que el usuario deje de escribir
        return () => clearTimeout(timeout); // con este limpio el timeout si el usuario sigue escribiendo antes de los 300.
    }, [query]);

    const seleccionarDireccion = (item) => {
        const lat = parseFloat(item.lat);
        const lon = parseFloat(item.lon);

        setTiendas([]);
        setDestino({ nombre: item.display_name.split(',')[0], lat, lon });
        setQuery(item.display_name);
        setSugerencias([]);

        // aqui declaro las coordenadas del item seleccionado y muevo el mapa a esa ubicación
        if (mapRef.current) {
            mapRef.current.moverA(lat, lon);
        }
    };

    const obtenerUbicacionActual = () => {
        if (navigator.geolocation) {
            setBuscando(true);

            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;

                    setTiendas([]);

                    if (mapRef.current) {
                        mapRef.current.moverA(latitude, longitude);
                    }

                    setQuery("Mi ubicación actual");
                    setDestino({ nombre: "Tu ubicación", lat: latitude, lon: longitude });
                    setBuscando(false);
                },
                () => setBuscando(false)
            );
        }
    };

    return (
        <div className="container-fluid p-3" style={{ minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
            <h2 className="fw-bold mb-4" style={{ color: "white", letterSpacing: "-1px" }}>Buscador VITTA</h2>

            {/* personalización del input */}
            <div className="d-flex gap-2 mb-3">
                <div className="d-flex align-items-center bg-white p-3 shadow-sm flex-grow-1" style={{ borderRadius: "18px" }}>
                    <i className={`fas ${buscando ? "fa-circle-notch fa-spin" : "fa-search"} me-3`} style={{ color: colorVerdeVitta }}></i>
                    <input
                        type="text"
                        className="form-control border-0 p-0"
                        placeholder="¿A dónde vamos?"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{ boxShadow: "none", fontWeight: "500", background: "transparent" }}
                    />
                </div>

                <button
                    onClick={obtenerUbicacionActual}
                    style={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "18px",
                        border: "none",
                        backgroundColor: "white",
                        color: colorVerdeVitta,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                        cursor: "pointer"
                    }}
                >
                    <i className="fas fa-location-arrow"></i>
                </button>
            </div>

            <div className="mb-4" style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "10px", scrollbarWidth: "none" }}>
                {categorias.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => manejarClickCategoria(cat.id, cat.label)}
                        style={{
                            whiteSpace: "nowrap",
                            padding: "8px 16px",
                            borderRadius: "20px",
                            border: "none",
                            backgroundColor: "rgba(255,255,255,0.2)",
                            color: "white",
                            fontSize: "13px",
                            fontWeight: "600",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: "pointer",
                            backdropFilter: "blur(5px)"
                        }}
                    >
                        <i className={`fas ${cat.icon}`}></i>
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* este es el  bloque encargado de mostrar las sugerecias*/}
            {sugerencias.length > 0 && (
                <ul className="list-group shadow-lg mb-3" style={{ borderRadius: "18px", overflow: "hidden", border: "none", position: "relative", zIndex: 1000 }}>
                    {sugerencias.map((item, index) => (
                        <li
                            key={index}
                            className="list-group-item list-group-item-action py-3"
                            onClick={() => seleccionarDireccion(item)}
                            style={{ cursor: "pointer", fontSize: "13px" }}
                        >
                            <i className="fas fa-map-marker-alt me-2 text-muted"></i>
                            {item.display_name}
                        </li>
                    ))}
                </ul>
            )}

            {/* referencia del mapa */}
            <Mapa ref={mapRef} tiendas={tiendas} />

            {/* componente tarjeta destino */}
            <TarjetaDestino
                destino={destino}
                alCerrar={() => { setDestino(null); setTiendas([]); }}
                colorVerdeVitta={colorVerdeVitta}
            />

            <div style={{ height: "80px" }}></div>
        </div>
    );
};