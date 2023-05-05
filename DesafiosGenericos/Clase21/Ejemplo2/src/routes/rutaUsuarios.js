//IMPORTO Router DE express PARA PODER UTILIZARLO//
import {Router} from 'express';
const ruta = Router();

//IMPORTO generarUsuario() DESDE EL ARCHIVO utils.js PARA PODER UTILIZARLO//
import {generarUsuario} from '../utils.js'

ruta.get('/', (peticion, respuesta)=>{
    respuesta.send({status:'success', payload:[]})
})

ruta.get('/mock', (peticion, respuesta)=>{
    //GENERO 100 USUARIOS CON DATOS ALEATORIOS CON faker//
    const usuarios = [];
    for(let i=0; i<100; i++){
        usuarios.push(generarUsuario());
    }
    respuesta.send({status:"success", payload:usuarios});
})



export default ruta;