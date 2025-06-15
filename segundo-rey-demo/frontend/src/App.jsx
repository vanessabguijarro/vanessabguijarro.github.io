import './i18n';
import i18n from './i18n';
import { BrowserRouter as Router } from "react-router-dom";
import Body from "./componentes/PUBLICAS/Body";
import Header from "./componentes/PUBLICAS/Header";
import Footer from "./componentes/PUBLICAS/Footer";
import './styles/layout.css';
import Navegador from './componentes/PUBLICAS/navegador';

import CookieConsent from "react-cookie-consent";
import { useEffect } from "react"; // 👈 Asegúrate de importar esto

export default function App() {
  // 👇 Este useEffect hace la redirección automática de HTTP a HTTPS
  useEffect(() => {
    if (window.location.protocol === "http:") {
      window.location.href = window.location.href.replace("http:", "https:");
    }
  }, []);

  return (
    <>
      <Router>
        <Header changeLanguage={i18n.changeLanguage} />
        <Body />
        <Footer />
      </Router>

      <CookieConsent
        location="bottom"
        buttonText="Aceptar"
        cookieName="mi_cookie_consent"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#fff", background: "#f7941d", fontSize: "13px", marginRight: "25px" }}
        expires={150}
      >
        Utilizamos cookies funcionales para mejorar tu experiencia.{" "}
        <a href="/politica-cookies" style={{ color: "#f7941d" }}>
          Leer más
        </a>
      </CookieConsent>
    </>
  );
}
