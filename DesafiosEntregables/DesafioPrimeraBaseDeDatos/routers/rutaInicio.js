//REQUIERO express y getDataInicio PARA PODER UTILIZARLOS//
const {Router} = require('express');
const {getDataInicio} = require('../controller/inicioController.js');

const rutaInicio = Router();
rutaInicio.get('/', getDataInicio);

module.exports = rutaInicio;