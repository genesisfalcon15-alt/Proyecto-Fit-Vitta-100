import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "../routes.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";
import { Imc } from "./Imc.jsx";
import Signup from "./Signup.jsx";
import Signin from "./Signin.jsx";




const Layout = () => {

    const colorVerdeVitta = "#6e8a4f";

    const cardGlassStyle = {
        background: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "24px",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        padding: "20px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
    };

    return (
        <div
            id="app-container"
            style={{
                maxWidth: "450px",
                margin: "0 auto",
                height: "100vh",
                position: "relative",
                background: "linear-gradient(180deg, #8ba175 0%, #3a4132 100%)",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 0 20px rgba(0,0,0,0.2)",
                overflow: "hidden"
            }}
        >
            <BrowserRouter>
                <Navbar colorVerdeVitta={colorVerdeVitta} />

                <div
                    id="scroll-container"
                    style={{
                        flex: "1 1 auto",
                        overflowY: "scroll",
                        overflowX: "hidden",
                        WebkitOverflowScrolling: "touch",
                        display: "block",
                        position: "relative",
                        zIndex: 1,
                        width: "100%"
                    }}
                >
                    <AppRoutes
                        cardGlassStyle={cardGlassStyle}
                        colorVerdeVitta={colorVerdeVitta}
                    />

                    <div style={{ height: "100px", width: "100%" }}></div>
                </div>

                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default Layout;
