const { Int32 } = require('bson');
const {Schema, model} = require('mongoose');

const usuarioSchema = new Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    correo: {type: String, required: true, unique: true},
    telefono: {type: Int32, required: true},
    clave: {type: String, required: true},
    fechaRegistro: {type: Date, default: Date.now}
});

const Usuario = model('Usuario', usuarioSchema);

module.exports = Usuario;