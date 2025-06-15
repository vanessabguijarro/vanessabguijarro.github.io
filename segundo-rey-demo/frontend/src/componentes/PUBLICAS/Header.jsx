import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

import banderaES from "../../assets/flags/es.svg";
import banderaGL from "../../assets/flags/gl.svg";
import banderaEN from "../../assets/flags/en.svg";
import "../../styles/layout.css";

export default function Header({ changeLanguage }) {
  return (
    <header className="header">
      <div className="header-top">
        <div className="contacto">
          <span>📞 +34 981 53 01 02</span>
          <a href="mailto:info@segundorey.com">
            <span>📧 info@segundorey.com</span>
          </a>

        </div>

        <div className="header-derecha">
          <div className="redes_sociales">
            <a
              href="https://www.facebook.com/p/SEGUNDO-REY-SL-100039882315519/?locale=es_ES"
              target="_blank"
              rel="noopener noreferrer"
              className="facebook"
            >
              <FaFacebook size={24} style={{ marginRight: "10px" }} />
            </a>
            <a
              href="https://www.instagram.com/segundoreysl/"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-icon"
            >
              <FaInstagram size={24} />
            </a>
          </div>

          <div className="flags">
            <img src={banderaES} onClick={() => changeLanguage("es")} alt="Español" />
            <img src={banderaGL} onClick={() => changeLanguage("gl")} alt="Galego" />
            <img src={banderaEN} onClick={() => changeLanguage("en")} alt="English" />
          </div>
        </div>
      </div>
    </header>
  );
}