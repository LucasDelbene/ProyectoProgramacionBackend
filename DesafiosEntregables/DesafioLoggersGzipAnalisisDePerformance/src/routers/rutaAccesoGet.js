//IMPORTO Router DE express PARA PODER UTILIZARLO//
import {Router} from 'express';
import getAcceso from '../controller/accesoController.js';

const rutaAccesoGet = Router();
rutaAccesoGet.get('/', getAcceso);

export default rutaAccesoGet;