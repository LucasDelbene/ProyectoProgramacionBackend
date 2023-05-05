//REQUIERO express y usuarioAcceso PARA PODER UTILIZARLOS//
const {Router} = require('express');
const {usuarioAcceso} = require('../controller/usuarioAccesoController.js');

const rutaAccesoPost = Router();
rutaAccesoPost.post('/', usuarioAcceso);

module.exports = rutaAccesoPost;