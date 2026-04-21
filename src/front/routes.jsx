import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Buscador } from "./pages/Buscador.jsx";
import { Imc } from "./pages/Imc.jsx";
import Lista from "./pages/Lista.jsx";
import Conocenos from "./pages/Conocenos.jsx";
import { AnalisisDetallado } from "./pages/AnalisisDetallado.jsx";
import { ContenedorActividad } from "./pages/ContenedorActividad.jsx";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Private from "./pages/Private.jsx";
import EditarStats from "./pages/EditarStats.jsx";
import Perfil from "./pages/Perfil.jsx";

export const AppRoutes = ({ cardGlassStyle, colorVerdeVitta }) => {
  const navigate = useNavigate();


  return (
    <Routes>
      <Route path="/" element={<Home cardGlassStyle={cardGlassStyle} colorVerdeVitta={colorVerdeVitta} />} />
      <Route path="/buscador" element={<Buscador cardGlassStyle={cardGlassStyle} colorVerdeVitta={colorVerdeVitta} />} />
      <Route path="/imc" element={<Imc cardGlassStyle={cardGlassStyle} colorVerdeVitta={colorVerdeVitta} />} />

    
      <Route path="/imc/analisis" element={
        <AnalisisDetallado alCerrar={() => navigate("/imc")} />
      } />

      <Route path="/imc/plan" element={<ContenedorActividad />} />
      <Route path="/lista" element={<Lista cardGlassStyle={cardGlassStyle} colorVerdeVitta={colorVerdeVitta} />} />
      <Route path="/conocenos" element={<Conocenos cardGlassStyle={cardGlassStyle} colorVerdeVitta={colorVerdeVitta} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/private" element={<Private />} />
      <Route path="/editar-stats" element={<EditarStats />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route element={<h1>Not found!</h1>} path="*" />
    </Routes>
  );
};