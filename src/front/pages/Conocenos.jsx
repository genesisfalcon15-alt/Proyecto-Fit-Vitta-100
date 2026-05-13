import React from "react";

const Conocenos = ({ cardGlassStyle, colorVerdeVitta }) => {
    return (
        <div className="container mt-4 mb-5 px-4 text-white">
            <div className="text-center mb-5">
                <h2 style={{ fontWeight: "900", fontSize: "32px" }}>
                    Nuestra Misión
                </h2>

                <div
                    style={{
                        width: "60px",
                        height: "4px",
                        backgroundColor: colorVerdeVitta,
                        margin: "10px auto",
                        borderRadius: "2px",
                    }}
                ></div>
            </div>

            <div style={{ ...cardGlassStyle, marginBottom: "25px" }}>
                <h5 style={{ color: colorVerdeVitta, fontWeight: "800", marginBottom: "15px" }}>
                    <i className="fas fa-leaf me-2"></i> El Concepto
                </h5>

                <p style={{ color: "#333", lineHeight: "1.6", fontSize: "15px" }}>
                    <strong>VITTA</strong> nació de una necesidad real: hacer que comer sano no sea un lujo ni un rompecabezas. Combinamos la tecnología con la nutrición inteligente para ayudarte a ahorrar tiempo y dinero.
                </p>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-6">
                    <div style={{ ...cardGlassStyle, padding: "15px", textAlign: "center", height: "100%" }}>
                        <i className="fas fa-apple-alt mb-2" style={{ fontSize: "24px", color: colorVerdeVitta }}></i>
                        <h6 style={{ color: "#333", fontWeight: "700", fontSize: "14px" }}>Salud Real</h6>
                        <p style={{ color: "#666", fontSize: "11px", margin: 0 }}>Sin procesados, solo comida real.</p>
                    </div>
                </div>

                <div className="col-6">
                    <div style={{ ...cardGlassStyle, padding: "15px", textAlign: "center", height: "100%" }}>
                        <i className="fas fa-piggy-bank mb-2" style={{ fontSize: "24px", color: colorVerdeVitta }}></i>
                        <h6 style={{ color: "#333", fontWeight: "700", fontSize: "14px" }}>Ahorro</h6>
                        <p style={{ color: "#666", fontSize: "11px", margin: 0 }}>Los mejores precios en tu zona.</p>
                    </div>
                </div>
            </div>


        </div>

    );
};

export default Conocenos;