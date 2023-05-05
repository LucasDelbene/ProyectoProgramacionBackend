//REQUIERO mongoose PARA PODER UTILIZARLO//
const mongoose = require('mongoose');

//CONEXION A MongoDB//
const URL = 'mongodb://127.0.0.1:27017/MocksNormalizacion';
const connection = mongoose.connect(URL, {
    useNewUrlParser: true
});

module.exports = connection;