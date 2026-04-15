import React, { useEffect, useState } from "react";

const Private = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    // Si no hay token te manda fuera
    if (!token) {
      window.location.href = "/login";
      return;
    }

    // 🔐 Validar token con backend
    fetch(process.env.BACKEND_URL + "/api/private", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        if (res.status !== 200) {
          window.location.href = "/login";
          return;
        }
        return res.json();
      })
      .then(data => {
        if (data) setMessage(data.msg);
      })
      .catch(() => {
        window.location.href = "/login";
      });
  }, []);

  return (
    <div className="container text-center mt-5">
      <h1>Zona Privada</h1>
      <p>{message}</p>
    </div>
  );
};

export default Private;