//DAO MongoDB DE PRODUCTOS//

//REALIZO LAS IMPORTACIONES PARA PODER UTILIZARLAS//
import mongoDB from '../../dataBase/options/opcionesMongoDB.js';
import productoModel from '../../dataBase/models/producto.js';
import CrudMongoDB from '../../dataBase/crudMongoDB/crudProductos.js';

class ProductosDAOMongoDB extends CrudMongoDB{
    constructor(){
        super(mongoDB, productoModel);
    };
};

export default ProductosDAOMongoDB;