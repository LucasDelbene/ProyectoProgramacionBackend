//IMPORTO Router, passport, usersService y crearHash/validateContraseña PARA PODER UTILIZARLOS//
import {Router} from 'express';
import passport from 'passport';
import {usuariosService} from '../dao/index.js';
import {crearHash, validarContraseña} from '../utils.js';

const router = Router();

//RUTA REGISTRO//
router.post('/registro',async(peticion,respuesta)=>{
    const {nombre,apellido,email,password} = peticion.body;
    if(!nombre||!email||!password) return respuesta.status(400).send({status:"ERROR",error:"Valores Incompletos"});

    const existente  = await usuariosService.getBy({email});
    if(existente) return respuesta.status(400).send({status:"ERROR",error:"Usuario ya Existente"});

    const hashedContraseña = await crearHash(password);
    const resultado = await usuariosService.save({
        nombre,
        apellido,
        email,
        password:hashedContraseña
    })
    respuesta.send({status:"EXITOSO",payload:resultado})
})

//RUTA LOGIN//
router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail',failureMessage:true}) ,async(peticion,respuesta)=>{
    const user = peticion.user;
    peticion.session.user = {
        id: user._id,
        email:user.email,
        rol:user.rol
    }
    respuesta.send({status:"EXITOSO",message:"LOGUEADO CON EXITO!"})
})

//RUTA LOGIN FAIL//
router.get('/loginFail',(peticion,respuesta)=>{
    console.log(peticion.session.messages);
    if(peticion.session.messages.length>4) return respuesta.status(400).send({message:"BLOQUEA LOS INTENTOS AHORA!"})
    respuesta.status(400).send({status:"ERROR",error:"Error de Autenticacion"})
})

export default router;