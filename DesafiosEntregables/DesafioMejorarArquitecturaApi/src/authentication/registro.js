//AUTENTICACION DE REGISTRO//

//REALIZO LAS IMPORTACIONES PARA PODER UTILIZARLAS//
import passport from 'passport';
import sendEmail from '../utils/nodemailerEmail.js';
import dotenv from 'dotenv';
dotenv.config();
import LocalStrategy from 'passport-local';
import usuarioModel from '../dataBase/models/usuario.js';
import {createHash} from '../utils/utils.js';

//FUNCION DE REGISTRO//
const registro = ()=>{
    passport.use('registro', new LocalStrategy({
        //CONFIGURACION PARA OBTENER TODA LA PETICION//
        passReqToCallback: true
    },async(peticion,username,contraseña,done)=>{
        try{
            const usuario = await usuarioModel.findOne({username});
            if(usuario){
                return done(null,false);
            }

            const nuevoUsuario = new usuarioModel();
            nuevoUsuario.username = username;
            nuevoUsuario.contraseña = createHash(contraseña);
            nuevoUsuario.email = peticion.body.email;
            nuevoUsuario.telefono = peticion.body.telefono;
            nuevoUsuario.edad = peticion.body.edad;
            nuevoUsuario.direccion = peticion.body.direccion;
            nuevoUsuario.foto = peticion.file.filename;
            nuevoUsuario.carrito = [];
            nuevoUsuario.admin = false;

            const opcionesEmail = {
                from: 'coderhouse@gmail.com',
                to: 'lucasdelbene14@gmail.com',
                subject: `Nuevo Registro`,
                html: `
                    <h3>Nuevo Registro de Usuario</h3>
                    <p> DATOS:</p>
                    <ul>
                    <li> NOMBRE: ${nuevoUsuario.username}</li>
                    <li> EMAIL: ${nuevoUsuario.email}</li>
                    <li> TELEFONO: ${nuevoUsuario.telefono}</li>
                    <li> EDAD: ${nuevoUsuario.edad}</li>
                    <li> DIRECCION: ${nuevoUsuario.direccion}</li>
                    </ul>
                `
            };

            const usuarioGuardado = await nuevoUsuario.save();

            const email = await sendEmail(opcionesEmail);

            return done(null,usuarioGuardado);
        }
        catch(error){
            console.log(error);
        }
    }));
}

export default registro;