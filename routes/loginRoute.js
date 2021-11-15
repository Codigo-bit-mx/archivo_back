const { Router }                     = require ('express');
const { check }                      = require('express-validator');
const { login, googleIN }            = require('../controllers/auth/authController');
const { obtenerUsuario, newUsuario } = require('../controllers/user/userController');
const { validarJWT }                 = require('../middlewares/validar-JWT');
const {validarCampos}                = require('../middlewares/validar-campos');
const router = Router();

 router.get('/user', 
   validarJWT,
   obtenerUsuario);
 
 router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password esta vacio').not().isEmpty(),
    validarCampos
 ], login);

 router.post('/google', googleIN);

 router.post('/newuser', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password esta vacio').not().isEmpty(),
    validarCampos
 ], newUsuario);


 module.exports = router;

 