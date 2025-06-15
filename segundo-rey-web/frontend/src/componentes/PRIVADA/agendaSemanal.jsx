import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../../styles/privada.agendaSemanal.css";

const API = import.meta.env.VITE_API_URL;
const horas = ["10:00", "11:00", "12:00", "13:00", "16:00", "17:00", "18:00", "19:00"];

export default function AgendaSemanal() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fechaParam = searchParams.get("fecha");
  const fechaBase = fechaParam ? new Date(fechaParam) : new Date();
  const vendedor = searchParams.get("vendedor");

  const [vendedorNombre, setVendedorNombre] = useState("");
  const [citas, setCitas] = useState([]);
  const [vacaciones, setVacaciones] = useState([]);

  const generarDiasHabilesDelMes = (baseDate) => {
    const dias = [];
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const inicioMes = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
    const finMes = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0);

    for (let i = 0; i <= finMes.getDate() - inicioMes.getDate(); i++) {
      const fecha = new Date(inicioMes);
      fecha.setDate(inicioMes.getDate() + i);
      fecha.setHours(0, 0, 0, 0);

      if (fecha >= hoy && fecha.getDay() >= 1 && fecha.getDay() <= 5) {
        dias.push(new Date(fecha));
      }
    }

    return dias;
  };

  const diasMes = generarDiasHabilesDelMes(fechaBase);

  const cargarCitas = () => {
    if (diasMes.length === 0) return;

    const desde = diasMes[0].toISOString().split("T")[0];
    const hasta = diasMes[diasMes.length - 1].toISOString().split("T")[0];

    axios
      .get(`${API}/citas?vendedor_id=${vendedor}&desde=${desde}&hasta=${hasta}`)
      .then((res) => setCitas(res.data))
      .catch((err) => console.error("Error al cargar citas:", err));
  };

  useEffect(() => {
    if (!searchParams.get("fecha")) {
      navigate(`/citas?fecha=${new Date().toISOString().split("T")[0]}`);
    }
  }, [searchParams]);

  useEffect(() => {
    if (vendedor) {
      axios
        .get(`${API}/vendedores/${vendedor}`)
        .then((res) => setVendedorNombre(res.data?.nombre || ""))
        .catch((err) => console.error("Error obteniendo vendedor:", err));
    }
  }, [vendedor]);

  useEffect(() => {
    if (vendedor) cargarCitas();
  }, [vendedor, JSON.stringify(diasMes)]);

  useEffect(() => {
    if (vendedor) {
      axios
        .get(`${API}/vacaciones`)
        .then((res) => setVacaciones(res.data))
        .catch((err) => console.error("Error cargando vacaciones:", err));
    }
  }, [vendedor]);

  useEffect(() => {
    if (location.state?.nuevaCitaAgendada) {
      cargarCitas();
      window.history.replaceState({}, document.title, location.pathname + location.search);
    }
  }, [location.state]);

  const estaDeVacaciones = (fecha) => {
    const fechaActual = new Date(fecha);
    fechaActual.setHours(0, 0, 0, 0);
    return vacaciones.some((v) => {
      if (String(v.vendedor_id) !== String(vendedor)) return false;
      const inicio = new Date(v.fecha_inicio);
      const fin = new Date(v.fecha_fin);
      inicio.setHours(0, 0, 0, 0);
      fin.setHours(0, 0, 0, 0);
      return fechaActual >= inicio && fechaActual <= fin;
    });
  };

  const esFuturo = (fecha, hora) => {
    const fechaHora = new Date(fecha);
    const [h, m] = hora.split(":");
    fechaHora.setHours(+h, +m, 0, 0);
    return fechaHora > new Date();
  };

  const agendar = (fecha, hora) => {
    if (!fecha) return;
    navigate("/formulario-cita", {
      state: {
        fecha: fecha.toISOString().split("T")[0],
        hora,
        vendedor,
      },
    });
  };

  const editarCita = async (cita) => {
    const nuevaObs = prompt("Editar nota:", cita.observaciones, cita.telefono);
    if (nuevaObs === null) return;

    try {
      await axios.put(`${API}/citas/${cita.id}`, {
        ...cita,
        observaciones: nuevaObs,
      });
      setCitas(citas.map((c) => (c.id === cita.id ? { ...c, observaciones: nuevaObs } : c)));
    } catch (err) {
      console.error("Error al editar cita:", err);
    }
  };

  const cancelarCita = async (cita) => {
    const confirmar = window.confirm("¿Deseas cancelar esta cita?");
    if (!confirmar) return;

    try {
      await axios.delete(`${API}/citas/${cita.id}`);
      setCitas(citas.filter((c) => c.id !== cita.id));
    } catch (err) {
      console.error("Error al cancelar cita:", err);
    }
  };

  return (
    <div className="cita-container">
      <h2>Agenda semanal para {vendedorNombre}</h2>
      <div className="tabla-wrapper">
        <table className="tabla-semanal">
          <thead>
            <tr>
              <th>Hora</th>
              {diasMes.map((fecha, index) => (
                <th key={index}>{fecha.toLocaleDateString()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horas.map((hora, i) => (
              <tr key={i}>
                <td className="hora-col">{hora}</td>
                {diasMes.map((fecha, j) => {
                  const cita = citas.find((c) => {
                    const fechaCitaStr = new Date(c.fecha).toISOString().split("T")[0];
                    const fechaStr = fecha.toISOString().split("T")[0];
                    return fechaCitaStr === fechaStr && c.hora === hora;
                  });

                  const vacacionesHoy = estaDeVacaciones(fecha);
                  const esPasado = !esFuturo(fecha, hora);

                  return (
                    <td key={j}>
                      {cita ? (
                        <div className="reservado" onClick={() => editarCita(cita)}>
                          <div className="cita-info">
                            <div>{cita.nombre || "Sin nombre"}</div>
                            <div>{cita.telefono || "Sin datos"}</div>
                            <button
                              className="cancelar-cita"
                              onClick={(e) => {
                                e.stopPropagation();
                                cancelarCita(cita);
                              }}
                            >
                              ❌
                            </button>
                          </div>
                        </div>
                      ) : vacacionesHoy ? (
                        <span className="vacaciones">Vacaciones</span>
                      ) : esPasado ? (
                        <span className="pasado">-</span>
                      ) : (
                        <button className="btn-agendar" onClick={() => agendar(fecha, hora)}>
                          Libre
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="btn-volver" onClick={() => navigate("/agenda")}>
        Volver a la agenda
      </button>
    </div>
  );
}
