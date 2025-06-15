import { useState } from "react";
import Carrusel from "./Carrusel";
import '../../styles/formulario.css';
import '../../styles/seccionTrabajaConNosotros.css';
import '../../styles/privacidad-proteccionDatos.css';
import { useTranslation } from 'react-i18next';
import jsPDF from "jspdf";

const API = import.meta.env.VITE_API_URL;

export default function TrabajaConNosotros() {
  const { t } = useTranslation();
  const [aceptaProteccionDatos, setAceptaProteccionDatos] = useState(false);
  const [mostrarFormularioLegal, setMostrarFormularioLegal] = useState(false);

  const handleProteccionDatosChange = (e) => {
    const checked = e.target.checked;
    setAceptaProteccionDatos(checked);
    setMostrarFormularioLegal(checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!aceptaProteccionDatos) {
      alert(t("privacy_required_alert"));
      return;
    }

    const form = e.target;
    const formData = new FormData(form);

    // Datos del documento
    const ciudad = form.ciudad.value;
    const fecha = form.fecha.value;
    const nombreLegal = form.nombre_legal.value;

    // Traducción y reemplazo dinámico
    const rawText = t('legal_clause', { name: nombreLegal, lng: undefined });
    const doc = new jsPDF();
    const lineas = doc.splitTextToSize(`En ${ciudad}, a ${fecha}\n\n${rawText}`, 180);
    doc.text(lineas, 10, 20);

    const pdfBlob = doc.output("blob");
    const pdfFile = new File([pdfBlob], "acuse_recibo.pdf", { type: "application/pdf" });
    formData.append("acuse_recibo", pdfFile);

    try {
      const res = await fetch(`${API}/trabajaConNosotros`, {
        method: "POST",
        body: formData
      });

      const mensaje = await res.text();
      alert(mensaje);
    } catch (err) {
      alert("Error al enviar el CV");
      console.error(err);
    }
  };

  return (
    <>
      <Carrusel />
      <div className="envio-cv">
        <h2>{t('cv_form')}</h2>
        <h3>{t('cv_explanation')}</h3>

        <form className="formulario-generico" onSubmit={handleSubmit} encType="multipart/form-data">
          <label>{t('label_name')}</label>
          <input type="text" name="nombre" required />

          <label>{t('label_last_name')}</label>
          <input type="text" name="apellidos" required />

          <label>{t('label_email')}</label>
          <input type="email" name="email" required />

          <label>{t('label_phone')}</label>
          <input type="text" name="telefono" required />

          <label>{t('position')}</label>
          <input type="text" name="posicion" required />

          <label>{t('cv_upload')}</label>
          <input type="file" name="cv" accept=".pdf,.doc,.docx" required />

          <div className="checkbox-proteccion-datos">
            <input
              type="checkbox"
              checked={aceptaProteccionDatos}
              onChange={handleProteccionDatosChange}
              required
            />
            <label className="texto-privacidad">
              {t("accept")}{" "}
              <a href="/politica-privacidad" target="_blank" rel="noopener noreferrer">
                {t("privacy_title")}
              </a>.
            </label>
          </div>

          {mostrarFormularioLegal && (
            <div className="formulario-legal">
              <h4>{t("legal_clause_title")}</h4>

              <label>{t("city")}</label>
              <input type="text" name="ciudad" required />

              <label>{t("date")}</label>
              <input type="date" name="fecha" required />

              <label>{t("full_name")}</label>
              <input type="text" name="nombre_legal" required />

              <p>{t("legal_clause_brief")}</p>

              <label>
                <input type="checkbox" name="acepta_clausula" required />
                {t("legal_clause_confirmation")}
              </label>
            </div>
          )}

          <button type="submit">{t('send')}</button>
        </form>
      </div>
    </>
  );
}
