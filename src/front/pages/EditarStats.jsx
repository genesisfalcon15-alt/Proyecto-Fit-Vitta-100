import React, { useEffect, useState } from "react";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const EditarStats = () => {
  const [form, setForm] = useState({ peso: "", altura: "", genero: "" });
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { window.location.href = "/signin"; return; }

    fetch(`${BACKEND}/api/private`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setForm({
          peso: data.user.stats?.peso ?? "",
          altura: data.user.stats?.altura ?? "",
          genero: data.user.genero ?? "",
        });
      })
      .catch(() => setError("Error al cargar los datos."))
      .finally(() => setCargando(false));
  }, []);

  const handleGuardar = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setError("");
    const token = localStorage.getItem("token");

    try {
      const [resStats, resProfile] = await Promise.all([
        fetch(`${BACKEND}/api/user/stats`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ peso: parseFloat(form.peso), altura: parseFloat(form.altura) }),
        }),
        fetch(`${BACKEND}/api/user/profile`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ genero: form.genero }),
        }),
      ]);
      if (!resStats.ok || !resProfile.ok) throw new Error();
      window.location.href = "/perfil";
    } catch {
      setError("Error al guardar. Inténtalo de nuevo.");
    } finally {
      setGuardando(false);
    }
  };

  const bg = { background: "linear-gradient(135deg, #6e8a4f, #a3b18a)" };

  if (cargando) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={bg}>
        <div className="text-center text-white">
          <div className="spinner-border mb-2" role="status" />
          <p style={{ fontWeight: 600 }}>Cargando…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={bg}>
      <div
        className="shadow-lg p-4"
        style={{ width: "420px", borderRadius: "20px", backgroundColor: "#fff" }}
      >

        <div className="text-center mb-3">
          <h2 style={{ fontWeight: 700, color: "#3b3b3b" }}>📏 Editar Stats</h2>
          <p style={{ fontSize: 14, color: "#777" }}>Actualiza tu peso y altura</p>
        </div>

        <form onSubmit={handleGuardar}>

          <div className="mb-3">
            <label style={{ fontSize: 13, color: "#555", fontWeight: 500, marginBottom: 4, display: "block" }}>
              ⚖️ Peso (kg)
            </label>
            <input
              className="form-control"
              type="number"
              placeholder="Ej: 70"
              value={form.peso}
              onChange={(e) => setForm({ ...form, peso: e.target.value })}
              style={{ borderRadius: "10px" }}
              required
            />
          </div>


          <div className="mb-3">
            <label style={{ fontSize: 13, color: "#555", fontWeight: 500, marginBottom: 4, display: "block" }}>
              📏 Altura (cm)
            </label>
            <input
              className="form-control"
              type="number"
              placeholder="Ej: 175"
              value={form.altura}
              onChange={(e) => setForm({ ...form, altura: e.target.value })}
              style={{ borderRadius: "10px" }}
              required
            />
          </div>


          <div className="mb-3">
            <label style={{ fontSize: 13, color: "#555", fontWeight: 500, marginBottom: 4, display: "block" }}>
              ⚧ Género
            </label>
            <select
              className="form-control"
              value={form.genero}
              onChange={(e) => setForm({ ...form, genero: e.target.value })}
              style={{ borderRadius: "10px", color: form.genero ? "#3b3b3b" : "#888" }}
              required
            >
              <option value="">Selecciona género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>


          {error && (
            <p style={{ fontSize: 13, color: "#d9534f", textAlign: "center", marginBottom: 8 }}>
              {error}
            </p>
          )}


          <div className="d-flex gap-2 mt-2">
            <button
              type="submit"
              className="btn w-50"
              style={{
                background: "#6e8a4f", color: "white",
                borderRadius: 10, fontWeight: 600, border: "none", padding: "10px",
              }}
              disabled={guardando}
            >
              {guardando ? "Guardando…" : "Guardar"}
            </button>
            <button
              type="button"
              className="btn w-50"
              style={{
                background: "#f0f0f0", color: "#555",
                borderRadius: 10, fontWeight: 600, border: "none", padding: "10px",
              }}
              onClick={() => window.location.href = "/perfil"}
              disabled={guardando}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarStats;
