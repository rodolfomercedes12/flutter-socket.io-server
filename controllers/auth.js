const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('../helpers/jwt');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async (req, res = response) =>{

    const { email, password } = req.body;

    try{
        //Revisa en la BD si hay un email igual
        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: "El correo ya esta registrado "

            });
        }

        const usuario = new Usuario( req.body );
        
        //Encriptar password

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt );
        
        //Guarda Usuario en la BD
        await usuario.save();

        //Generar JWT

        const token = await generarJWT(usuario.id);
    
        //Respuesta en Json
        res.json({
            ok:true,
            usuario,
            token
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }

   
}

//const login recibe req, res
//{ ok:true, msg: 'Login' }

const login = async ( req, res = response) => {
    const { email, password } = req.body;
   
    try {
        const usuarioDB = await Usuario.findOne({ email});
        if( !usuarioDB ){
            return res.status(404).json({
                ok:false,
                msg: 'Email no encontrado!'
            });
        }

        //Validar password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if( !validPassword ){
            return res.status(400).json({
                ok:false,
                msg: 'La contraseña no es valida'
            });
        }

        //Generar JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok:true,
            usuario: usuarioDB,
            token
        });
        
    } catch (error) {
    console(error);;
        
    return res.status(500).json({
        ok:false,
        msg: 'Hable con el administrador'
    });
        
    }


}


const renewToken = async(req, res = response) => {

    const uid = req.uid;

    const token = await generarJWT( uid );

    const usuario = await  Usuario.findById( uid );

    
    res.json({
        ok:true,
       usuario,
       token
    });
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}