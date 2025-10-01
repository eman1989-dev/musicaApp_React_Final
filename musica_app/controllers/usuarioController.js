const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async(req,res) =>{
    try{
        const {correo, clave} = req.body;

        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(401).json({error: 'Credenciales invalidas'});
        }

        const passwordOk = await bcrypt.compare(clave, usuario.clave);
        if(!passwordOk){
            return res.status(401).json({error: 'Credenciales invalidas'});
        }

        const datosToken = {id: usuario._id};
        const secret = process.env.JWT_SECRET;
        const opciones = {expiresIn: '1h'};
        const token = jwt.sign(datosToken, secret, opciones);

        res.json({token});
    }catch(error){
        res.status(500).json({error: 'Error en el servidor'});
    }  
};

exports.getUsuarios = async(req,res) =>{
    try{
        const usuarios = await Usuario.find();
        res.json(usuarios);
    }catch(error){
        res.status(500).json({error: 'Error en el servidor'});
    }
};

exports.getUsuarioById = async(req,res) =>{
    try{
        const usuario = await Usuario.findById(req.params.id);
        if(!usuario) return res.status(404).json({error: 'Usuario no encontrado'});
        res.json(usuario);
    }catch(error){
        res.status(500).json({error: 'Error en el servidor'});
    }
};

exports.createUsuario = async(req,res) =>{
    try{
        const {nombre,apellido,correo,telefono,clave} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(clave, salt);
        const nuevoUsuario = new Usuario({nombre,apellido,correo,telefono,clave: hash});
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    }catch(error){
        console.error(error);
        res.status(400).json({error: 'Error al crear usuario'});
    }
};

exports.updateUsuario = async(req,res) =>{
    try{
        const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id,req.body,{new: true});
        if(!usuarioActualizado) return res.status(404).json({error: 'Usuario no encontrado'});
        res.json(usuarioActualizado);
    }catch(error){
        res.status(400).json({error: 'Error al actualizar usuario'});
    }
};

exports.deleteUsuario = async(req,res) =>{
    try{
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
        if(!usuarioEliminado) return res.status(404).json({error: 'Usuario no encontrado'});
        res.json(usuarioEliminado);
    }catch(error){
        res.status(500).json({error: 'Error del servidor'});
    }
};
