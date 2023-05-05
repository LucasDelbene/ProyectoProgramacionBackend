//REQUIERO LAS OPCIONES DE CONEXION DE MongoDB PARA PODER UTILIZARLO//
const mongoDB = require ('../db/options/mongoDB.js')

//REQUIERO Mensajes Model PARA PODER UTILIZARLO//
const mensajeModel = require('../db/models/mensaje.js')

//REQUIERO EL Contenedor Mensaje PARA PODER UTILIZARLO//
const ContenedorMensaje = require('../db/contenedor/ContenedorMensaje.js')

class MensajeDAOMongoDB extends ContenedorMensaje {
    constructor() {
        super(mongoDB,mensajeModel);
    };
};

module.exports = MensajeDAOMongoDB;