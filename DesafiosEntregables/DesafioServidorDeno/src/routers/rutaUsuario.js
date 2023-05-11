//RUTA DE USUARIOS//

//IMPORTO Router DE express PARA PODER UTILIZARLO//
import {Router} from 'express';

//REALIZO LAS DEMAS IMPORTACIONES//
import login from '../authentication/login.js';
import registro from '../authentication/registro.js';
import serializarUsuario from '../authentication/serializarUsuario.js';
import deserializarUsuario from '../authentication/deserializarUsuario.js';
import passport from 'passport';

//IMPORTO LAS FUNCIONES DE USUARIOS PARA PODER UTILIZARLAS//
import {formularioRegistroController, formularioLoginController, cerrarSesion, perfilUsuario} from '../controller/usuarioController.js';

//UTILIZANDO MULTER//
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (peticion,file,cb)=>{
        cb(null, './public/avatar')
    },
    filename: (peticion,file,cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const subirImagen = multer({storage});

//AUTENTICACION//
login();
registro();
serializarUsuario();
deserializarUsuario();

//RUTAS//
const rutaLogin = Router();
const rutaRegistro = Router();
const rutaCerrarSesion = Router();
const rutaPerfil = Router();

//RUTA DE LOGIN//
rutaLogin.get('/', formularioLoginController);
rutaLogin.post('/', passport.authenticate('login',{ 
    successRedirect: '/bienvenida', 
    failureRedirect: 'ERROR AL INICIAR SESION', 
    failureFlash: true
}));

//RUTA DE REGISTRO//
rutaRegistro.get('/', formularioRegistroController);
rutaRegistro.post('/', subirImagen.single('avatar'), passport.authenticate('registro',{
    successRedirect: '/',
    failureRedirect: 'ERROR AL CREAR LA CUENTA, INGRESE OTRO USUARIO.', 
    failureFlash: true // nos permite enviar mensajes.
}));

//RUTA DE PERFIL DE USUARIO//
rutaPerfil.get('/', perfilUsuario);

//RUTA DE CERRAR SESION//
rutaCerrarSesion.get('/', cerrarSesion);

export default {rutaRegistro, rutaLogin, rutaCerrarSesion, rutaPerfil};