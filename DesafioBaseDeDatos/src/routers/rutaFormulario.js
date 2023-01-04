const {Router} = require("express");
const {getFormulario} = require('../controller/formularioController');

const rutaFormulario = Router();
rutaFormulario.get('/', getFormulario);

module.exports = rutaFormulario;