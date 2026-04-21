import React, { useEffect, useState } from "react";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [formStats, setFormStats] = useState({ peso: "", altura: "" });
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");


  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/signin";
      return;
    }
    try {
      const res = await fetch(`${BACKEND}/api/private`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUser(data.user);
      setFormStats({
        peso: data.user.stats?.peso ?? "",
        altura: data.user.stats?.altura ?? "",
      });
    } catch {
      setError("No se pudieron cargar los datos. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUser(); }, []);

  const handleGuardar = async () => {
    setGuardando(true);
    setError("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${BACKEND}/api/user/stats`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          peso: parseFloat(formStats.peso),
          altura: parseFloat(formStats.altura),
        }),
      });
      if (!res.ok) throw new Error();
      await fetchUser(); 
      setEditando(false);
    } catch {
      setError("Error al guardar. Inténtalo de nuevo.");
    } finally {
      setGuardando(false);
    }
  };

  const calcIMC = (peso, altura) => {
    if (!peso || !altura) return null;
    return (peso / Math.pow(altura / 100, 2)).toFixed(1);
  };

  const imcInfo = (imc) => {
    if (!imc) return null;
    if (imc < 18.5) return { text: "Bajo peso",     color: "#f0ad4e" };
    if (imc < 25)   return { text: "Peso saludable", color: "#6e8a4f" };
    if (imc < 30)   return { text: "Sobrepeso",      color: "#f0ad4e" };
    return             { text: "Obesidad",           color: "#d9534f" };
  };

  const generoLabel = (g) =>
    ({ masculino: "Masculino", femenino: "Femenino", otro: "Otro" }[g] ?? "—");

  const bg = { background: "linear-gradient(135deg, #6e8a4f, #a3b18a)" };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={bg}>
        <div className="text-center text-white">
          <div className="spinner-border mb-2" role="status" />
          <p style={{ fontWeight: 600 }}>Cargando perfil…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={bg}>
        <p style={{ color: "white", fontWeight: 600 }}>
          {error || "No se encontró el usuario."}
        </p>
      </div>
    );
  }

  const stats = user.stats || {};
  const imc = calcIMC(stats.peso, stats.altura);
  const imcData = imcInfo(imc);

  const cardStyle = {
    borderRadius: "12px",
    backgroundColor: "#f7f9f5",
    border: "1px solid #e0e8d8",
  };

  const inputStyle = {
    borderRadius: "10px",
    border: "1px solid #c5d9b0",
    padding: "6px 10px",
    width: "100%",
    fontSize: "14px",
    outline: "none",
  };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={bg}>
      <div
        className="shadow-lg p-4"
        style={{ width: "420px", borderRadius: "20px", backgroundColor: "#fff" }}
      >

        <div className="text-center mb-3">
          <h2 style={{ fontWeight: 700, color: "#3b3b3b" }}>🏋️ Mi Perfil</h2>
          <p style={{ fontSize: 14, color: "#777" }}>Fit Vitta</p>
        </div>

  
        <div className="text-center mb-3">
          {stats.image ? (
            <img
              src={stats.image}
              alt="perfil"
              style={{
                width: 90, height: 90,
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #6e8a4f",
              }}
            />
          ) : (
            <div
              style={{
                width: 90, height: 90,
                borderRadius: "50%",
                backgroundColor: "#eee",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto", fontSize: 32,
              }}
            >
              🙍
            </div>
          )}
        </div>

        <div className="text-center mb-3">
          <h5 style={{ fontWeight: 700, color: "#3b3b3b", marginBottom: 2 }}>
            {user.nombre} {user.apellidos}
          </h5>
          <span style={{ fontSize: 13, color: "#888" }}>{user.email}</span>
        </div>

        <hr style={{ borderColor: "#e0e0e0" }} />

   
        <div
          className="d-flex align-items-center justify-content-between px-3 py-2 mb-2"
          style={cardStyle}
        >
          <div className="d-flex align-items-center gap-2">
            <span style={{ fontSize: 18 }}>⚧</span>
            <span style={{ fontSize: 14, color: "#666", fontWeight: 500 }}>Género</span>
          </div>
          <span style={{ fontWeight: 700, color: "#3b3b3b", fontSize: 15 }}>
            {generoLabel(user.genero)}
          </span>
        </div>

    
        {!editando ? (
          <>
            {[
              { icon: "⚖️", label: "Peso",   value: stats.peso,   unit: "kg" },
              { icon: "📏", label: "Altura", value: stats.altura, unit: "cm" },
            ].map((item) => (
              <div
                key={item.label}
                className="d-flex align-items-center justify-content-between px-3 py-2 mb-2"
                style={cardStyle}
              >
                <div className="d-flex align-items-center gap-2">
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <span style={{ fontSize: 14, color: "#666", fontWeight: 500 }}>
                    {item.label}
                  </span>
                </div>
                <span style={{ fontWeight: 700, color: "#3b3b3b", fontSize: 15 }}>
                  {item.value ?? "—"}
                  {item.value && (
                    <span style={{ fontWeight: 400, color: "#888", fontSize: 12, marginLeft: 3 }}>
                      {item.unit}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </>
        ) : (

          <div className="row mb-2">
            <div className="col-6">
              <label style={{ fontSize: 12, color: "#666", marginBottom: 4, display: "block" }}>
                ⚖️ Peso (kg)
              </label>
              <input
                type="number"
                style={inputStyle}
                value={formStats.peso}
                onChange={(e) => setFormStats({ ...formStats, peso: e.target.value })}
              />
            </div>
            <div className="col-6">
              <label style={{ fontSize: 12, color: "#666", marginBottom: 4, display: "block" }}>
                📏 Altura (cm)
              </label>
              <input
                type="number"
                style={inputStyle}
                value={formStats.altura}
                onChange={(e) => setFormStats({ ...formStats, altura: e.target.value })}
              />
            </div>
          </div>
        )}

  
        {imc && !editando && (
          <div
            className="d-flex align-items-center justify-content-between px-3 py-2 mb-2"
            style={{
              borderRadius: 12,
              backgroundColor: "#f0f5eb",
              border: "1px solid #c5d9b0",
            }}
          >
            <div>
              <div style={{ fontSize: 13, color: "#666", fontWeight: 500 }}>
                Índice de Masa Corporal
              </div>
              <div style={{ fontSize: 12, color: imcData.color, fontWeight: 600 }}>
                {imcData.text}
              </div>
            </div>
            <span style={{ fontSize: 26, fontWeight: 800, color: "#6e8a4f" }}>{imc}</span>
          </div>
        )}


        {error && (
          <p style={{ fontSize: 13, color: "#d9534f", textAlign: "center", marginBottom: 8 }}>
            {error}
          </p>
        )}

        {!editando ? (
          <button
            className="btn w-100 mt-2"
            style={{
              background: "#6e8a4f", color: "white",
              borderRadius: 10, padding: "10px",
              fontWeight: 600, border: "none",
            }}
            onClick={() => window.location.href = "/editar-stats"}
          >
            Editar peso y altura
          </button>
        ) : (
          <div className="d-flex gap-2 mt-2">
            <button
              className="btn w-50"
              style={{
                background: "#6e8a4f", color: "white",
                borderRadius: 10, fontWeight: 600, border: "none",
              }}
              onClick={handleGuardar}
              disabled={guardando}
            >
              {guardando ? "Guardando…" : "Guardar"}
            </button>
            <button
              className="btn w-50"
              style={{
                background: "#f0f0f0", color: "#555",
                borderRadius: 10, fontWeight: 600, border: "none",
              }}
              onClick={() => { setEditando(false); setError(""); }}
              disabled={guardando}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;
