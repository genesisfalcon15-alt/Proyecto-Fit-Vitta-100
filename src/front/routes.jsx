import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Buscador } from "./pages/Buscador.jsx";
import { Imc } from "./pages/Imc.jsx";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";



export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Buscador />} path="/Buscador" />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/Imc" element={<Imc />} />
      <Route element={<h1>Not found!</h1>} path="*" />
    </Routes>
  );
};
