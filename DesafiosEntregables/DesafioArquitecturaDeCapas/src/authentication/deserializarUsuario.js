//AUTENTICACION DE DESERIALIZAR USUARIO//

//IMPORTO passport y usuarioModel PARA PODER UTILIZARLOS//
import passport from 'passport';
import usuarioModel from '../dataBase/models/usuario.js';

//FUNCION DE DESERIALIZAR USUARIO//
const deserializarUsuario = ()=>{
    passport.deserializeUser(async(id,done)=>{
        try{
            const usuario = await usuarioModel.findById(id);
            done(null,usuario);
        }catch(error){
            console.log(error);
        }
    });
}
export default deserializarUsuario;