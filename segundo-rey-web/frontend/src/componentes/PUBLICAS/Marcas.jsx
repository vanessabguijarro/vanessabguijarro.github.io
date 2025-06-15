import React from "react";
import { useTranslation } from 'react-i18next';
import "../../styles/marcas.css"; 
import marazzilogo from "../../assets/marcas/marazzi.png";
import grespanialogo from "../../assets/marcas/grespania.png";
import coverlam from "../../assets/marcas/coverlam.png";
import argenta from "../../assets/marcas/argenta-black.png";
import hansgrohe from "../../assets/marcas/hansgrohe.jpg";
import schluter from "../../assets/marcas/ss_logo.jpg";
import laufen from "../../assets/marcas/laufen.svg";
import cifre from "../../assets/marcas/cifre.png";

import vives from "../../assets/marcas/vives.png";
import natucer from "../../assets/marcas/natucer.svg";
import atlas_concorde from "../../assets/marcas/atlas_concorde.png";
import mosaics from "../../assets/marcas/mosaicsmarti.png";
import hisbalit from "../../assets/marcas/hisbalit.jpg";
import mutina from "../../assets/marcas/mutina.jpg";
import metropol from "../../assets/marcas/metropol.jpg";
import cinca from "../../assets/marcas/cinca-logo.svg";
import duravit from "../../assets/marcas/duravit.png";
import irsap from "../../assets/marcas/irsap.jpg";
import alape from "../../assets/marcas/alape.jpg";
import kaldewei from "../../assets/marcas/kaldewei.png";
import effegibi from "../../assets/marcas/effe.svg";
import grohe from "../../assets/marcas/grohe.jpg";
import tres from "../../assets/marcas/tres.jpg";
import ramonSoler from "../../assets/marcas/ramon-soler.svg";
import gessi from "../../assets/marcas/gessi.png";
import dorn from "../../assets/marcas/dornbracht.png";
import madero from "../../assets/marcas/madero.jpg";
import cosmic from "../../assets/marcas/cosmic.svg";
import lasser from "../../assets/marcas/lasser_verde.jpg";
import spazia from "../../assets/marcas/spazia.png";
import ibermampara from "../../assets/marcas/ibermampara.jpg";
import mapeilogo from "../../assets/marcas/mapei_azul.png"
import rosagres from "../../assets/marcas/Rosa_Gres.png";
import presto from "../../assets/marcas/presto.png";
import geberit from "../../assets/marcas/geberit.jpg";
import jacob from "../../assets/marcas/jacob_delafon.svg";



const marcas = [
  
  { nombre: "Argenta", logo: argenta },
  { nombre: "Cifre", logo: cifre },
  { nombre: "Coverlam", logo: coverlam},
  { nombre: "Grespania", logo: grespanialogo },
  { nombre: "Hansgrohe", logo: hansgrohe },
  { nombre: "Laufen", logo: laufen},
  { nombre: "Marazzi", logo: marazzilogo },
  { nombre: "Schluter", logo: schluter },

  { nombre: "alape", logo: alape },
  { nombre: "atlas_concorde", logo: atlas_concorde },
  { nombre: "cinca", logo: cinca },
  { nombre: "cosmic", logo: cosmic },
  { nombre: "dorn", logo: dorn },
  { nombre: "duravit", logo: duravit },
  { nombre: "effegibi", logo: effegibi },
  { nombre: "geberit", logo: geberit },
  { nombre: "gessi", logo: gessi },
  { nombre: "grohe", logo: grohe },
  { nombre: "hisbalit", logo: hisbalit },
  { nombre: "ibermampara", logo: ibermampara },
  { nombre: "irsap", logo: irsap },
  { nombre: "jacob", logo: jacob },
  { nombre: "kaldewei", logo: kaldewei },
  { nombre: "lasser", logo: lasser },
  { nombre: "madero", logo: madero},
  { nombre: "mapei", logo: mapeilogo },
  { nombre: "metropol", logo: metropol },
  { nombre: "mosaics", logo: mosaics },
  { nombre: "mutina", logo: mutina },
  { nombre: "natucer", logo: natucer },
  { nombre: "presto", logo: presto },
  { nombre: "ramonSoler", logo: ramonSoler },
  { nombre: "rosaGres", logo: rosagres },
  { nombre: "spazia", logo: spazia },
  { nombre: "tres", logo: tres },
  { nombre: "vives", logo: vives }
];

export default function Marcas() {
  const { t } = useTranslation();

  return (
    <div className="marcas-container">
      <h2>{t('brands_colab')}</h2>
      <div className="marcas-grid">
        {marcas.map((marca, index) => (
          <div className="marca-card" key={index}>
            {marca.logo ? (
              <img src={marca.logo} alt={marca.nombre} className="marca-logo" />
            ) : (
              <div className="marca-placeholder">
                <span>{marca.nombre}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
