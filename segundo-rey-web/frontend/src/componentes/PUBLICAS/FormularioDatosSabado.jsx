import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../styles/formulario.css';
import { useTranslation } from 'react-i18next';

const API = import.meta.env.VITE_API_URL;

export default function FormularioDatosSabado() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { fecha, hora } = location.state || {};

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [aceptaProteccionDatos, setAceptaProteccionDatos] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!aceptaProteccionDatos) {
    alert("Debes aceptar la política de protección de datos.");
    return;
  }

  if (!fecha || !hora) {
    alert(t("missing_date_or_time"));
    return;
  }

  try {
    await axios.post(`${API}/datos-sabado`, {
      nombre,
      email,
      telefono,
      observaciones,
      fecha,
      hora,
      aceptaProteccionDatos: true // Guardado explícito en BD
    });

    alert(t("appointment_saved"));
    navigate("/");
  } catch (err) {
    console.error("Error al guardar cita sábado:", err);
    alert(t("error_sending_message"));
  }
};


  return (
    <div className="formulario-generico">
      <h2>{t("appointment_form")}</h2>
      <form onSubmit={handleSubmit}>
        <label>{t("label_name")}</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>{t("label_email")}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>{t("label_phone")}</label>
        <input
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />

        <label>{t("observations")}</label>
        <textarea
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
        />

        <p>{t("selected_date")}: {new Date(fecha).toLocaleDateString()}</p>
        <p>{t("selected_time")}: {hora}</p>

        <div className="checkbox-proteccion-datos">
          <label className="input-privacidad">
            <input
            className="input-privacidad"
              type="checkbox"
              checked={aceptaProteccionDatos}
              onChange={(e) => setAceptaProteccionDatos(e.target.checked)}
              required
            />
            Acepto la{" "}
            <a href="/politica-privacidad" target="_blank" rel="noopener noreferrer">
              {t("privacy_title")}
            </a>.
          </label>
        </div>

        <button type="submit">{t("send")}</button>
      </form>
    </div>
  );
}
