//DESERIALIZAR USUARIO//

//REALIZO LAS IMPORTACIONES//
import passport from 'passport';
import UserModel from '../dataBase/models/user.js';

//FUNCION PARA DESERIALIZAR USUARIO//
const deserializeUser = ()=>{
    passport.deserializeUser(async (id,done)=>{
        try{
            const user = await UserModel.findById(id);
            done(null,user);
        }catch(error){
            done(error);
        }
    });
}
export default deserializeUser;