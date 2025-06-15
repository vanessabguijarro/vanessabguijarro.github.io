import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function FormularioCita() {
  const location = useLocation();
  const navigate = useNavigate();
  const { fecha, hora, vendedor } = location.state || {};

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!observaciones.trim()) {
      alert("Debes ingresar una nota u observación.");
      return;
    }

    try {
      await axios.post(`${API}/agenda`, {
        vendedor_id: vendedor,
        fecha,
        hora,
        nombre,
        email,
        telefono,
        observaciones,
      });

      await axios.post(`${API}/enviar-confirmacion`, {
  nombre,
  email,
  fecha,
  hora,
  vendedor_id: vendedor
});

      /* await axios.post(`${API}/enviar-confirmacion`, {
        nombre,
        email,
        fecha,
        hora,
      }); */

      alert("Cita agendada correctamente");

      navigate(`/citas?fecha=${fecha}&vendedor=${vendedor}`, {
        state: { nuevaCitaAgendada: true },
      });
    } catch (err) {
      console.error("Error al agendar cita:", err);
      alert(err.response?.data?.error || "Error al agendar cita");
    }
  };

  return (
    <div className="formulario-cita">
      <h2>Agendar Cita</h2>
      <p><strong>Fecha:</strong> {fecha}</p>
      <p><strong>Hora:</strong> {hora}</p>

      <form className="formulario-generico" onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
        />

        <label>Teléfono:</label>
        <input
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          
        />

        <label>Observaciones:</label>
        <textarea
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          required
        />

        <h5>Son obligatorios el nombre y las observaciones, si se incluye mail el cliente recibe confirmación de cita con observaciones</h5>

        <button type="submit">Confirmar Cita</button>
        <button type="button" onClick={() => navigate(-1)}>Cancelar</button>
      </form>
    </div>
  );
}
