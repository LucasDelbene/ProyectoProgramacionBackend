//IMPORTO Router DE express PARA PODER UTILIZARLO//
import {Router} from 'express';
import getFormulario from '../controller/formularioController.js';

const rutaFormulario = Router();
rutaFormulario.get('/', getFormulario);

export default rutaFormulario;