import React from "react";

export const Navbar = () => {
    return (

        <nav className="navbar navbar-light px-3" style={{
            backgroundColor: "transparent",
            paddingTop: "20px",
            position: "relative",
            zIndex: 99999,
            width: "100%"
        }}>
            <div className="container-fluid d-flex justify-content-between align-items-center">

                <div className="d-flex flex-column align-items-center">

                    <h1 style={{

                        fontSize: "32px",
                        fontFamily: "'Trebuchet MS', 'Futura', 'Montserrat', sans-serif",
                        fontWeight: "bold",
                        margin: 0,
                        letterSpacing: "1px"
                    }}>
                        VITTA
                    </h1>
                </div>


                <div className="d-flex align-items-center gap-3">
                    <i className="fas fa-search fa-lg" style={{ color: "white", cursor: "pointer" }}></i>
                    <i className="fas fa-user-circle fa-2x" style={{ color: "white", cursor: "pointer" }}></i>
                </div>
            </div>
        </nav>
    );
};