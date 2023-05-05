const mongoDB = require('../../dataBase/models/carrito')
const carritoModelo = require('../../dataBase/models/carrito')
const productosModelo = require('../../dataBase/models/producto')
const CrudMongoDB = require('../../dataBase/CrudMongoDB/crudCarrito')

class CarritoDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, carritoModelo, productosModelo);
    };
};

module.exports = CarritoDAOMongoDB;