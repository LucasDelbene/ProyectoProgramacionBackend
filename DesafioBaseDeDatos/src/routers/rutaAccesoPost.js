const {Router} = require("express");
const {accesoUsuario} = require('../controller/accesoUsuarioController.js');

const rutaAccesoPost = Router();
rutaAccesoPost.post('/', accesoUsuario);

module.exports = rutaAccesoPost;