import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import '../../styles/citaPreviaSabado.css';
import Carrusel from "./Carrusel";
import { useTranslation } from 'react-i18next';

const API = import.meta.env.VITE_API_URL;

export default function CitaPreviaSabado() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState("");
  const [horasDisponibles, setHorasDisponibles] = useState(["10:00", "12:00"]);
  const [sabadosOcupados, setSabadosOcupados] = useState([]);

  const TODAS_LAS_HORAS = ["10:00", "12:00"];

 const obtenerHorasDisponibles = async (fechaISO) => {
  try {
    const response = await axios.get(`${API}/citaPreviaSabado?fecha=${fechaISO}`);
    
    const horasOcupadas = response.data;
    
    const disponibles = TODAS_LAS_HORAS.filter(h => !horasOcupadas.includes(h));
    setHorasDisponibles(disponibles);

    if (disponibles.length === 0) {
      setSabadosOcupados((prev) => [...new Set([...prev, fechaISO])]);
    }
  } catch (error) {
    console.error("Error al obtener citas:", error);
    setHorasDisponibles(TODAS_LAS_HORAS);
  }
};


  const handleDateChange = (selectedDate) => {
    if (selectedDate.getDay() !== 6) {
      alert(t("please_select_saturday"));
      return;
    }

    setFecha(selectedDate);
    setHora("");
    const fechaISO = selectedDate.toLocaleDateString('sv-SE');
    obtenerHorasDisponibles(fechaISO);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fecha || !hora) return;

    navigate("/datos-sabado", {
      state: {
        fecha: fecha.toLocaleDateString('sv-SE'),
        hora,
      },
    });
  };

  return (
    <>
      <Carrusel />
      <div className="cita-container">
        <h2>{t('select_appointment')}</h2>
        <h3>{t('only_saturdays')}</h3>
        <h3>{t('week_contact')}</h3>

        <form className="formulario-citas-sabado" onSubmit={handleSubmit}>
          <Calendar
            onChange={handleDateChange}
            value={fecha}
            tileClassName={({ date }) => {
              const fechaISO = date.toLocaleDateString('sv-SE');
              if (sabadosOcupados.includes(fechaISO)) return "sabado-ocupado";
              if (date.getDay() === 6) return "sabado-activo";
              return null;
            }}
            tileDisabled={({ date }) => {
              const hoy = new Date();
              hoy.setHours(0, 0, 0, 0);

              const esSabado = date.getDay() === 6;
              const fechaISO = date.toLocaleDateString('sv-SE');
              const estaOcupado = sabadosOcupados.includes(fechaISO);

              return date < hoy || !esSabado || estaOcupado;
            }}
            formatMonthYear={(locale, date) =>
              date.toLocaleDateString(locale, { month: "long", year: "numeric" }).toUpperCase()
            }
          />

          {fecha && (
            <div className="horas-disponibles">
              {TODAS_LAS_HORAS.map((horaItem) => {
                const disponible = horasDisponibles.includes(horaItem);
                return (
                  <div
                    key={horaItem}
                    className={`hora-item ${disponible ? 'disponible' : 'ocupada'} ${hora === horaItem ? 'seleccionada' : ''}`}
                    onClick={() => disponible && setHora(horaItem)}
                  >
                    <span className="hora-texto">🕒 {horaItem}</span>
                    <span className={`estado ${disponible ? 'verde' : 'gris'}`}>
                      {disponible ? t('available') : t('unavailable')}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <p>{t('selected_date')} {fecha ? fecha.toDateString() : t("please_select_saturday")}</p>
          <p>{t('selected_time')} {hora || ""}</p>

          <button type="submit" disabled={!fecha || !hora}>{t('book_appointment')}</button>
        </form>
      </div>
    </>
  );
}
