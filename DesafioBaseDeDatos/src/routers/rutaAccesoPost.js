const {Router} = require("express");
const {accesoUsuario} = require('../controller/accesoUsuarioController');

const rutaAccesoPost = Router();
rutaAccesoPost.post('/', accesoUsuario);

module.exports = rutaAccesoPost;