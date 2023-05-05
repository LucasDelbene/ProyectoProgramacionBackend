//IMPORTO Router DE express PARA PODER UTILIZARLO//
const {Router} = require('express');
const {getFaker} = require('../controller/fakerController.js');

const rutaFaker = Router();
rutaFaker.get('/', getFaker);

module.exports = rutaFaker;