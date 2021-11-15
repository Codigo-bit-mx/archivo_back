const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const ArchivoSchema = Schema({
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
    },
    dueño: {
        type: String
    },
    referencia: {
        type: String
    },
    nombre:{
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    borrado: {
        type: Date
    }
});

module.exports = model('Archivo', ArchivoSchema); 