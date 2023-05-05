//REQUIERO express y getFormulario PARA PODER UTILIZARLOS//
const {Router} = require('express');
const {getFormulario} = require('../controller/formularioController.js');

const rutaFormulario = Router();
rutaFormulario.get('/', getFormulario);

module.exports = rutaFormulario;