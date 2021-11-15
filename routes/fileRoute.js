const {Router}      = require('express');
//controler
const {upload, 
       deleteFile, 
       obtenerFile} = require('../controllers/upload/uploadController');
//midle
const { validarJWT }    = require('../middlewares/validar-JWT');
// const {validarCampos}   = require('../middlewares/validar-campos');

const router = new Router();

router.get('/',
  validarJWT,  
  obtenerFile
);

router.post('/', 
  validarJWT,
  upload
);                  

router.put('/:id', 
  validarJWT,
deleteFile);


module.exports = router;