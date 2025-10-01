# musicaApp_React_Final

🎵 Music App

Aplicación web para gestionar canciones, subir portadas y usuarios. Cuenta con registro, login con JWT y listado de canciones protegidas por autenticación.

📂 Estructura del proyecto
musicapp/
│
├─ backend/          # Servidor Node.js + Express
│  ├─ controllers/
│  ├─ routes/
│  ├─ security/
│  ├─ uploads/       # Portadas subidas
│  ├─ app.js
│  ├─ package.json
│  └─ .env
│
├─ frontend/         # Cliente React
│  ├─ src/
│  │   ├─ components/
│  │   │   ├─ Login.js
│  │   │   ├─ Registro.js
│  │   │   └─ Canciones.js
│  │   ├─ App.js
│  │   └─ index.js
│  ├─ public/
│  └─ package.json
│
└─ README.md

⚙ Requisitos

Node.js >= 18

npm >= 9

MongoDB en ejecución (local o en Atlas)

🚀 Instalación
1. Clonar repositorio
git clone https://github.com/tu-usuario/musicapp.git
cd musicapp

2. Configurar Backend
cd backend


Instalar dependencias:

npm install


Crear archivo .env con las variables de entorno:

PORT=3000
MONGO_URI=<tu_uri_de_mongodb>
JWT_SECRET=<una_clave_secreta_para_jwt>


Iniciar servidor:

npm start


El backend escuchará en http://localhost:3000.

3. Configurar Frontend
cd ../frontend


Instalar dependencias:

npm install


Iniciar aplicación React:

npm start


El frontend abrirá http://localhost:5173 (o el puerto que indique Vite/React).

📝 Uso

Abrir la aplicación en el navegador (http://localhost:5173 o según tu configuración).

Registrar un usuario nuevo en la sección Crear Cuenta.

Iniciar sesión con el usuario creado.

Subir canciones desde el dashboard de Canciones.

Editar, eliminar o visualizar canciones con portadas.

🔒 Autenticación

Se utiliza JWT para proteger las rutas de canciones.

El token se almacena en localStorage tras iniciar sesión.

Todas las peticiones a /api/canciones requieren el header:

Authorization: Bearer <token>

📁 Carpetas importantes

backend/uploads → guarda las portadas de canciones.

frontend/src/components → componentes React (Login, Registro, Canciones).

backend/security → middleware de verificación de JWT.

🛠 Tecnologías

Node.js + Express

MongoDB + Mongoose

React + React Router DOM

JWT para autenticación

Multer para subida de archivos

CSS para estilos de componentes

⚠ Notas

Asegúrate de tener MongoDB corriendo antes de iniciar el backend.

No compartas tu JWT_SECRET públicamente.

Los tokens expiran según la configuración del backend (puedes ajustar expiresIn en jsonwebtoken).
