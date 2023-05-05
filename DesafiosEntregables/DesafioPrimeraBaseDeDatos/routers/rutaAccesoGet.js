//REQUIERO express y getAcceso PARA PODER UTILIZARLOS//
const {Router} = require('express');
const {getAcceso} = require('../controller/accesoController.js');

const rutaAccesoGet = Router();
rutaAccesoGet.get('/', getAcceso);

module.exports = rutaAccesoGet;