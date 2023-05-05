//IMPORTO Router DE express PARA PODER UTILIZARLO//
import {Router} from 'express';
//IMPORTO Usuario.js DESDE LA CARPETA models//
import usuarioModel from '../models/Usuario.js';

const ruta = Router();

//CREO LA RUTA PRINCIPAL CON METODO post//
ruta.post('/registro', async(peticion,respuesta)=>{
    const {nombre,apellido,email,contraseña} = peticion.body; //EXTRAIGO LOS DATOS DEL FORMULARIO, LA CUAL LOS OBTENGO DE peticion.body
    
    //CUANDO RECIBA LA INFORMACION, LO PRIMERO ES VALIDAR SI TIENE ESA INFORMACION
    if(!nombre || !email || !contraseña) return respuesta.status(400).send({estado:'ERROR', mensaje:'Valores Incompletos'}) //SI NO ME LLEGO EL NOMBRE, EMAIL o CONTRASEÑA, ENTONCES RETORNO respuesta.status(400) CON ESTADO 'error' y MENSAJE 'Valores Incompletos' 
    
    //PARA LA ESTRATEGIA DE REGISTRO, SIEMPRE VAMOS A CORROBORAR PRIMERO QUE EXISTA
    const existencia = await usuarioModel.findOne({email}) 
    if(existencia) return respuesta.status(400).send({estado:'error', mensaje:'Usuario ya Existente'}); //SI EXISTE ESE USUARIO, RETORNO respuesta.status(400) CON ESTADO 'error' y MENSAJE 'Usuario ya Existente'

    //CREO APARTIR DE LOS DATOS YA PASADOS DEL FORMULARIO//
    const resultado = await usuarioModel.create({
        nombre,
        apellido,
        email,
        contraseña
    })
    respuesta.send({estado:'Exitoso', payload:resultado});
})

//CUANDO HAGAN UN POST EN LOGIN NECESITO QUE SIGA UNA ESTRATEGIA DIFERENTE//
ruta.post('/login', async(peticion,respuesta)=>{
    const {email,contraseña} = peticion.body; //EXTRAIGO LOS DATOS DE EMAIL y CONTRASEÑA DEL FORMULARIO, LA CUAL LOS OBTENGO DE peticion.body

    //CUANDO RECIBA LA INFORMACION, LO PRIMERO ES VALIDAR SI TIENE ESA INFORMACION
    if(!email || !contraseña) return respuesta.status(400).send({estado:'ERROR', mensaje:'Valores Incompletos'}) //SI NO ME LLEGO EL NOMBRE, EMAIL o CONTRASEÑA, ENTONCES RETORNO respuesta.status(400) CON ESTADO 'error' y MENSAJE 'Valores Incompletos'

    //LE PIDO A usuarioModel QUE ENCUENTRE A UN USUARIO QUE TENGA EXACTAMENTE EL MISMO EMAIL y CONTRASEÑA QUE ME ESTAN ENVIANDO PORQUE SINO, NO VA A CUMPLIR//
    const usuario = await usuarioModel.findOne({email,contraseña});
    if(!usuario) return respuesta.status(400).send({estado:'ERROR', mensaje:'Email o Contraseña Invalidos'}) //SI NO ME TRAJO NINGUN USUARIO, SIGNIFICA QUE NO COINCIDE EL EMAIL o CONTRASEÑA 
   
    peticion.session.usuario ={ //EN EL CASO DE QUE SI LO HAYA ENCONTRADO, PONGO peticion.session.usuario EN DONDE INICIALIZO LA SESION
        id: usuario._id,
        email: usuario.email,
        rol: usuario.rol
    }
    respuesta.send({estado:'Exitoso', mensaje:'Logueado con Exito'})
})

export default ruta;