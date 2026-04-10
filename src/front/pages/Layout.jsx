import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "../routes.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";



const Layout = () => {
    return (
        <div id="app-container" style={{
            maxWidth: "450px",
            margin: "0 auto",
            height: "100vh",
            position: "relative",
            backgroundColor: "rgba(113, 121, 103, 1 )",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)"
        }}>
            <BrowserRouter>
                <Navbar />
                <div
                    style={{
                        flex: "1 0 auto",
                        overflowY: "auto",
                        overflowX: "hidden",
                        paddingBottom: "80px",
                        display: "block",
                        position: "relative",
                        width: "100%",
                    }}>

                    <AppRoutes />
                    <div style={{ height: "100px" }}></div>
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    );
};
export default Layout;


