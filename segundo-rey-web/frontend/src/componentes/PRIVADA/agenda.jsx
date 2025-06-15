import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../styles/privada.agenda.css';

const API = import.meta.env.VITE_API_URL;

export default function AgendaPrincipal() {
  const [vendedorId, setVendedorId] = useState("");
  const [vendedores, setVendedores] = useState([]);
  const [vacaciones, setVacaciones] = useState([]);
  const [citas, setCitas] = useState([]);
  const navigate = useNavigate();
  const hoy = new Date();
  const location = useLocation();

  useEffect(() => {
    axios.get(`${API}/vendedores`)
      .then(res => setVendedores(res.data))
      .catch(err => console.error("Error cargando vendedores:", err));
  }, []);

  useEffect(() => {
    axios.get(`${API}/vacaciones`)
      .then(res => setVacaciones(res.data))
      .catch(err => console.error("Error cargando vacaciones:", err));
  }, []);

  useEffect(() => {
    if (vendedorId) {
      axios
        .get(`${API}/citas?vendedor_id=${vendedorId}`)
        .then(res => setCitas(res.data))
        .catch(err => console.error(err));
    }
  }, [vendedorId, location.key]);

  const estaDeVacaciones = (fecha) => {
    const fechaActual = new Date(fecha);
    fechaActual.setHours(0, 0, 0, 0);

    return vacaciones.some(v => {
      if (String(v.vendedor_id) !== String(vendedorId)) return false;

      const inicio = new Date(`${v.fecha_inicio}T00:00`);
      const fin = new Date(`${v.fecha_fin}T00:00`);
      inicio.setHours(0, 0, 0, 0);
      fin.setHours(0, 0, 0, 0);

      return fechaActual >= inicio && fechaActual <= fin;
    });
  };

  const handleDayClick = (date) => {
    if (vendedorId) {
      const fechaStr = date.toISOString().split("T")[0];
      navigate(`/citas?fecha=${fechaStr}&vendedor=${vendedorId}`);
    } else {
      alert("Selecciona un vendedor primero");
    }
  };

  return (
    <div className="cita-container">
      <h2>Agenda mensual</h2>

      <label>Selecciona Vendedor:</label>
      <select
        value={vendedorId}
        onChange={(e) => setVendedorId(e.target.value)}
        required
      >
        <option value="">Selecciona uno</option>
        {vendedores.map(v => (
          <option key={v.id} value={v.id}>{v.nombre}</option>
        ))}
      </select>

      <Calendar
        value={hoy}
        onClickDay={handleDayClick}
        tileDisabled={({ date }) =>
          date.getDay() === 0 ||
          date.getDay() === 6 ||
          date < hoy ||
          estaDeVacaciones(date)
        }
      />

      <button
        className="vacaciones"
        disabled={!vendedorId}
        onClick={() => navigate(`/vacaciones?vendedor=${vendedorId}`)}
      >
        Selecciona tus vacaciones
      </button>
    </div>
  );
}
