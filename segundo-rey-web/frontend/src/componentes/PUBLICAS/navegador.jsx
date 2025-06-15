import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo_segundo_rey.png";
import { useTranslation } from "react-i18next";

export default function Navegador() {
  const { t } = useTranslation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <nav className="navegadorMenu">
      <div className="logo-y-toggle">
    <div className="logo">
      <Link to="/"><img src={logo} alt="Logo" /></Link>
    </div>

    <button
      className="menu-toggle"
      onClick={toggleMenu}
      aria-label="Abrir menú"
    >☰</button>
  </div>

      <ul className={`menuLinks ${menuAbierto ? "active" : ""}`}>
        <li><Link to="/" onClick={() => setMenuAbierto(false)}>{t("home")}</Link></li>
        <li><Link to="/sobreNosotros" onClick={() => setMenuAbierto(false)}>{t("about_us")}</Link></li>
        <li><Link to="/obrasSuministradas" onClick={() => setMenuAbierto(false)}>{t("works_supplied")}</Link></li>
        <li><Link to="/marcas" onClick={() => setMenuAbierto(false)}>{t("logos")}</Link></li>
        <li><Link to="/citaPreviaSabado" onClick={() => setMenuAbierto(false)}>{t("prior_appointment")}</Link></li>
        <li><Link to="/contacto" onClick={() => setMenuAbierto(false)}>{t("contact")}</Link></li>
        <li><Link to="/trabajaConNosotros" onClick={() => setMenuAbierto(false)}>{t("join_us")}</Link></li>
        <li><Link to="/login" onClick={() => setMenuAbierto(false)} style={{ color: "#ff8c00" }}>{t("login")}</Link></li>
      </ul>

    </nav>
  );
}

