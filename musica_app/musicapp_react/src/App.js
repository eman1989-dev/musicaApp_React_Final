// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registro from "./registro";
import Login from "./login";
import Canciones from "./cancion";

function App() {
  const manejarLoginExitoso = (token) => {
    console.log("Token recibido:", token);
    localStorage.setItem("token", token);
  };

  return (
    <Router>
      <Routes>
        {/* Página principal -> Login */}
        <Route
          path="/"
          element={<Login onLoginSuccess={manejarLoginExitoso} />}
        />

        {/* Ruta al registro */}
        <Route path="/registro" element={<Registro />} />

        {/* Ruta a las canciones */}
        <Route path="/canciones" element={<Canciones />} />
      </Routes>
    </Router>
  );
}

export default App;


