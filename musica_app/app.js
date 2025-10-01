const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const {verificarToken} = require('./security/auth');
const cors = require('cors');
const app = express();

connectDB();
app.use(cors());

app.use(express.json());

app.use('/api/usuarios', require('./routes/usuarios'));

// Rutas de canciones
const cancionesRoutes = require('./routes/canciones');
app.use('/api/canciones', cancionesRoutes);

// Servir archivos estáticos de portadas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/registro', (req,res) =>{
    res.sendFile(path.join(__dirname, 'public', 'registro.html'));
})

app.get('/login', (req,res) =>{
    res.sendFile(path.join(__dirname,'public','login.html'));
})

app.get('/cancion', (req,res) =>{
    res.sendFile(path.join(__dirname,'public','cancion.html'));
})
const PORT = process.env.PORT || 3000;
app.listen(3000,()=>{
    console.log(`Servidor escuchando en http://localhost:3000`);
});

