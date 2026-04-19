import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Buscador } from "./pages/Buscador.jsx";
import { Imc } from "./pages/Imc.jsx";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Conocenos from "./pages/Conocenos.jsx";
import Lista from "./pages/Lista.jsx";
import Private from "./pages/Private.jsx";
import EditarStats from "./pages/EditarStats.jsx";


export const AppRoutes = ({ cardGlassStyle, colorVerdeVitta }) => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Buscador />} path="/Buscador" />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/private" element={<Private />} />
      <Route path="/Imc" element={<Imc />} />
      <Route path="/conocenos" element={<Conocenos cardGlassStyle={cardGlassStyle} colorVerdeVitta={colorVerdeVitta} />}
      />
      <Route path="/lista" element={<Lista />} />
      <Route path="/editar-stats" element={<EditarStats />} /> 
      <Route element={<h1>Not found!</h1>} path="*" />
      

    </Routes>
  );
};
