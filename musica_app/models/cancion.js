const {Schema, model, Types} = require('mongoose');

const cancionSchema = new Schema({
    creador: { type: Types.ObjectId, ref: 'Usuario', required: true },
    nombre: String,
    artista: String,
    portada: {type: String},
    fechaCreacion: {type:Date, default: Date.now},
    votos:[],
    calificacion: {type:Number, default:0}
})

const Cancion = model('Cancion', cancionSchema);
module.exports = Cancion;