//IMPORTO Router DE express PARA PODER UTILIZARLO//
import {Router} from 'express';

const router = Router();

//RUTA PRINCIPAL//
router.get('/',(peticion,respuesta)=>{
    respuesta.render('index')
})

//RUTA FORMULARIO PRODUCTOS//
router.get('/formulario',(peticion,respuesta)=>{
    respuesta.render('formularioProductos')
})

//RUTAS ACCESO AL CHAT//
router.get('/acceso',(peticion,respuesta)=>{
    respuesta.render('acceso')
})
router.post('/acceso',(peticion,respuesta)=>{
    respuesta.render('chat')
    //const {nombreUsuario} = peticion.body;
    //return respuesta.redirect(`/chat?nombreUsuario=${nombreUsuario}`);
})

//RUTA REGISTRO//
router.get('/registro',(peticion,respuesta)=>{
    respuesta.render('registro');
})

//RUTA LOGIN//
router.get('/login',(peticion,respuesta)=>{
    respuesta.render('login');
})

export default router;