import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../styles/formulario.css';

const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/login`, { usuario, password });

      if (res.data.autorizado) {
        navigate("/agenda");
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <form className="formulario-generico" onSubmit={handleLogin}>
      <h2>Iniciar sesión</h2>
      <input
        type="text"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        placeholder="Usuario"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
