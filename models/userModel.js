const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        default: '/usuario.jpg'
    },
    bio: {
        type:String,
        default: 'Sin biografia'
    },
    telefono: {
        type: String,
        default: 'Sin telefono'
    },
    cumpleaños: {
        type: String,
        default: 'Sin fecha de cumpleaños'
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    facebook: {
        type: Boolean,
        default: false
    },
    git: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Usuario', UsuarioSchema);