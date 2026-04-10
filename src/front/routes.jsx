import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";



export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<h1>Not found!</h1>} path="*" />
    </Routes>
  );
};
