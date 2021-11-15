const { Router } = require('express');
const { check }  = require('express-validator');
const { actualizarUser, actualizarIMG } = require("../controllers/user/userController");
const { validarJWT }                    = require('../middlewares/validar-JWT');
const {validarCampos}                = require('../middlewares/validar-campos');

const router = Router();

router.put('/:id', 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
    actualizarUser);

router.put('/imagen/:id',
    validarJWT,
    actualizarIMG);

module.exports = router;