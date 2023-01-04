const {Router} = require("express");
const {getAcceso} = require('../controller/accesoController');

const rutaAccesoGet = Router();
rutaAccesoGet.get('/', getAcceso);

module.exports = rutaAccesoGet;