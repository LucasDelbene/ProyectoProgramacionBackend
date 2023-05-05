const mongoDB = require('../../dataBase/config/mongoDB');
const productosModel = require('../../dataBase/models/productos')
const CrudMongoDB = require('../../dataBase/CrudMongoDB/crudProductos')

class ProductosDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, productosModel);
    };
};

module.exports = ProductosDAOMongoDB;