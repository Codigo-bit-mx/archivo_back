const { Schema, model } = require('mongoose');

const AuthSchema = Schema({
   
    email: {
        type: String,
        required: [true, 'El email es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    }
})

module.exports = model('Autenticacion', AuthSchema);