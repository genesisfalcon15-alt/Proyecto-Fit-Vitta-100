import React, { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


const vittaIconPrincipal = new L.DivIcon({
    className: "custom-vitta-icon",
    html: `<div style="background-color: #6e8a4f; 
    width: 40px; 
    height: 40px; 
    border-radius: 50% 50% 50% 0; 
    transform: rotate(-45deg); display:
     flex; align-items: center; 
     justify-content: center; 
     border: 3px solid white; 
     box-shadow: 0 4px 10px rgba(0,0,0,0.2);"><i class="fas fa-user" 
     style="color: white; transform: rotate(45deg); font-size: 16px;"></i></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});


const tiendaIcon = new L.DivIcon({
    className: "tienda-icon",
    html: `<div style="background-color: 
    white; width: 32px; 
    height: 32px; 
    border-radius: 50%; 
    display: flex; align-items: 
    center; justify-content: center; 
    border: 2px solid #6e8a4f; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
    <i class="fas fa-shopping-basket" style="color: #6e8a4f; font-size: 14px;"></i></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});


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

export const Mapa = forwardRef(({ tiendas = [] }, ref) => {
    // posición actual del mapa
    const [position, setPosition] = useState([40.4167, -3.7033]);
    const [cargado, setCargado] = useState(false);

    // expongo función para mover el mapa desde fuera
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
            position: "relative",
            border: "1px solid #eee"
        }}>

            <MapContainer
                center={position}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
                attributionControl={false}
                whenReady={() => setCargado(true)}>

                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />


                <Marker position={position} icon={vittaIconPrincipal} />

                {/* tiendas */}
                {tiendas && tiendas.length > 0 && tiendas.map((tienda) => (
                    <Marker
                        key={`${tienda.id}-${tienda.lat}`}
                        position={[tienda.lat, tienda.lon]}
                        icon={tiendaIcon} >
                        <Popup>
                            <div style={{
                                textAlign: "center",
                                fontWeight: "800",
                                fontFamily: "'Poppins', sans-serif"
                            }}>
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