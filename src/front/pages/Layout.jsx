import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { AppRoutes } from "../routes.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import { Breadcrumbs } from "../components/Breadcrumbs.jsx";


// Componente interno para poder usar useLocation()
// Aquí controlo qué rutas muestran Navbar, Breadcrumbs y Footer
const LayoutContent = ({ colorVerdeVitta, cardGlassStyle }) => {
    const location = useLocation();

    // Rutas donde no quiero ver Navbar, Footer ni Breadcrumbs
    // se usa para pantallas independientes como landing, login y registro
    const esLanding =
        location.pathname === "/welcome" ||
        location.pathname === "/signin" ||
        location.pathname === "/signup";

    return (
        <>

            {!esLanding && (
                <div className="app-header">
                    <Navbar colorVerdeVitta={colorVerdeVitta} />

                    <div className="breadcrumbs-wrapper">
                        <Breadcrumbs />
                    </div>
                </div>
            )}


            <main id="scroll-container" className="app-scroll">
                <ScrollToTop />

                <AppRoutes
                    cardGlassStyle={cardGlassStyle}
                    colorVerdeVitta={colorVerdeVitta}
                />


                {!esLanding && <div style={{ height: "100px", width: "100%" }} />}
            </main>


            {!esLanding && <Footer />}
        </>
    );
};

const Layout = () => {
    // Defino estilos globales para reutilizarlos en toda la app
    const colorVerdeVitta = "#6e8a4f";

    // Efecto vidrio que voy pasando como prop a las vistas
    const cardGlassStyle = {
        background: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "24px",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        padding: "20px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    };

    return (
        <BrowserRouter>

            <div className="app-device-frame">

                <div id="app-container" className="app-container">
                    <LayoutContent
                        colorVerdeVitta={colorVerdeVitta}
                        cardGlassStyle={cardGlassStyle}
                    />
                </div>
            </div>
        </BrowserRouter>
    );
};

export default Layout;
