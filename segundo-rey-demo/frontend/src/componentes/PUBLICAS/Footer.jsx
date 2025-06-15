import { Link } from "react-router-dom";
import imagen1 from "../../assets/xunta/CO300G-460x295.jpg";
import imagen2 from "../../assets/xunta/IG240-460x295.jpg";
import imagen3 from "../../assets/xunta/TR342C-460x295.jpg";
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from "react";

export default function Footer() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);

  // Ocultar después de 5 segundos al cargar la página
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {visible && (
        <div className="footer-container">
          <footer className="datosTienda" onClick={() => setVisible(false)}>
            <div>
              Segundo Rey. Rúa das Hedras, 25. Parque Empresarial NovoMilladoiro. 15895 - Milladoiro - Santiago de Compostela (A Coruña)
            </div>
            <div>
              <a href="/contacto">{t('contact')}</a>
              <a href="/aviso-legal">{t('legal_notice')}</a>
            </div>
            <div className="datosLocalizacionHorario">
              <div>{t('opening hours')}</div>
              <div>{t('saturday')}<Link to="/citaPreviaSabado">{t('prior_appointment')}</Link></div>
            </div>
            <div className="mencionesXunta">
              <ul>
                <li><img src={imagen1} alt="subvencionModernización" /></li>
                <li><img src={imagen2} alt="ayudaDigitalizacion" /></li>
                <li><img src={imagen3} alt="programaIncentivos" /></li>
              </ul>
            </div>
          </footer>
        </div>
      )}

      {!visible && (
        <button className="boton-flotante" onClick={() => setVisible(true)}>
          ⇡⇡
        </button>
      )}
    </>
  );
}
