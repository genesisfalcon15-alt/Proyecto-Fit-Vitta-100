import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Buscador } from "./pages/Buscador.jsx";
import { Imc } from "./pages/Imc.jsx";
import Lista from "./pages/Lista.jsx";
import Conocenos from "./pages/Conocenos.jsx";
import { AnalisisDetallado } from "./pages/AnalisisDetallado.jsx";
import { ContenedorActividad } from "./pages/ContenedorActividad.jsx";

export const AppRoutes = ({ cardGlassStyle, colorVerdeVitta }) => {
  const navigate = useNavigate();

  const usuarioFake = { peso: 70, grasa: 18, minutos: 30, dias: 5 };

  const historialFake = [
    { fecha: "Sem 1", peso: 75, objetivo: 70 },
    { fecha: "Sem 2", peso: 73, objetivo: 70 },
    { fecha: "Sem 3", peso: 72, objetivo: 70 },
    { fecha: "Sem 4", peso: 70, objetivo: 70 },
  ];

  return (
    <Routes Routes >
      <Route
        path="/"
        element={<Home cardGlassStyle={cardGlassStyle} colorVerdeVitta={colorVerdeVitta} />} />

      <Route
        path="/buscador"
        element={<Buscador cardGlassStyle={cardGlassStyle} colorVerdeVitta={colorVerdeVitta} />} />

      <Route
        path="/imc"
        element={<Imc cardGlassStyle={cardGlassStyle} colorVerdeVitta={colorVerdeVitta} />} />

      <Route
        path="/imc/analisis"
        element={
          <AnalisisDetallado
            usuario={usuarioFake}
            historial={historialFake}
            alCerrar={() => navigate("/imc")}
          />} />

      <Route path="/imc/plan" element={<ContenedorActividad />} />
      <Route
        path="/lista"
        element={<Lista cardGlassStyle={cardGlassStyle} colorVerdeVitta={colorVerdeVitta} />} />
      <Route
        path="/conocenos"
        element={<Conocenos cardGlassStyle={cardGlassStyle} colorVerdeVitta={colorVerdeVitta} />} />
    </Routes >
  );
};