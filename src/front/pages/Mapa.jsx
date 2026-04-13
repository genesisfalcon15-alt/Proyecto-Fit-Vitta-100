import React, { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const RecenterMap = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
        if (coords) {
            map.setView(coords, 16);
        }
    }, [coords, map]);
    return null;
};

export const Mapa = forwardRef((props, ref) => {
    const [position, setPosition] = useState([40.4167, -3.7033]);

    useImperativeHandle(ref, () => ({
        moverA: (lat, lon) => {
            setPosition([lat, lon]);
        }
    }));


    return (
        <div style={{
            borderRadius: "20px",
            overflow:
                "hidden",
            height: "400px",
            border: "2px solid #6e8a4f"
        }}>
            <MapContainer center={position}
                zoom={13}
                style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position} />
                <RecenterMap coords={position} />
            </MapContainer>
        </div>
    );
});
