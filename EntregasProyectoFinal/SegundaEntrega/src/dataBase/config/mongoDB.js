//REQUIERO mongoose PARA PODER UTILIZARLO//
const mongoose = require('mongoose');

const URL = 'mongodb://127.0.0.1:27017/SegundaEntregaProyectoFinal';
const conexion = mongoose.connect(URL, {useNewUrlParser: true});

module.exports = conexion;