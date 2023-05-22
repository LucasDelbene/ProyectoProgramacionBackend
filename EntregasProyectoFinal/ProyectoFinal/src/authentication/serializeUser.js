//SERIALIZAR USUARIO//

//IMPORTO passport PARA PODER UTILIZARLO//
import passport from 'passport';

//FUNCION PARA SERIALIZAR USUARIO//
const serializeUser = ()=>{
    passport.serializeUser((user,done)=>{
        done(null, user._id);
    });
}
export default serializeUser;