import React, { useState, useImperativeHandle, forwardRef, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const vittaIconPrincipal = new L.DivIcon({
    className: "custom-vitta-icon",
    html: `<div style="background-color: #6e8a4f; width: 40px; height: 40px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.2);"><i class="fas fa-user" style="color: white; transform: rotate(45deg); font-size: 16px;"></i></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

const destinoIcon = new L.DivIcon({
    className: "destino-icon",
    html: `<div style="background-color: #e74c3c; width: 40px; height: 40px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);"><i class="fas fa-map-marker-alt" style="color: white; transform: rotate(45deg); font-size: 16px;"></i></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

const tiendaIcon = new L.DivIcon({
    className: "tienda-icon",
    html: `<div style="background-color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #6e8a4f; box-shadow: 0 2px 5px rgba(0,0,0,0.2);"><i class="fas fa-shopping-basket" style="color: #6e8a4f; font-size: 14px;"></i></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

// Componente que dibuja y limpia la ruta
const RutaLayer = ({ origen, destino }) => {
    const map = useMap();
    const routingRef = useRef(null);

    useEffect(() => {
        if (!origen || !destino) {
            if (routingRef.current) {
                map.removeControl(routingRef.current);
                routingRef.current = null;
            }
            return;
        }

        // Carga dinámica de Leaflet Routing Machine
        const cargarRuta = async () => {
            if (!window.L.Routing) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement("script");
                    script.src = "https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.min.js";
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);

                    const link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href = "https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css";
                    document.head.appendChild(link);
                });
            }

            if (routingRef.current) {
                map.removeControl(routingRef.current);
            }

            routingRef.current = window.L.Routing.control({
                waypoints: [
                    window.L.latLng(origen.lat, origen.lon),
                    window.L.latLng(destino.lat, destino.lon),
                ],
                routeWhileDragging: false,
                show: false,           // oculta el panel de instrucciones
                addWaypoints: false,
                fitSelectedRoutes: true,
                lineOptions: {
                    styles: [
                        { color: "#6e8a4f", weight: 5, opacity: 0.85 },
                        { color: "white", weight: 2, opacity: 0.4 }
                    ]
                },
                createMarker: () => null, // no crea markers propios
            }).addTo(map);
        };

        cargarRuta();

        return () => {
            if (routingRef.current) {
                map.removeControl(routingRef.current);
                routingRef.current = null;
            }
        };
    }, [origen, destino, map]);

    return null;
};

const MapaControlador = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
        if (coords) {
            map.setView(coords, 15);
            map.invalidateSize();
        }
    }, [coords, map]);
    return null;
};

export const Mapa = forwardRef(({ tiendas = [], origen, destino }, ref) => {
    const [position, setPosition] = useState([40.4167, -3.7033]);
    const [cargado, setCargado] = useState(false);

    useImperativeHandle(ref, () => ({
        moverA: (lat, lon) => {
            setPosition([lat, lon]);
            setCargado(true);
        }
    }));

    const posDestino = destino ? [destino.lat, destino.lon] : null;

    return (
        <div style={{ borderRadius: "28px", overflow: "hidden", height: "450px", position: "relative", border: "1px solid #eee" }}>

            

            <MapContainer
                center={position}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
                attributionControl={false}
                whenReady={() => setCargado(true)}
            >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

              
                <Marker position={position} icon={vittaIconPrincipal} />

            
                {posDestino && (
                    <Marker position={posDestino} icon={destinoIcon}>
                        <Popup>
                            <div style={{ textAlign: "center", fontWeight: "800", fontFamily: "'Poppins', sans-serif" }}>
                                {destino.nombre}
                            </div>
                        </Popup>
                    </Marker>
                )}

           
                {origen && destino && (
                    <RutaLayer origen={origen} destino={destino} />
                )}

           
                {tiendas.length > 0 && tiendas.map((tienda) => (
                    <Marker
                        key={`${tienda.id}-${tienda.lat}`}
                        position={[tienda.lat, tienda.lon]}
                        icon={tiendaIcon}
                    >
                        <Popup>
                            <div style={{ textAlign: "center", fontWeight: "800", fontFamily: "'Poppins', sans-serif" }}>
                                {tienda.nombre}
                            </div>
                        </Popup>
                    </Marker>
                ))}

                <MapaControlador coords={position} />
            </MapContainer>
        </div>
    );
});

export default Mapa;