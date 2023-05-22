//RUTA DE USUARIO//

//REALIZO LAS IMPORTACIONES//
import {Router} from 'express';
import login from '../authentication/login.js';
import signup from '../authentication/signup.js';
import serializeUser from '../authentication/serializeUser.js';
import deserializeUser from '../authentication/deserializeUser.js';
import passport from 'passport';
import {signupFormController, loginFormController, logoutController, profileController} from '../controller/userController.js';

//UTILIZO MULTER//
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (peticion,file,cb)=>{
        cb(null, './public/avatar')
    },
    filename: (peticion,file,cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});
const subir = multer({storage});

//CONFIGURACION DE AUTENTICACIÓN//
login();
signup();
serializeUser();
deserializeUser();
const loginRouter = Router();
const signupRouter = Router();
const logoutRouter = Router();
const profileRouter = Router();

//RUTA DE LOGIN//
loginRouter.get('/', loginFormController);
loginRouter.post('/', passport.authenticate('login',{ 
    successRedirect: '/bienvenida',
    failureRedirect: '/error/ERROR AL INICIAR SESION',
    failureFlash:true
}));

//RUTA DE SIGNUP//
signupRouter.get('/', signupFormController);
signupRouter.post('/', subir.single('avatar'), passport.authenticate('signup',{
    successRedirect: '/',
    failureRedirect: '/error/ERROR AL CREAR LA CUENTA',
    failureFlash:true
}));

//RUTA DE PROFILE//
profileRouter.get('/', profileController);

//RUTA DE LOGOUT//
logoutRouter.get('/', logoutController);

export {signupRouter, loginRouter, logoutRouter, profileRouter};