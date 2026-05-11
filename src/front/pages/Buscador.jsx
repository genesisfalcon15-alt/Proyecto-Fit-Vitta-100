import React, { useState, useEffect, useRef } from "react";
import Mapa from "./Mapa.jsx";
import TarjetaDestino from "./TarjetaDestino.jsx";
import { Favoritos } from "./MisLugaresFavoritos.jsx";

export const Buscador = () => {
    const [query, setQuery] = useState("");
    const [sugerencias, setSugerencias] = useState([]);
    const [buscando, setBuscando] = useState(false);
    const [origen, setOrigen] = useState({ nombre: "Mi ubicación", lat: 40.4167, lon: -3.7033 });
    const [destino, setDestino] = useState(null);
    const [editandoOrigen, setEditandoOrigen] = useState(false);
    const [tiendas, setTiendas] = useState([]);
    const [mostrarFavoritos, setMostrarFavoritos] = useState(false);
    const [favoritos, setFavoritos] = useState([]);

    const token = localStorage.getItem("token");
    const mapRef = useRef();
    const colorVerdeVitta = "#6e8a4f";

    const categorias = [
        { id: "super", label: "Supermercado", icon: "fa-shopping-cart" },
        { id: "bio", label: "Tienda Bio", icon: "fa-leaf" },
        { id: "fruit", label: "Frutería", icon: "fa-apple-alt" },
        { id: "market", label: "Mercados", icon: "fa-store" },
    ];

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
        const url = `https://overpass.kumi.systems/api/interpreter?data=[out:json];node["shop"="${tipoOsm}"](around:3000,${lat},${lon});out;`;

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

                if (mapRef.current) mapRef.current.moverA(locales[0].lat, locales[0].lon);
            } else {
                alert("No se han encontrado locales en esta zona.");
            }
        } catch (error) {
            console.error("Error Overpass:", error);
        } finally {
            setBuscando(false);
        }
    };

    const seleccionarDireccion = (item) => {
        const lat = parseFloat(item.lat || item.latitude);
        const lon = parseFloat(item.lon || item.longitude);
        const nombreLimpio = (item.display_name || item.nombre).split(",")[0];

        if (editandoOrigen) {
            setOrigen({ nombre: nombreLimpio, lat, lon });
            setEditandoOrigen(false);
            setQuery("");

            if (mapRef.current) mapRef.current.moverA(lat, lon);

            setTiendas([]);
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
            }, () => {
                alert("No se pudo acceder a tu ubicación.");
                setBuscando(false);
            });
        }
    };

    const deleteFavorito = async (id) => {
        if (!id) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/favoritos/${id}`, {
                method: "DELETE",
                headers: { "Authorization": "Bearer " + token }
            });

            if (response.ok) {
                // Esto fuerza a React a redibujar la lista al instante
                setFavoritos(prev => prev.filter(fav => fav.id !== id && fav.place_id !== id));
            }
        } catch (error) {
            console.error("Error al borrar:", error);
        }
    };

    useEffect(() => {
        const fetchSugerencias = async () => {
            if (query.length < 3) {
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

        const timeout = setTimeout(fetchSugerencias, 400);

        return () => clearTimeout(timeout);
    }, [query]);

    useEffect(() => {
        if (!token) return;

        fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/favoritos", {
            headers: { Authorization: "Bearer " + token }
        })
            .then(res => res.json())
            .then(data => setFavoritos(data))
            .catch(() => console.error("Error cargando favoritos"));
    }, []);

    const toggleFavorito = async (sitio) => {
        // Si no hay token, ni lo intentamos
        if (!token) {
            alert("Debes estar logueado");
            return;
        }

        const existe = favoritos.find(f => f.nombre === sitio.nombre);

        try {
            if (existe) {
                // ... lógica del DELETE (está bien)
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/favoritos/${existe.id}`, {
                    method: "DELETE",
                    headers: { Authorization: "Bearer " + token }
                });

                if (res.ok) setFavoritos(prev => prev.filter(f => f.id !== existe.id));
            } else {
                // Lógica del POST
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/favoritos`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify({
                        place_id: String(sitio.id || sitio.nombre),
                        nombre: sitio.nombre,
                        direccion: sitio.display_name || sitio.nombre,
                        lat: sitio.lat,
                        lng: sitio.lon,
                    })
                });

                if (res.ok) {
                    const nuevo = await res.json();
                    setFavoritos(prev => [...prev, nuevo]);
                }
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Poppins', sans-serif",
            overflow: "hidden",
            position: "relative"
        }}>
            <div className="container-fluid px-3 pt-3" style={{ flexShrink: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <h2 className="fw-bold m-0" style={{ color: "white", letterSpacing: "-1px" }}>Buscador VITTA</h2>

                    <button
                        onClick={() => setMostrarFavoritos(true)}
                        style={{
                            padding: "8px 15px",
                            borderRadius: "12px",
                            border: "none",
                            backgroundColor: "rgba(255,255,255,0.15)",
                            color: "white",
                            fontSize: "11px",
                            fontWeight: "700",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            backdropFilter: "blur(10px)"
                        }}
                    >
                        <i className="fas fa-star" style={{ color: "#ffc107" }}></i>
                        MIS SITIOS ({favoritos.length})
                    </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "10px" }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 15px",
                        borderRadius: "18px",
                        backgroundColor: editandoOrigen ? "#fff" : "rgba(255,255,255,0.7)",
                        border: editandoOrigen ? `2px solid #3498db` : "2px solid transparent",
                        transition: "0.3s"
                    }}>
                        <i className="fas fa-dot-circle me-3" style={{ color: "#3498db" }}></i>

                        <input
                            type="text"
                            placeholder="Desde: Mi ubicación..."
                            value={editandoOrigen ? query : origen.nombre}
                            onFocus={() => { setEditandoOrigen(true); setQuery(""); }}
                            onChange={(e) => setQuery(e.target.value)}
                            style={{
                                border: "none",
                                background: "transparent",
                                width: "100%",
                                fontSize: "13px",
                                fontWeight: "600",
                                outline: "none"
                            }}
                        />

                        <button
                            onClick={obtenerUbicacionActual}
                            style={{ border: "none", background: "none", color: "#3498db" }}
                        >
                            <i className={`fas ${buscando ? "fa-spinner fa-spin" : "fa-location-arrow"}`}></i>
                        </button>
                    </div>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 15px",
                        borderRadius: "18px",
                        backgroundColor: !editandoOrigen ? "#fff" : "rgba(255,255,255,0.7)",
                        border: !editandoOrigen ? `2px solid ${colorVerdeVitta}` : "2px solid transparent",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        transition: "0.3s"
                    }}>
                        <i className="fas fa-map-marker-alt me-3" style={{ color: colorVerdeVitta }}></i>

                        <input
                            type="text"
                            placeholder="¿A dónde vamos?"
                            value={!editandoOrigen ? query : (destino?.nombre || "")}
                            onFocus={() => { setEditandoOrigen(false); setQuery(""); }}
                            onChange={(e) => { setQuery(e.target.value); setDestino(null); }}
                            style={{
                                border: "none",
                                background: "transparent",
                                width: "100%",
                                fontSize: "14px",
                                fontWeight: "800",
                                outline: "none"
                            }}
                        />
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    gap: "8px",
                    overflowX: "auto",
                    paddingBottom: "10px",
                    scrollbarWidth: "none"
                }}>
                    {categorias.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => {
                                setEditandoOrigen(false);
                                setQuery(cat.label);
                                buscarLocalesCercanos(cat.label);
                            }}
                            style={{
                                whiteSpace: "nowrap",
                                padding: "7px 14px",
                                borderRadius: "20px",
                                border: "none",
                                backgroundColor: "rgba(255,255,255,0.2)",
                                color: "white",
                                fontSize: "12px",
                                fontWeight: "600",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                backdropFilter: "blur(5px)"
                            }}
                        >
                            <i className={`fas ${cat.icon}`}></i>
                            {cat.label}
                        </button>
                    ))}
                </div>

                {sugerencias.length > 0 && !destino && (
                    <ul className="list-group shadow-lg" style={{
                        borderRadius: "18px",
                        overflow: "hidden",
                        border: "none",
                        position: "absolute",
                        zIndex: 2000,
                        left: "16px",
                        right: "16px"
                    }}>
                        {sugerencias.map((item, index) => (
                            <li
                                key={index}
                                className="list-group-item list-group-item-action py-3"
                                onClick={() => seleccionarDireccion(item)}
                                style={{ cursor: "pointer", fontSize: "13px" }}
                            >
                                <i className="fas fa-search me-2 text-muted"></i>
                                {item.display_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div style={{
                flex: 1,
                position: "relative",
                margin: "0 12px 12px",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
            }}>
                <Mapa ref={mapRef} tiendas={tiendas} origen={origen} destino={destino} />

                {destino && (
                    <div style={{ position: "absolute", bottom: 50, left: 0, right: 0, zIndex: 1000 }}>
                        <TarjetaDestino
                            destino={destino}
                            ubicacionUsuario={origen}
                            alCerrar={() => setDestino(null)}
                            colorVerdeVitta={colorVerdeVitta}
                            onToggleFavorito={toggleFavorito}
                            esFavorito={favoritos.some(f => f.nombre === destino?.nombre)}
                        />
                    </div>
                )}
            </div>

            {mostrarFavoritos && (
                <div style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 3000,
                    background: "rgba(0,0,0,0.45)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "16px"
                }}>
                    <div style={{
                        background: "linear-gradient(180deg, #8ba175 0%, #313b26 100%)",
                        borderRadius: "28px",
                        maxHeight: "68%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        boxShadow: "0 18px 45px rgba(0,0,0,0.28)"
                    }}>
                        <div style={{
                            padding: "18px 18px 12px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexShrink: 0
                        }}>
                            <span style={{
                                color: "white",
                                fontWeight: "800",
                                fontSize: "16px"
                            }}>
                                Mis sitios favoritos
                            </span>

                            <button
                                onClick={() => setMostrarFavoritos(false)}
                                style={{
                                    background: "rgba(255,255,255,0.14)",
                                    border: "none",
                                    color: "white",
                                    borderRadius: "50%",
                                    width: "32px",
                                    height: "32px",
                                    fontSize: "16px",
                                    cursor: "pointer"
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        <div style={{
                            flex: 1,
                            overflowY: "auto",
                            scrollbarWidth: "none"
                        }}>
                            <Favoritos
                                lista={favoritos}
                                onDelete={deleteFavorito}
                                cargando={false}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
