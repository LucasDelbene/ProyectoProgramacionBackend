//EN ESTE ARCHIVO configuracionPassport.js, VAN A ESTAR TODAS LAS ESTRATEGIAS QUE NECESITE//

//IMPORTO passport, passport-local, usuariosService, validarContraseña PARA PODER UTILIZARLOS//
import passport from 'passport';
import local from 'passport-local';
import {usuariosService} from '../dao/index.js';
import {validarContraseña} from '../utils.js';

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