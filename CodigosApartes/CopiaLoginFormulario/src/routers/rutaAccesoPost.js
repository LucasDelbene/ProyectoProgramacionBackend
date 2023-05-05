//IMPORTO Router DE express PARA PODER UTILIZARLO//
const {Router} = require('express');
const {usuarioAcceso} = require('../controller/usuarioAccesoController.js');

const rutaAccesoPost = Router();
rutaAccesoPost.post('/', usuarioAcceso);

module.exports = rutaAccesoPost;