import { useState } from "react";
import '../../styles/contacto.css';
import Carrusel from './Carrusel';
import { useTranslation } from 'react-i18next';

const API = import.meta.env.VITE_API_URL;

export default function Contacto() {
  const { t } = useTranslation();
  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
    aceptaProteccionDatos: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatos((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!datos.aceptaProteccionDatos) {
      alert("Debes aceptar la política de protección de datos.");
      return;
    }

    try {
      await fetch(`${API}/contacto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });
      alert(t('message_sent'));
    } catch (error) {
      console.error("Error enviando mensaje de contacto:", error);
      alert(t('error_sending_message'));
    }
  };

  return (
    <>
      <Carrusel />

      <div className="contenedor-pagina">
        <div className="mapa-con-texto">
          <div className="direccion">
            <h3>Segundo Rey. Rúa das Hedras, 25. Parque Empresarial NovoMilladoiro.</h3>
            <h3>15895 - Milladoiro - Santiago de Compostela (A Coruña)</h3>
          </div>
          <div className="mapa">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5850.076645964219!2d-8.58513992362078!3d42.85092397115158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2f0207d03921df%3A0x9357a1568e6cd825!2sSegundo%20Rey%20S.L.!5e0!3m2!1ses!2ses!4v1748245756270!5m2!1ses!2ses"
              width="600"
              height="450"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Segundo Rey"
            ></iframe>
          </div>
        </div>

        <div className="contenedor-contacto">
          <h2>{t('contact_form')}</h2>
          <h3>{t('contact_form_explanation')}</h3>
          <form onSubmit={handleSubmit} className="formulario-generico">
            <label>{t('label_name')}</label>
            <input type="text" name="nombre" onChange={handleChange} required />

            <label>{t('label_email')}</label>
            <input type="email" name="correo" onChange={handleChange} required />

            <label>{t('label_phone')}</label>
            <input type="tel" name="telefono" onChange={handleChange} />

            <label>{t('label_message')}</label>
            <textarea name="mensaje" onChange={handleChange}></textarea>

            <div className="checkbox-proteccion-datos">
              <label className="input-privacidad">
                <input
                  type="checkbox"
                  name="aceptaProteccionDatos"
                  checked={datos.aceptaProteccionDatos}
                  onChange={handleChange}
                  required
                />
                Acepto la{" "}
                <a href="/politica-privacidad" target="_blank" rel="noopener noreferrer">
                  {t("privacy_title")}
                </a>.
              </label>
            </div>

            <button type="submit">{t('send')}</button>
          </form>
        </div>
      </div>
    </>
  );
}
