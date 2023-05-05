//IMPORTO Router DE express PARA PODER UTILIZARLO//
const {Router} = require('express');
const {getDataInicio} = require('../controller/inicioController.js');

const rutaInicio = Router();
rutaInicio.get('/', getDataInicio);

module.exports = rutaInicio;