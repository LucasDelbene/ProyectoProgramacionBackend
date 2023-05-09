//AUTENTICACION DE SERIALIZAR USUARIO//

//IMPORTO passport PARA PODER UTILIZARLO//
import passport from 'passport';

//FUNCION DE SERIALIZAR USUARIO//
const serializarUsuario = ()=>{
    passport.serializeUser((usuario,done)=>{
        done(null,usuario._id);
    });
}
export default serializarUsuario;