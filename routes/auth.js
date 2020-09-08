//path: api/login


const { Router } = require('express');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos }  = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.post('/new',[ 
    check('nombre','El nombre el obligatorio').not().isEmpty(),
    check('password','La contraseña el obligatoria').not().isEmpty(),
    check('email','El email no es válido').isEmail(),
    validarCampos
], crearUsuario);

router.post('/',[ 
    check('password','La contraseña el obligatoria').not().isEmpty(),
    check('email','El email no es válido').isEmail(),
    validarCampos
], login);

router.get('/renew', validarJWT,renewToken)





module.exports = router;