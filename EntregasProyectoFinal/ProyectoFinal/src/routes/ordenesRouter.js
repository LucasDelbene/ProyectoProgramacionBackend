//RUTA DE ORDENES//

//REALIZO LAS IMPORTACIONES//
import {Router} from 'express';
import {viewOrdenesController, createOrdenController} from '../controller/ordenesController.js';

//RUTAS//
const ordenesRouter = Router();
ordenesRouter.get('/', viewOrdenesController);
ordenesRouter.post('/', createOrdenController);
export default ordenesRouter;


