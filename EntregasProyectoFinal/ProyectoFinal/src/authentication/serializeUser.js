//SERIALIZAR USUARIO//

//IMPORTO passport PARA PODER UTILIZARLO//
import passport from 'passport';

//FUNCION PARA SERIALIZAR USUARIO//
const serializeUser = ()=>{
    passport.serializeUser((user,done)=>{
        const serializedUser ={
            _id: user._id,
            admin: user.admin
        }
        done(null, serializedUser);
    });
}
export default serializeUser;


