//IMPORTO Router DE express PARA PODER UTILIZARLO//
import {Router} from 'express';
import usuarioAcceso from '../controller/usuarioAccesoController.js';

const rutaAccesoPost = Router();
rutaAccesoPost.post('/', usuarioAcceso);

export default rutaAccesoPost;