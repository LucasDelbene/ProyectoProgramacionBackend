const {Router} = require("express");
const {getDataInicio} = require('../controller/inicioController');

const rutaInicio = Router();
rutaInicio.get('/', getDataInicio);

module.exports = rutaInicio;