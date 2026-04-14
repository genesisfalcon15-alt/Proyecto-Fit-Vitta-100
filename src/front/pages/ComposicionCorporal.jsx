import React from "react";
import { PieChart, Pie, Cell } from "recharts";

export const ComposicionCorporal = ({ grasa, musculo, agua }) => {
    const data = [   //array de objetos
        { name: "Músculo", value: musculo, color: "#6e8a4f" },
        { name: "Grasa", value: grasa, color: "#ffc107" },
        { name: "Agua", value: agua, color: "#00bcd4" },
    ];

    return (
        <div style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            height: "160px",
            justifyContent: "center"
        }}>

            {/*contenerdor del grafico*/}
            <div style={{
                position: "relative",
                width: "150px",
                height: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>


                <PieChart width={150} height={150}>
                    <Pie
                        data={data}
                        innerRadius={45}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    pointerEvents: "none",
                    zIndex: 10
                }}>

                    <span style={{
                        fontSize: "22px",
                        fontWeight: "800",
                        color: "#222",
                        display: "block",
                        lineHeight: "1"
                    }}>
                        {grasa}%
                    </span>
                    <span style={{
                        fontSize: "9px",
                        color: "#666",
                        textTransform: "uppercase",
                        fontWeight: "700"
                    }}>
                        Grasa
                    </span>
                </div>
            </div>

            <div style={{
                flex: 1,
                paddingLeft: "15px"
            }}>
                <div className="mb-2">
                    <small style={{
                        fontSize: "10px",
                        color: "#666",
                        fontWeight: "700",
                        display: "block"
                    }}>Músculo</small>
                    <span style={{
                        fontWeight: "700",
                        color: "#222",
                        fontSize: "16px"
                    }}>
                        {musculo}%</span>
                </div>
                <div>
                    <div className="mb-2">
                        <small style={{
                            fontSize: "10px",
                            color: "#666",
                            fontWeight: "700",
                            display: "block"
                        }}>Agua</small>
                        <span style={{
                            fontWeight: "700",
                            color: "#222",
                            fontSize: "16px"
                        }}>
                            {agua}%</span>
                    </div>
                    <div>
                        <small style={{
                            fontSize: "10px",
                            color: "#666",
                            fontWeight: "700",
                            display: "block"
                        }}>Edad Metab</small>
                        <span style={{
                            fontWeight: "800",
                            color: "#6e8a4f",
                            fontSize: "16px"
                        }}>24</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
