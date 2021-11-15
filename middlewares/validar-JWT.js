const {response, request} = require('express');
const jwt                 = require('jsonwebtoken');

const validarJWT = async (req = request, res = response, next) => {
    
    const token = req.header('x-auth-token');
    
    if(!token) {
        return res.status(401).json({
            msg : "No existe el token"
        })
    }
    try {
        //me entrega el id del usuario que se logeo, este id es el de la bd en mongobd
        const {uid} = jwt.verify(token, process.env.SECRETKEY);
        req.usuario = uid;
        next();

    } catch (error) {
      return res.json({
            msg:"existio un error JWT"
        })
    }
}

module.exports = {
    validarJWT
};