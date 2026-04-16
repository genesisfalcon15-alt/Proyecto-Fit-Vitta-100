import React, { useState, useEffect, useRef } from "react";
import Mapa from "./Mapa.jsx";
import TarjetaDestino from "./TarjetaDestino.jsx";
import { MisLugaresFavoritos } from "./MisLugaresFavoritos.jsx";

export const Buscador = () => {
    const [query, setQuery] = useState("");
    const [sugerencias, setSugerencias] = useState([]);
    const [buscando, setBuscando] = useState(false);

    const [origen, setOrigen] = useState({ nombre: "Mi ubicación", lat: 40.4167, lon: -3.7033 });
    const [destino, setDestino] = useState(null);
    const [editandoOrigen, setEditandoOrigen] = useState(false);

    const [tiendas, setTiendas] = useState([]);
    const [mostrarFavoritos, setMostrarFavoritos] = useState(false);
    const [favoritos, setFavoritos] = useState(() => {
        const guardados = localStorage.getItem("vitta_favoritos");
        return guardados ? JSON.parse(guardados) : [];
    });

    const mapRef = useRef();
    const colorVerdeVitta = "#6e8a4f";

    const categorias = [
        { id: "super", label: "Supermercado", icon: "fa-shopping-cart" },
        { id: "bio", label: "Tienda Bio", icon: "fa-leaf" },
        { id: "fruit", label: "Frutería", icon: "fa-apple-alt" },
        { id: "market", label: "Mercados", icon: "fa-store" },
    ];

    const toggleFavorito = (sitio) => {
        setFavoritos(prev => {
            const existe = prev.find(f => f.nombre === sitio.nombre);
            let nuevaLista = existe
                ? prev.filter(f => f.nombre !== sitio.nombre)
                : [...prev, sitio];
            localStorage.setItem("vitta_favoritos", JSON.stringify(nuevaLista));
            return nuevaLista;
        });
    };

    const buscarLocalesCercanos = async (categoriaLabel) => {
        setSugerencias([]);
        setBuscando(true);
        setTiendas([]);

        const tipos = {
            "Supermercado": "supermarket",
            "Tienda Bio": "health_food",
            "Frutería": "greengrocer",
            "Mercados": "marketplace"
        };

        const tipoOsm = tipos[categoriaLabel] || "supermarket";
        const lat = parseFloat(origen.lat);
        const lon = parseFloat(origen.lon);

        const url = `https://overpass-api.de/api/interpreter?data=[out:json];node["shop"="${tipoOsm}"](around:3000,${lat},${lon});out;`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.elements && data.elements.length > 0) {
                const locales = data.elements.map(el => ({
                    id: el.id,
                    nombre: el.tags.name || categoriaLabel,
                    lat: el.lat,
                    lon: el.lon
                }));

                setTiendas(locales);

                if (mapRef.current) {
                    mapRef.current.moverA(locales[0].lat, locales[0].lon);
                }
            } else {
                alert("No se encontraron locales en esta zona");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setBuscando(false);
        }
    };

    const seleccionarDireccion = (item) => {
        const lat = parseFloat(item.lat || item.latitude);
        const lon = parseFloat(item.lon || item.longitude);
        const nombreLimpio = (item.display_name || item.nombre).split(',')[0];

        if (editandoOrigen) {
            setOrigen({ nombre: nombreLimpio, lat, lon });
            setEditandoOrigen(false);
            setQuery("");
            setTiendas([]);
            if (mapRef.current) mapRef.current.moverA(lat, lon);
        } else {
            setDestino({ nombre: nombreLimpio, lat, lon });
            setQuery(nombreLimpio);
            if (mapRef.current) mapRef.current.moverA(lat, lon);
        }
        setSugerencias([]);
    };

    const obtenerUbicacionActual = () => {
        if (navigator.geolocation) {
            setBuscando(true);
            navigator.geolocation.getCurrentPosition((pos) => {
                const { latitude, longitude } = pos.coords;
                const miUb = { nombre: "Mi ubicación actual", lat: latitude, lon: longitude };
                setOrigen(miUb);
                if (mapRef.current) mapRef.current.moverA(latitude, longitude);
                setBuscando(false);
            }, () => setBuscando(false));
        }
    };

    useEffect(() => {
        const fetchSugerencias = async () => {
            if (query.length < 3 || query === "Mi ubicación actual") {
                setSugerencias([]);
                return;
            }
            setBuscando(true);
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
                const data = await response.json();
                setSugerencias(data);
            } catch (error) {
                console.error(error);
            } finally {
                setBuscando(false);
            }
        };
        const timeout = setTimeout(fetchSugerencias, 300);
        return () => clearTimeout(timeout);
    }, [query]);

    return (
        <div className="container-fluid p-3" style={{ minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
            <h2 className="fw-bold mb-4" style={{ color: "white", letterSpacing: "-1px" }}>Buscador VITTA</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <div style={{
                    display: 'flex', alignItems: 'center', padding: '12px 15px', borderRadius: '18px',
                    backgroundColor: editandoOrigen ? '#fff' : 'rgba(255,255,255,0.7)',
                    border: editandoOrigen ? `2px solid #3498db` : '2px solid transparent',
                    transition: 'all 0.3s'
                }}>
                    <i className="fas fa-dot-circle me-3" style={{ color: '#3498db' }}></i>
                    <input
                        type="text"
                        placeholder="Desde: Mi ubicación..."
                        value={editandoOrigen ? query : origen.nombre}
                        onFocus={() => { setEditandoOrigen(true); setQuery(""); }}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '13px', fontWeight: '600', outline: 'none' }}
                    />
                    <button onClick={obtenerUbicacionActual} style={{ border: 'none', background: 'none', color: '#3498db' }}>
                        <i className={`fas ${buscando ? 'fa-spinner fa-spin' : 'fa-location-arrow'}`}></i>
                    </button>
                </div>

                <div style={{
                    display: 'flex', alignItems: 'center', padding: '12px 15px', borderRadius: '18px',
                    backgroundColor: !editandoOrigen ? '#fff' : 'rgba(255,255,255,0.7)',
                    border: !editandoOrigen ? `2px solid ${colorVerdeVitta}` : '2px solid transparent',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', transition: 'all 0.3s'
                }}>
                    <i className="fas fa-map-marker-alt me-3" style={{ color: colorVerdeVitta }}></i>
                    <input
                        type="text"
                        placeholder="¿A dónde vamos?"
                        value={!editandoOrigen ? query : (destino?.nombre || "")}
                        onFocus={() => { setEditandoOrigen(false); setQuery(""); }}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '14px', fontWeight: '800', outline: 'none' }}
                    />
                </div>
            </div>

            <div className="mb-4" style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "10px", scrollbarWidth: "none" }}>
                {categorias.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => {
                            setEditandoOrigen(false);
                            setQuery(cat.label);
                            buscarLocalesCercanos(cat.label);
                        }}
                        style={{ whiteSpace: "nowrap", padding: "8px 16px", borderRadius: "20px", border: "none", backgroundColor: "rgba(255,255,255,0.2)", color: "white", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", backdropFilter: "blur(5px)" }}
                    >
                        <i className={`fas ${cat.icon}`}></i>{cat.label}
                    </button>
                ))}
            </div>

            {sugerencias.length > 0 && (
                <ul className="list-group shadow-lg mb-3" style={{ borderRadius: "18px", overflow: "hidden", border: "none", position: "relative", zIndex: 1000 }}>
                    {sugerencias.map((item, index) => (
                        <li key={index} className="list-group-item list-group-item-action py-3" onClick={() => seleccionarDireccion(item)} style={{ cursor: "pointer", fontSize: "13px" }}>
                            <i className="fas fa-search me-2 text-muted"></i> {item.display_name}
                        </li>
                    ))}
                </ul>
            )}

            <TarjetaDestino
                destino={destino}
                ubicacionUsuario={origen}
                alCerrar={() => setDestino(null)}
                colorVerdeVitta={colorVerdeVitta}
                onToggleFavorito={toggleFavorito}
                esFavorito={favoritos.some(f => f.nombre === destino?.nombre)}
            />

            <Mapa ref={mapRef} tiendas={tiendas} />

            <button
                onClick={() => setMostrarFavoritos(true)}
                style={{ width: "100%", marginTop: "20px", padding: "18px", borderRadius: "22px", border: "none", backgroundColor: "#6e8a4f", color: "white", fontWeight: "800", fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
            >
                <i className="fas fa-star" style={{ color: "#ffc107" }}></i>
                MIS LUGARES FAVORITOS ({favoritos.length})
            </button>

            {mostrarFavoritos && (
                <MisLugaresFavoritos
                    favoritos={favoritos}
                    colorVerdeVitta={colorVerdeVitta}
                    alCerrar={() => setMostrarFavoritos(false)}
                    alEliminar={toggleFavorito}
                    alSeleccionar={(fav) => {
                        seleccionarDireccion(fav);
                        setMostrarFavoritos(false);
                    }}
                />
            )}
        </div>
    );
};