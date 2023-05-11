//AUTENTICACION DE LOGIN//

//IMPORTO passport, passport-local, usuarioModel y isValidPassword PARA PODER UTILIZARLOS//
import passport from 'passport';
import {LocalStrategy} from 'passport-local';
import usuarioModel from '../dataBase/models/usuario.js';
import {isValidPassword} from '../utils/utils.js';

//FUNCION DE LOGIN//
const login = ()=>{
    passport.use('login', new LocalStrategy({
        //CONFIGURACION PARA OBTENER TODA LA PETICION//
        passReqToCallback: true
    },async(peticion,username,contraseña,done)=>{
        try{
            const usuario = await usuarioModel.findOne({username});
            if(!usuario){
                return done(null,false);
            }
            if(!isValidPassword(usuario.contraseña,contraseña)){
                return done(null,false);
            }
            return done(null,usuario);
        }
        catch(error){
            console.log(error);
        }
    }));
}
export default login;