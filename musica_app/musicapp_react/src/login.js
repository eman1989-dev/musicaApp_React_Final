import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login(props) {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const navigate = useNavigate();

  const manejarSubmit = async (evento) => {
    evento.preventDefault();

    const datos = { correo, clave };

    try {
      const resp = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const resultado = await resp.json();

      if (resp.ok) {
        const tokenRecibido = resultado.token;
        localStorage.setItem("token", tokenRecibido);

        if (props.onLoginSuccess) props.onLoginSuccess(tokenRecibido);

        navigate("/canciones"); // redirigir a canciones
      } else {
        alert("Error de credenciales: " + (resultado.error || "intente de nuevo"));
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Ocurrió un error al conectar con el servidor");
    }
  };

  return (
    <div className="login">
      <form onSubmit={manejarSubmit}>
        <h2>Iniciar Sesión</h2>
        <div>
          <label>Correo:</label><br />
          <input type="email" value={correo} onChange={e => setCorreo(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña:</label><br />
          <input type="password" value={clave} onChange={e => setClave(e.target.value)} required />
        </div>
        <button type="submit">Ingresar</button>
        <button type="button" onClick={() => navigate("/registro")}>
          Crear una cuenta
        </button>
      </form>
    </div>
  );
}

export default Login;


