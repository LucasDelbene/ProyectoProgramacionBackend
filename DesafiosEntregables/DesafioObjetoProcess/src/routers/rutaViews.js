//IMPORTO Router DE express PARA PODER UTILIZARLO//
import {Router} from 'express';

const router = Router();

//RUTA PRINCIPAL//
router.get('/',(peticion,respuesta)=>{
    respuesta.render('index')
})

//RUTA LOGIN//
router.get('/login',(peticion,respuesta)=>{
    respuesta.render('login');
})

//RUTA REGISTRO//
router.get('/registro',(peticion,respuesta)=>{
    respuesta.render('registro');
})

export default router;