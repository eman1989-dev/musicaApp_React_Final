const Cancion = require('../models/cancion');
const Usuario = require('../models/usuario');
const fs = require('fs');
const path = require('path');

exports.getCanciones = async (req, res) => {
  try {
    const canciones = await Cancion.find();
    const cancionesUsuario = await Promise.all(
    canciones.map(async (c) => {
    try {
      // Buscar al usuario por ID (c.creador) y seleccionar solo nombre y correo
      const usuario = await Usuario.findById(c.creador).select('nombre correo');
      return {
        ...c.toObject(),        // Convertir el documento de Mongoose a objeto plano JS
        creador: usuario || null // Reemplazar el campo 'creador' con los datos del usuario (o null si no se encontró)
      };
    } catch (error) {
      // En caso de error al buscar usuario, devolvemos la camiseta con 'creador' null
      return {
        ...c.toObject(),
        creador: null
      };
    }
    })
    );
    res.json(cancionesUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

exports.getCancionById = async (req,res) =>{
    try{
        const cancion = await Cancion.findById(req.params.id);
        if(!cancion) return res.status(404).json({error: "Cancion no encontrada"});
        res.json(cancion);
    }catch(error){
        res.status(500).json({error: "Error en el servidor"});
    }
};

exports.createCancion = async (req, res) =>{
    try {
        const { nombre, artista, creador } = req.body;

        // Validar que el creador exista
        const usuario = await Usuario.findById(creador);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario creador no encontrado' });
        }

        // La portada viene de multer
        const portada = req.file ? req.file.filename : null;

        const nuevaCancion = new Cancion({
            nombre,
            artista,
            creador: usuario._id,
            portada,
            votos: [],
            calificacion: 0
        });

        await nuevaCancion.save();

        res.status(201).json({
            mensaje: 'Canción creada con éxito',
            cancion: nuevaCancion
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la canción' });
    }
};

exports.updateCancion = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, artista, creador } = req.body;

        // Buscar la canción por ID
        const cancion = await Cancion.findById(id);
        if (!cancion) return res.status(404).json({ error: 'Canción no encontrada' });

        // Validar el creador si se envía un ID nuevo
        if (creador) {
            const usuario = await Usuario.findById(creador);
            if (!usuario) return res.status(404).json({ error: 'Usuario creador no encontrado' });
            cancion.creador = usuario._id;
        }

        // Actualizar campos si se enviaron
        if (nombre) cancion.nombre = nombre;
        if (artista) cancion.artista = artista;

        // Actualizar portada si se sube una nueva imagen
        if (req.file) {
            // Borrar portada antigua si existe
            if (cancion.portada) {
                const rutaAntigua = path.join(__dirname, '../public/uploads', cancion.portada);
                fs.unlink(rutaAntigua, (err) => {
                    if (err) console.error('Error al borrar portada antigua:', err);
                });
            }
            cancion.portada = req.file.filename;
        }

        await cancion.save();

        res.status(200).json({
            mensaje: 'Canción actualizada con éxito',
            cancion
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la canción' });
    }
};

exports.calificarCancion = async(req,res) =>{
    const id = req.params.id;
    const {calificacion} = req.body;
    try{
        const cancion = Cancion.findById(id);
        if(!cancion) return res.status(404).json({error: "Cancion no encontrada"});
        cancion.calificacion += calificacion;
        await cancion.save();
        return res.json(cancion);
    }catch(err){
        console.error(err);
        res.status(500).json({error: "Error en el servidor"});
    }
};

exports.deleteCancion = async (req,res) =>{
    try{
        const cancionEliminada = await Cancion.findByIdAndDelete(req.params.id);
        if(!cancionEliminada) return res.status(404).json({error: 'Cancion no encontrada'});
        res.json({message: 'Cancion eliminada'});
    }catch(error){
        res.status(500).json({error: 'Error en el servidor'});
    }
};