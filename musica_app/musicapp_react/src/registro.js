import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registro.css';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [clave, setClave] = useState('');
  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();
    const datos = { nombre, apellido, correo, telefono, clave };

    try {
      const resp = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });

      const resultado = await resp.json();
      if (resp.ok) {
        alert('Usuario registrado con éxito. Ahora puede iniciar sesión.');
        navigate("/"); // volver al login
      } else {
        alert('Error al registrar: ' + (resultado.error || 'Datos inválidos'));
      }
    } catch(error) {
      console.error('Error de conexión:', error);
      alert('No se pudo registrar. Intente más tarde.');
    }
  };

  return (
    <div className="registro">
      <form onSubmit={manejarRegistro}>
        <h2>Crear Cuenta</h2>
        <div>
          <label>Nombre:</label><br/>
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
        </div>
        <div>
          <label>Apellido:</label><br/>
          <input type="text" value={apellido} onChange={e => setApellido(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label><br/>
          <input type="email" value={correo} onChange={e => setCorreo(e.target.value)} required />
        </div>
        <div>
          <label>Numero de telefono:</label><br/>
          <input type="number" value={telefono} onChange={e => setTelefono(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña:</label><br/>
          <input type="password" value={clave} onChange={e => setClave(e.target.value)} required />
        </div>
        <button type="submit">Registrarse</button>
        <button type="button" onClick={() => navigate("/")}>Ir a Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Registro;

