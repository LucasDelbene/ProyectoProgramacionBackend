//RUTA DE VISTA GENERAL//

//IMPORTO Router DE express PARA PODER UTILIZARLO//
import {Router} from 'express';

//IMPORTO LAS FUNCIONES DE VISTA GENERAL PARA PODER UTILIZARLAS//
import {inicioController, registroController, bienvenidaController, formularioAgregarProductoController, verErrorController} from '../controller/vistaGeneralController.js';


const rutaVistaGeneral = Router();

//MIDDLEWARE DE REGISTRADO//
const registrado = ((peticion,respuesta,next)=>{
    let mensajeError = 'PARA ACCEDER A ESTA URL DEBES INICIAR SESION'
    if(peticion.usuario){
        next();
    }else{
        return respuesta.render('verError',{mensajeError})
    }
});

rutaVistaGeneral.get('/', inicioController);
rutaVistaGeneral.get('/registro', registroController);
rutaVistaGeneral.get('/bienvenida', registrado, bienvenidaController);
rutaVistaGeneral.get('/formularioAgregarProducto',registrado, formularioAgregarProductoController);
rutaVistaGeneral.get('/error/:msg', verErrorController);
export default rutaVistaGeneral;