//IMPORTO Router DE express PARA PODER UTILIZARLO//
const {Router} = require('express');
const {getFormulario} = require('../controller/formularioController.js');

const rutaFormulario = Router();
rutaFormulario.get('/', getFormulario);

module.exports = rutaFormulario;