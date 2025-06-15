import { useTranslation } from 'react-i18next';
import Carrusel from './Carrusel';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Carrusel />

      <section style={{ padding: "2rem", textAlign: "center", backgroundColor:"white", color:"black"}}>
        <h2 className="titulo" style={{ fontSize: "2rem", marginBottom: "2.5rem" }}>
          {t('empresa.titulo', 'Bienvenidos a Nuestra Empresa')}
        </h2>
        <p className="descripcion" style={{ maxWidth: "800px", margin: "0 auto", fontSize: "1.3rem", lineHeight: "1.6" }}>
          {t(
            'empresa.descripcion',
            'Somos una empresa dedicada a ofrecer soluciones integrales de alta calidad en baño. Contamos con 40 años de experiencia en el sector y un equipo comprometido con la satisfacción del cliente.'

          )}
        </p>
      </section>
    </>
  );
}

