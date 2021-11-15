const mongoose = require('mongoose');

const dbconexion = async () => {

    try {
        await mongoose.connect( process.env.CONEXION_LOGIN_BD );
        console.log("base de datos en linea")
    } catch (error) {
        console.log(error)
        throw new Error('Succedio un error')
    }
}

module.exports = {
    dbconexion
}