//SIGNUP DE USUARIO//

//REALIZO LAS IMPORTACIONES//
import passport from 'passport';
import sendEmail from '../utils/nodemailerGmail.js';
import {createHash} from '../utils/utils.js';
import {Strategy as LocalStrategy} from 'passport-local';
import UserModel from '../dataBase/models/user.js';

//FUNCION DE SIGNUP DE USUARIO//
const signup = ()=>{
    passport.use('signup', new LocalStrategy({
        passReqToCallback: true //OBTENGO TODA LA PETICION
    }, async(peticion, username, password, done)=>{
        try{
            const user = await UserModel.findOne({username});
            if(user){
                return done(null,false);
            }

            const nuevoUsuario = new UserModel();
            nuevoUsuario.username = username;
            nuevoUsuario.password = createHash(password);
            nuevoUsuario.email = peticion.body.email;
            nuevoUsuario.telefono = peticion.body.tel;
            nuevoUsuario.edad = peticion.body.edad;
            nuevoUsuario.direccion = peticion.body.direccion;
            nuevoUsuario.foto = peticion.file.filename;
            nuevoUsuario.carrito = [];
            nuevoUsuario.admin = false;

            const emailOpciones ={
                from: 'coderhouse@gmail.com',
                to: 'lucasdelbene14@gmail.com',
                subject: 'NUEVO REGISTRO',
                html:`
                    <h3>Nuevo Registro de Usuario</h3>
                    <p>Datos: </p>
                    <ul>
                    <li>Nombre: ${nuevoUsuario.username}</li>
                    <li>Email: ${nuevoUsuario.email}</li>
                    <li>Teléfono: ${nuevoUsuario.telefono}</li>
                    <li>Edad: ${nuevoUsuario.edad}</li>
                    <li>Dirección: ${nuevoUsuario.direccion}</li>
                    </ul>
                `
            };

            const usuarioGuardado = await nuevoUsuario.save();
            const email = await sendEmail(emailOpciones);
            return done(null, usuarioGuardado);
        }
        catch(error){
            done(error);
        }
    }));
}
export default signup;