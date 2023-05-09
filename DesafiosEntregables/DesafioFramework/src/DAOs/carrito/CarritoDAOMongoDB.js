//DAO MongoDB DE CARRITO//

//REALIZO LAS IMPORTACIONES PARA PODER UTILIZARLAS//
import mongoDB from '../../dataBase/options/opcionesMongoDB.js';
import carritoModel from '../../dataBase/models/carrito.js';
import productoModel from '../../dataBase/models/producto.js';
import usuarioModel from '../../dataBase/models/usuario.js';
import CrudMongoDB from '../../dataBase/crudMongoDB/crudCarrito.js';

class CarritoDAOMongoDB extends CrudMongoDB{
    constructor(){
        super(mongoDB, carritoModel, productoModel, usuarioModel);
    };
};

export default CarritoDAOMongoDB;
