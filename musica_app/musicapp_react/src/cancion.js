import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "./Canciones.css";

function Canciones() {
  const [nombre, setNombre] = useState("");
  const [artista, setArtista] = useState("");
  const [portada, setPortada] = useState(null);
  const [previewPortada, setPreviewPortada] = useState("");
  const [canciones, setCanciones] = useState([]);
  const [editando, setEditando] = useState(false);
  const [cancionId, setCancionId] = useState("");
  const [creador, setCreador] = useState("");

  const API_URL = "http://localhost:3000/api/canciones";
  const token = localStorage.getItem("token");

  // Decodificar usuario creador
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setCreador(decoded.id || decoded._id);
    }
  }, [token]);

  // Cargar canciones
  const cargarCanciones = async () => {
    try {
      const resp = await fetch(API_URL, {
        headers: { Authorization: "Bearer " + token },
      });
      if (!resp.ok) throw new Error("Error al cargar canciones");
      const data = await resp.json();
      setCanciones(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    cargarCanciones();
  }, []);

  // Manejar portada
  const handlePortadaChange = (e) => {
    const file = e.target.files[0];
    setPortada(file);
    if (file) {
      setPreviewPortada(URL.createObjectURL(file));
    } else {
      setPreviewPortada("");
    }
  };

  // Subir o actualizar canción
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("artista", artista);
    formData.append("creador", creador);
    if (portada) formData.append("portada", portada);

    try {
      const url = editando ? `${API_URL}/${cancionId}` : API_URL;
      const method = editando ? "PUT" : "POST";

      const resp = await fetch(url, {
        method,
        body: formData,
        headers: { Authorization: "Bearer " + token },
      });

      if (!resp.ok) throw new Error("Error al guardar canción");

      await resp.json();
      resetForm();
      cargarCanciones();
    } catch (err) {
      console.error(err);
      alert("Hubo un problema al guardar la canción.");
    }
  };

  const resetForm = () => {
    setNombre("");
    setArtista("");
    setPortada(null);
    setPreviewPortada("");
    setEditando(false);
    setCancionId("");
  };

  // Editar canción
  const editarCancion = async (id) => {
    try {
      const resp = await fetch(`${API_URL}/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      const c = await resp.json();
      setNombre(c.nombre);
      setArtista(c.artista);
      setCreador(c.creador?._id || c.creador);
      setCancionId(c._id);
      setEditando(true);
      if (c.portada) {
        setPreviewPortada(`http://localhost:3000/uploads/${c.portada}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Eliminar canción
  const eliminarCancion = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta canción?")) return;
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });
      cargarCanciones();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="canciones">
      <h2>{editando ? "Editar Canción" : "Subir Canción"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre de la canción:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Artista:</label>
        <input
          type="text"
          value={artista}
          onChange={(e) => setArtista(e.target.value)}
          required
        />

        <input type="hidden" value={creador} />

        <label>Portada:</label>
        <input type="file" accept="image/*" onChange={handlePortadaChange} />

        {previewPortada && (
          <img
            src={previewPortada}
            alt="Vista previa"
            id="preview-portada"
            width="100"
          />
        )}

        <button type="submit">
          {editando ? "Actualizar Canción" : "Subir Canción"}
        </button>
        {editando && (
          <button type="button" onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>

      <hr />
      <h3>Canciones Subidas</h3>
      <table className="dataTable">
        <thead>
          <tr>
            <th>Portada</th>
            <th>Nombre</th>
            <th>Artista</th>
            <th>Creador</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {canciones.map((c) => (
            <tr key={c._id}>
              <td>
                {c.portada ? (
                  <img
                    src={`http://localhost:3000/uploads/${c.portada}`}
                    width="50"
                    alt="Portada"
                  />
                ) : (
                  "No hay portada"
                )}
              </td>
              <td>{c.nombre}</td>
              <td>{c.artista}</td>
              <td>
                {typeof c.creador === "object"
                  ? c.creador.nombre || c.creador._id
                  : c.creador}
              </td>
              <td>{new Date(c.fechaCreacion).toLocaleString()}</td>
              <td>
                <button onClick={() => editarCancion(c._id)}>Editar</button>
                <button onClick={() => eliminarCancion(c._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Canciones;
