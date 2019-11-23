const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var becaSchema = Schema({
    nombre: { type: String, required: true },
    fundacion: { type: String, required: true },
    tipo: { type: String, enum: ['completa', 'parcial', 'matricula', 'residencia', 'transporte'], required: true },
    descripcion: String
}, {collection: 'Beca'});

module.exports = mongoose.model("beca", becaSchema);