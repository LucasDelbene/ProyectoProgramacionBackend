//REQUIERO mongoose PARA PODER UTILIZARLO//
const {Schema, model} = require('mongoose');

const mensajeSchema = new Schema({
    id: {type: String, required: true},
    autor: {type: Object, required: true},
    texto: {type: Object, required: true}
},{
    versionKey: false 
});

module.exports = model('Mensajes', mensajeSchema);
