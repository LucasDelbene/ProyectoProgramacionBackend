//IMPORTO Router DE express PARA PODER UTILIZARLO//
import {Router} from 'express';

const router = Router();

//RUTA REGISTRO//
router.get('/registro',(peticion,respuesta)=>{
    respuesta.render('registro');
})

//RUTA LOGIN//
router.get('/login',(peticion,respuesta)=>{
    respuesta.render('login');
})

export default router;