import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { AppRoutes } from "../routes.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import { Breadcrumbs } from "../components/Breadcrumbs.jsx";

//componente interno para poder usar useLocation()
const LayoutContent = ({ colorVerdeVitta, cardGlassStyle }) => {
    const location = useLocation();

    // Definimos la ruta donde NO queremos ver Navbar, Footer ni Breadcrumbs
    const esLanding = location.pathname === "/welcome";

    return (
        <>
            {!esLanding && <Navbar colorVerdeVitta={colorVerdeVitta} />}

            <div id="scroll-container" style={{
                flex: "1 1 auto",
                overflowY: "scroll",
                overflowX: "hidden",
                WebkitOverflowScrolling: "touch",
                display: "block",
                position: "relative",
                zIndex: 1,
                width: "100%"
            }}>
                <ScrollToTop />
                {!esLanding && <Breadcrumbs />}

                <AppRoutes
                    cardGlassStyle={cardGlassStyle}
                    colorVerdeVitta={colorVerdeVitta}
                />
                {!esLanding && <div style={{ height: "100px", width: "100%" }}></div>}
            </div>
            {!esLanding && <Footer />}
        </>
    );
};


const Layout = () => {
    // defino estilos globales para reutilizarlos en toda la app
    const colorVerdeVitta = "#6e8a4f";

    // efecto vidrio que voy pasando como prop a las vistas
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
        <div
            id="app-container"
            style={{
                maxWidth: "450px",
                margin: "0 auto",
                height: "100vh",
                position: "relative",
                background: "linear-gradient(180deg, #8ba175 0%, #313b26 100%)",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 0 20px rgba(0,0,0,0.2)",
                overflow: "hidden",
            }}>

            <BrowserRouter>
                <div style={{
                    flexShrink: 0,
                    position: "relative",
                    zIndex: 50,
                }}>
                    <Navbar colorVerdeVitta={colorVerdeVitta} />
                    <div style={{
                        backgroundColor: "rgba(45, 70, 30, 0.6)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                    }}>
                        <Breadcrumbs />
                    </div>
                </div>
                <div
                    id="scroll-container"
                    style={{
                        flex: "1 1 auto",
                        overflowY: "scroll",
                        overflowX: "hidden",
                        WebkitOverflowScrolling: "touch",
                        position: "relative",
                        zIndex: 1,
                        width: "100%",
                    }}>

                    <ScrollToTop />
                    <AppRoutes
                        cardGlassStyle={cardGlassStyle}
                        colorVerdeVitta={colorVerdeVitta} />
                    <div style={{ height: "100px" }}></div>
                </div>

                <Footer />
            </BrowserRouter>

        </div>
    );
};

export default Layout;