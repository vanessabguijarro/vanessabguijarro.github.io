import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import '../../styles/privada.vacaciones.css';
import { useLocation, useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL;

export default function Vacaciones({ onVacacionesGuardadas }) {
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");
  const [vacacionesActuales, setVacacionesActuales] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const vendedor = queryParams.get("vendedor");
  const [vendedorNombre, setVendedorNombre] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (vendedor) {
      axios.get(`${API}/vacaciones`)
        .then(res => {
          const delVendedor = res.data.filter(v => String(v.vendedor_id) === String(vendedor));
          setVacacionesActuales(delVendedor);
        })
        .catch(err => console.error("Error al cargar vacaciones", err));
    }
  }, [vendedor]);

  useEffect(() => {
    if (vendedor) {
      axios.get(`${API}/vendedores/${vendedor}`)
        .then(res => setVendedorNombre(res.data?.nombre || ""))
        .catch(err => console.error("Error obteniendo vendedor:", err));
    }
  }, [vendedor]);

  const guardarVacaciones = async () => {
    if (!inicio || !fin) {
      alert("Selecciona fechas válidas.");
      return;
    }

    try {
      await axios.post(`${API}/vacaciones`, {
        vendedor_id: vendedor,
        fecha_inicio: format(new Date(`${inicio}T00:00`), 'yyyy-MM-dd'),
        fecha_fin: format(new Date(`${fin}T00:00`), 'yyyy-MM-dd'),
      });

      const nueva = {
        vendedor_id: vendedor,
        fecha_inicio: format(new Date(`${inicio}T00:00`), 'yyyy-MM-dd'),
        fecha_fin: format(new Date(`${fin}T00:00`), 'yyyy-MM-dd'),
      };

      setVacacionesActuales(prev => [...prev, nueva]);

      if (onVacacionesGuardadas) {
        onVacacionesGuardadas([nueva]);
      }

      alert("Vacaciones guardadas correctamente");
    } catch (err) {
      console.error("Error guardando vacaciones", err);
      alert("Hubo un error al guardar las vacaciones");
    }
  };

  const eliminarVacacion = async (id) => {
    const confirmar = window.confirm(`¿Eliminar este periodo de vacaciones?`);
    if (!confirmar) return;

    try {
      await axios.delete(`${API}/vacaciones/${id}`);

      setVacacionesActuales(prev => prev.filter(v => v.id !== id));
      alert("Vacación eliminada correctamente");
    } catch (err) {
      console.error("Error eliminando vacación", err);
      alert("No se pudo eliminar la vacación");
    }
  };

  return (
    <div className="formulario-generico">
      <h2>Gestiona tus vacaciones {vendedorNombre}</h2>

      <label>Fecha de inicio:</label>
      <input type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} />
      <label>Fecha de fin:</label>
      <input type="date" value={fin} onChange={(e) => setFin(e.target.value)} />
      <button className="guarda_vacaciones" onClick={guardarVacaciones}>Guardar vacaciones</button>

      {vacacionesActuales.length > 0 && (
        <div>
          <h3>Vacaciones actuales:</h3>
          <ul>
            {vacacionesActuales.map((v, i) => (
              <li key={i}>
                {v.fecha_inicio} → {v.fecha_fin}{" "}
                <button className="btn-eliminar" onClick={() => eliminarVacacion(v.id)}>
                  ❌ Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="btn-volver" onClick={() => navigate('/agenda')}>
        Volver a la agenda
      </button>
    </div>
  );
}
