const { request, response } = require('express');
const Usuario               = require('../../models/userModel');
const bycript               = require('bcryptjs');
const generacionJWT         = require('../../helpers/generacion-jwt');

const login = async (req = request, res = response) => {
    
const {email, password} = req.body;

  try{
    const usuario = await Usuario.findOne({email});
    if(!usuario) {
        return res.status(400).json({
            msg: "Usuario o password incorrectos"
        });
    }
    if(usuario.estado === 'false'){
        return res.status(400).json({
            msg: "El usuario no existe"
        });
    }
//   compara la contraseña
    const validarPassword = bycript.compareSync(password, usuario.password);
    if(!validarPassword){
        return res.status(400).json({
            msg: "El password es incorrecto"
        });
    }

    const token = await generacionJWT(usuario.id);
    res.status(200).json({
        usuario,
        token
    })

    }catch(err){
        res.json({
        msg: "ocurrio algo con este endpoint comunicate con el admin"
    });    
    }
}


const googleIN = async(req, res) => {

    const {nombre, img, email} = req.body;
    
    try {
        let usuario = await Usuario.findOne({email});
        if(!usuario) {
            let datos = {
               nombre,
               password:"123",
               email,
               img,
               google: true
            }

        usuario = new Usuario(datos);
        await usuario.save();
        }

        if(usuario.estado === false) {
            res.status(400).json({
                msg: 'El usuario no existe'
            });
        }

        //generame un token valido 
        const token = await generacionJWT(usuario.id);
        res.status(200).json({
            token,
            usuario
        });

    } catch (error) {
        res.status(400).json({
            msg: "El ingreso con google tiene un error contacta al adm"
        });
    }
}

module.exports = {
    login,
    googleIN
}