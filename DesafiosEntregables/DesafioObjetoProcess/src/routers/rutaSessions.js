//IMPORTO Router, passport, usersService y crearHash/validateContraseña PARA PODER UTILIZARLOS//
import {Router} from 'express';
import passport from 'passport';
import {usuariosService} from '../dao/index.js';
import {crearHash, validarContraseña} from '../utils.js';
import jwt from 'jsonwebtoken';

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

//CREO UNA RUTA ALTERNATIVA LLAMADA logintoken//
router.post('/logintoken', async(peticion,respuesta)=>{ 
    //ESTA RUTA VA A RECIBIR EL email y password DE peticion.body
    const {email,password} = peticion.body;          
    const user = await usuariosService.getBy({email}); 
    
    //SI NO EXISTE user, RETORNO UN ERROR CON respuesta.status(400) CON EL MENSAJE DE 'Credenciales Invalidas'
    if(!user) return respuesta.status(400).send({status:"ERROR",error:"Credenciales Invalidas"})

    //VALIDACION DE CONTRASEÑA//
    const validacionContraseña = await validarContraseña(password,user.password);
    if(!validacionContraseña) return respuesta.status(400).send({status:"ERROR",error:"Contraseña Incorrecta"})

    //INFORMACION DEL USUARIO QUE QUIERO TOKENIZAR//
    const tokenizarUsuario ={
        name: `${user.nombre} ${user.apellido}`,
        rol: user.rol,
        id: user._id
    }

    //CREO EL TOKEN//
    const token = jwt.sign(tokenizarUsuario,'ClaveSecretaQueNadieVea',{expiresIn:'1d'}) //CON jwt.sing, FIRMO EN ESTE TOKEN LA SIGUIENTE INFORMACION

    //ACA ES EN DONDE YO DECIDO COMO SE LO VOY A ENVIAR 
    respuesta.send({status:'EXITOSO',message:'LOGUEADO CON EXITO!',token})
})

//CREO UNA RUTA CURRENT, PARA QUE CUANDO YO QUIERA VER MI PERFIL POR EJEMPLO//
router.get('/current', (peticion,respuesta)=>{
    const {token} = peticion.query;

    const user = jwt.verify(token,'ClaveSecretaQueNadieVea') //TRATO DE OBTENER EL USUARIO, EN DONDE TAMBIEN VERIFICO EL TOKEN QUE ME ACABAN DE MANDAR, APARTIR DEL SECRET
    console.log(user);
    respuesta.send({status:'EXITOSO',payload:user});
})

//CREO LA RUTA GITHUB, EN DONDE ESTE ENDPOINT VA A SERVIR PARA QUE YO SOLICITE A GITHUB LOS DATOS POR PRIMERA VEZ y UNA VEZ QUE SE SOLICITEN VA A PASAR LA INFORMACION AL PASSPORT//
router.get('/github', passport.authenticate('github'), (peticion,respuesta)=>{}) //LE PIDO A ROUTER (MEDIANTE EL METODO GET) QUE LLAME A LA RUTA '/github' y ESO VA A TRATAR DE AUNTENTICARSE CON LA ESTRATEGIA DE 'github'

//CREO LA RUTA GITHUB CALLBACK, EN DONDE CUANDO YO YA TENGA QUE ENVIAR LA INFORMACION, TIENE QUE ENTRAR POR UN GITHUB CALLBACK//
router.get('/githubcallback', passport.authenticate('github'), (peticion,respuesta)=>{ //AQUI ES EN DONDE SE VA A VOLVER A LLAMAR LA INFORMACION y SE VUELVE A AUTENTICARSE CON GITHUB, EN DONDE ACA SI ME VA A LLEGAR LA peticion.user
    const user = peticion.user;
    peticion.session.user = {
        id: user._id,
        email:user.email,
        rol:user.rol
    }
    respuesta.send({status:"EXITOSO",message:"LOGUEADO CON EXITO!"})
}) 

export default router;