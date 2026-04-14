import React, { useState, useImperativeHandle, forwardRef } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const vittaIconPrincipal = new L.DivIcon({
    className: "custom-vitta-icon",
    html: `<div style="background-color: #6e8a4f; width: 40px; height: 40px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.2);"><i class="fas fa-user" style="color: white; transform: rotate(45deg); font-size: 16px;"></i></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

const tiendaIcon = new L.DivIcon({
    className: "tienda-icon",
    html: `<div style="background-color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #6e8a4f; box-shadow: 0 2px 5px rgba(0,0,0,0.2);"><i class="fas fa-shopping-basket" style="color: #6e8a4f; font-size: 14px;"></i></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

const RecenterMap = ({ coords }) => {
    const map = useMap();
    if (coords) map.setView(coords, 16);
    return null;
};

export const Mapa = forwardRef(({ tiendas = [] }, ref) => {
    const [position, setPosition] = useState([40.4167, -3.7033]);
    const [cargado, setCargado] = useState(false);

    useImperativeHandle(ref, () => ({
        moverA: (lat, lon) => {
            setPosition([lat, lon]);
            setCargado(true);
        }
    }));

    return (
        <div style={{
            borderRadius: "28px",
            overflow: "hidden",
            height: "450px",
            border: "1px solid rgba(110, 138, 79, 0.15)",
            boxShadow: "0 15px 35px rgba(0,0,0,0.06)",
            position: "relative"
        }}>

            {!cargado && (
                <div style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1000,
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                    transition: "all 0.5s ease"
                }}>
                    <div style={{
                        backgroundColor: "white",
                        padding: "15px 25px",
                        borderRadius: "20px",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                        textAlign: "center"
                    }}>
                        <i className="fas fa-map-marked-alt mb-2" style={{ color: "#6e8a4f", fontSize: "24px" }}></i>
                        <p style={{ margin: 0, fontSize: "12px", fontWeight: "700", color: "#555", textTransform: "uppercase", letterSpacing: "1px" }}>
                            Explora tu zona VITTA
                        </p>
                    </div>
                </div>
            )}

            <MapContainer
                center={position}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
                whenReady={() => setTimeout(() => setCargado(true), 1500)}
            >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

                <Marker position={position} icon={vittaIconPrincipal} />

                {tiendas.map((tienda) => (
                    <Marker
                        key={tienda.id}
                        position={[tienda.lat, tienda.lon]}
                        icon={tiendaIcon}
                    >
                        <Popup>
                            <div style={{ textAlign: "center", fontFamily: "Poppins" }}>
                                <span style={{ fontWeight: "800", color: "#6e8a4f" }}>{tienda.nombre}</span>
                                <br />
                                <span style={{ fontSize: "10px", color: "#999" }}>Supermercado cercano</span>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                <RecenterMap coords={position} />
            </MapContainer>
        </div>
    );
});

export default Mapa;