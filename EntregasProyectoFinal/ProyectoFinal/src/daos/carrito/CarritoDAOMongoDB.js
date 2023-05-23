//DAO DE CARRITO//

//REALIZO LAS IMPORTACIONES//
import mongoDB from '../../dataBase/options/mongoDB.js';
import carritoModel from '../../dataBase/models/carrito.js';
import productsModel from '../../dataBase/models/producto.js';
import userModel from '../../dataBase/models/user.js';
import CrudMongoDB from '../../dataBase/crudMongoDB/crudCarrito.js';

class CarritoDAOMongoDB extends CrudMongoDB{
    constructor(){
        super(mongoDB, carritoModel, productsModel, userModel);
    };
};
export default CarritoDAOMongoDB;
