//EN ESTE ARCHIVO configuracionPassport.js, VAN A ESTAR TODAS LAS ESTRATEGIAS QUE NECESITE//

//IMPORTO passport, passport-local, usuariosService, validarContraseña y passport-github2 PARA PODER UTILIZARLOS//
import passport from 'passport';
import local from 'passport-local';
import {usuariosService} from '../dao/index.js';
import {validarContraseña} from '../utils.js';
import GithubStrategy from 'passport-github2';

//ESTRATEGIA LOCAL QUE QUIERO//
const LocalStrategy = local.Strategy;

//COLOCO UNA FUNCION PARA LA INICIALIZACION DE LAS ESTRATEGIAS//
const inicializarEstrategias = () =>{
    //PRIMERO COLOCO EL NOMBRE DE LA ESTRATEGIA (LOGIN) y LUEGO PASO LA ESTRATEGIA PARA INICIALIZAR//
    passport.use('login',new LocalStrategy({usernameField:'email'},async (email,password,done)=>{ //INDICO EN LAS OPCIONES LOCALES, QUE SI NO LE PASO UN NOMBRE DE USUARIO, LE PASO EL EMAIL UTILIZANDO usernameField:'email'
        if(!email||!password) return done(null,false,{message:"Valores incompletos"}) //EN LUGAR DE RETORNAR ERROR, RETORNO LA FUNCION done()
        
        const user = await usuariosService.getBy({email});
        if(!user) return done(null,false,{message:"Credenciales inválidas"})

        const validacionContraseña = await validarContraseña(password,user.password);
        if(!validacionContraseña) return done(null,false,{message:"Contraseña inválida"})

        //SI LLEGO HASTA ACA, ES PORQUE SI TE LOGUEASTE CORRECTAMENTE//
        return done(null,user)
    }))

    //SI QUIERO TRABAJAR CON GITHUB, CREO MI PROPIA ESTRATEGIA//
    passport.use('github', new GithubStrategy({
        //LA CONFIGURACION DE GITHUB, NECESITA 3 ELEMENTOS//
        clientID: 'Iv1.56ff5439013f08b2',                                //IDENTIFICADOR QUE ME DIERON DESDE GITHUB
        clientSecret: '299505a63a3c88063a7cd0f5736f32bcb138e037',        //CODIGO DE SECRETO DE CLIENTE
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback' //URL DE CALLBACK
    }, async(accessToken,refreshToken,profile,done)=>{ //COLOCO LA FUNCION QUE VA A HACER LA VALIDACION GENERAL DE TODOS LOS DATOS, EN DONDE GITHUB ME DEVUELVE DOS TOKENS: accessToken y refreshToken
        console.log(profile);
        const {name,email} = profile._json;
        const user = await usuariosService.getBy({email}); //APARTIR DE usuariosService, QUIERO QUE user TRAIGA AL QUE HAYA ESTADO CON EL EMAIL PRINCIPAL DEL USUARIO 
        
        //A DIFERENCIA DE LOGIN, SI NO EXISTE EL USUARIO NO ME QUEJO, SINO QUE LO CREO//
        try{
            if(!user){
                const nuevoUsuario ={
                    nombre:name,
                    email,
                    password:''
                }
                const resultado = await usuariosService.save(nuevoUsuario);
                return done(null,resultado);
            }
            done(null,user); 
        }catch(error){
            done(error);
        }
    })) 

    //PASSPORT DE MANERA INTERNA, TAMBIEN NOS PIDE DOS CONCEPTOS IMPORTANTES COMO serializeUser() y deserializeUser()//
    passport.serializeUser((user,done)=>{ //BASICAMENTE, LO QUE VA A HACER LA SERIALIZACION DEL USUARIO ES QUE PASSPORT VA A TENER TAMBIEN SU TABLA INTERNA
        done(null,user._id)
    })
    passport.deserializeUser(async(id,done)=>{
        const resultado = await usuariosService.getBy({_id:id})
        done(null,resultado);
    })

}

export default inicializarEstrategias;