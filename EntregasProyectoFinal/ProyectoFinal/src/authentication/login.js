//LOGIN USUARIO//

//REALIZO LAS IMPORTACIONES//
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import UserModel from '../dataBase/models/user.js';
import {isValidPassword} from '../utils/utils.js';

//FUNCION DE LOGIN DE USUARIO//
const login = ()=>{
    passport.use('login', new LocalStrategy({
        passReqToCallback: true //OBTENGO TODA LA PETICION
    },async(peticion, username, password, done)=>{
        try{
            const user = await UserModel.findOne({username});
            if(!user){
                return done(null,false);
            }
            if(!isValidPassword(user.password, password)){
                return done(null,false);
            }
            return done(null,user);
        }
        catch(error){
            done(error);
        }
    }));
}
export default login;