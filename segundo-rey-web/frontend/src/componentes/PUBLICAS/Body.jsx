import { Routes, Route } from "react-router-dom";
import Navegador from "./navegador";
import Home from "./Home";
import SeccionSobreNosotros from "./SeccionSobreNosotros";
import ObrasSuministradas from "./ObrasSuministradas";
import CitaPreviaSabado from "./CitaPreviaSabado";
import Contacto from "./Contacto";
import AvisoLegal from "./AvisoLegal";
import TrabajaConNosotros from "./TrabajaConNosotros";
import Login from '../PRIVADA/login';
import AgendaCitas from "../PRIVADA/agenda";
import AgendaSemanal from "../PRIVADA/agendaSemanal";
import Vacaciones from "../PRIVADA/vacaciones";
import Marcas from "./Marcas";
import FormularioDatosSabado from "./FormularioDatosSabado";
import FormularioCitaPrivada from "../PRIVADA/formularioCitaPrivada";
import PoliticaCookies from './PoliticaCookies';
import PoliticaPrivacidad from './politica-privacidad';


export default function Body() {
  return (
    <>
      <Navegador />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobreNosotros" element={<SeccionSobreNosotros />} />
        <Route path="/obrasSuministradas" element={<ObrasSuministradas />} />
        <Route path="/citaPreviaSabado" element={<CitaPreviaSabado />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/trabajaConNosotros" element={<TrabajaConNosotros />} />
        <Route path="/login" element={<Login />} />
        <Route path="/agenda" element={<AgendaCitas />} />
        <Route path="/citas" element={<AgendaSemanal />} />
        <Route path="/vacaciones" element={<Vacaciones />} />
        <Route path="/marcas" element={<Marcas />} />
        <Route path="/datos-sabado" element={<FormularioDatosSabado />} />
        <Route path="/formulario-cita" element={<FormularioCitaPrivada/>} />
        <Route path="/politica-cookies" element={<PoliticaCookies />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />

      </Routes>
    </>
  );
}
