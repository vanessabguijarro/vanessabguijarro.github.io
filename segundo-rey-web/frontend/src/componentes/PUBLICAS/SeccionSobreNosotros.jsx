import Carrusel from './Carrusel';
import '../../styles/seccionSobreNosotros.css';
import { useTranslation } from 'react-i18next';

export default function SeccionSobreNosotros() {
  const { t } = useTranslation();
  return (
    <>
      <Carrusel />

      <div className="sobre-nosotros-container">
        <section className="intro">
          <p>
            {t('explanation')}
          </p>
        </section>

        <section className="filosofia-grid">
          <div className="filosofia-card">
            <h3>{t('titulo_creativity')}</h3>
            <p>{t('creativity')}</p>
          </div>
          <div className="filosofia-card">
            <h3>{t('titulo_experience')}</h3>
            <p>{t('experience')}</p>
          </div>
          <div className="filosofia-card">
            <h3>{t('titulo_qualification')}</h3>
            <p>{t('qualification')}</p>
          </div>
          <div className="filosofia-card">
            <h3>{t('titulo_variety')}</h3>
            <p>{t('variety')}</p>
          </div>
          <div className="filosofia-card">
            <h3>{t('titulo_innovation')}</h3>
            <p>{t('innovation')}</p>
          </div>
          <div className="filosofia-card">
            <h3>{t('titulo_3D')}</h3>
            <p>{t('3D')}</p>
          </div>
        </section>
      </div>

      
    </>
  );
}
