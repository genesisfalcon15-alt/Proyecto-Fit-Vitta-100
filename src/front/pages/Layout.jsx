import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "../routes.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";
import { Imc } from "./Imc.jsx";
import Signup from "./Signup.jsx";
import Signin from "./Signin.jsx";




const Layout = () => {
    return (
        <div id="app-container" style={{
            maxWidth: "450px",
            margin: "0 auto",
            height: "100vh",
            position: "relative",
            background: "linear-gradient(180deg, #8ba175 0%, #3a4132 100%)",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            overflow: "hidden"
        }}>
            <BrowserRouter>
                <Navbar />
                <div id="scroll-container"
                    style={{
                        flex: "1",
                        meinHeight: "0",
                        overflowY: "auto",
                        overflowX: "hidden",
                        WebkitOverflowScrolling: "touch",
                        display: "block",
                        position: "relative",
                        zIndex: 1,
                        width: "100%",
                    }}>

                    <AppRoutes />
                    <div style={{ height: "100px", width: "100%" }}></div>
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    );
};
export default Layout;


