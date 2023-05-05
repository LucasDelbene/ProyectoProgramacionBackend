//IMPORTO Router DE express PARA PODER UTILIZARLO//
import {Router} from 'express';

const ruta = Router();

//CREO LA RUTA PRINCIPAL CON METODO get//
ruta.get('/registro', (peticion,respuesta)=>{
    respuesta.render('registro'); //RENDERIZO REGISTRO
})

//CREO LA RUTA LOGIN CON METODO get//
ruta.get('/login', (peticion,respuesta)=>{
    respuesta.render('login');
})

export default ruta;