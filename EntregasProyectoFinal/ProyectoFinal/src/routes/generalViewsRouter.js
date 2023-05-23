//RUTA DE VISTA GENERAL//

//REALIZO LAS IMPORTACIONES//
import {Router} from 'express';
import {homeController, signupController, bienvenidaController, viewFormAddProductController, viewErrorController} from '../controller/generalViewsController.js';

//MIDDLEWARE DE isLogged//
const isLogged = ((peticion,respuesta,next)=>{
    const msgError = `PARA ACCEDER A ESTA URL DEBES INICIAR SESIÓN`
    if(peticion.user){
        next();
    }else{
        return respuesta.render('viewError', {msgError})
    }
});

//RUTAS//
const viewsRouter = Router();
viewsRouter.get('/', homeController);
viewsRouter.get('/signup', signupController);
viewsRouter.get('/bienvenida',isLogged, bienvenidaController);
viewsRouter.get('/formAddProduct',isLogged, viewFormAddProductController);
viewsRouter.get('/error/:msg', viewErrorController);
export default viewsRouter;