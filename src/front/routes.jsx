import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Buscador } from "./pages/Buscador.jsx";




export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Buscador />} path="/Buscador" />
         <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      <Route element={<h1>Not found!</h1>} path="*" />
    </Routes>
  );
};
