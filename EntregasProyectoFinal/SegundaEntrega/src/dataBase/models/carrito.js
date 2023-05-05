const {Schema, model} = require('mongoose');

const carritoSchema = new Schema({
    timestamp: {type: Date, required: true},
    productos: {type: Array, required: true},
});

module.exports = model('Carrito', carritoSchema);