
import '../../styles/obrasSuministradas.css';
import { Link } from 'react-router-dom';
import Carrusel from './Carrusel';

import Galipizza1 from '../../assets/obrasSuministradas/GALIPIZZA_SANTIAGO_DE_COMPOSTELA_EMAC_PROYECTOS1-1200x900.jpg';
import Galipizza2 from '../../assets/obrasSuministradas/GALIPIZZA_SANTIAGO_DE_COMPOSTELA_EMAC_PROYECTOS2.jpg';
import DStillbar1 from '../../assets/obrasSuministradas/DStillbar_SANTIGO_DE_COMPOSTELA_ESTUDIO_31_v2-1200x900.jpg';
import DStillbar2 from '../../assets/obrasSuministradas/DStillbar_SANTIGO_DE_COMPOSTELA_ESTUDIO_31.jpg';
import CasaAurelio1 from '../../assets/obrasSuministradas/Casa_aurelio__SANTA_COMBA_ESTUDIO_31_v2-1200x900.jpg';
import CasaAurelio2 from '../../assets/obrasSuministradas/Casa_aurelio__SANTA_COMBA_ESTUDIO_31-1200x900.jpg';
import RTropic1 from '../../assets/obrasSuministradas/RESTAURANTE_TROPIC_SANTIAGO_DE_COMPOSTELA_ESTUDIO_31_v2-1200x900.jpg';
import RTropic2 from '../../assets/obrasSuministradas/RESTAURANTE_TROPIC_SANTIAGO_DE_COMPOSTELA_ESTUDIO_31.jpg';
import Liberdade1 from '../../assets/obrasSuministradas/VIVIENDAS_AVD_DA_LIBERDADE__SANTIAGO_DE_COMPOSTELA_SANTIAGO_SUR_GALICIA.jpg';
import Liberdade2 from '../../assets/obrasSuministradas/VIVIENDAS_AVD_DA_LIBERDADE_SANTIAGO_DE_COMPOSTELA_ARIAL.jpg';
import Albergue1 from '../../assets/obrasSuministradas/ALBERGE_KM0_SANTIGO_DE_COMPOSTELA_ESTUDIO_31-1200x900.jpg';
import Altamira from '../../assets/obrasSuministradas/HOTEL_PAZO_DE_ALTAMIRA_SANTIAGO_DE_COMPOSTELA.jpg';
import CasasReais1 from '../../assets/obrasSuministradas/HOTEL_CASAS_REAIS_SANTIAGO_DE_COMPOSTELA_ANDAR_ARQUITECTURA.jpg';

const obras = [
  { nombre: 'DStillbar', img1: DStillbar1, img2: DStillbar2 },
  { nombre: 'Casa Aurelio', img1: CasaAurelio1, img2: CasaAurelio2 },
  { nombre: 'Viviendas Avda. da Liberdade', img1: Liberdade1, img2: Liberdade2 },
  { nombre: 'Galipizza', img1: Galipizza1, img2: Galipizza2 },
  { nombre: 'Hotel Pazo de Altamira', img1: Altamira, img2: Altamira },
  { nombre: 'Restaurante Tropic', img1: RTropic1, img2: RTropic2 },
  { nombre: 'Albergue KM0', img1: Albergue1, img2: Albergue1 },
  { nombre: 'Hotel Casas Reais', img1: CasasReais1, img2: CasasReais1 },
];

export default function ObrasSuministradas() {
  return (
    <>
      <Carrusel />
      <div className="obras-grid">
        {obras.map((obra, index) => (
          <div className="obra-item" key={index}>
            <h3>{obra.nombre}</h3>
            <a href={obra.img2} target="_blank" rel="noopener noreferrer">
              <img src={obra.img1} alt={obra.nombre} />
            </a>
          </div>
        ))}
      </div>
      
    </>
  );
}
