//DAO DE PRODUCTOS//

//REALIZO LAS IMPORTACIONES//
import mongoDB from '../../dataBase/options/mongoDB.js';
import productsModel from '../../dataBase/models/producto.js';
import CrudMongoDB from '../../dataBase/crudMongoDB/crudProductos.js';

class ProductosDAOMongoDB extends CrudMongoDB{
    constructor(){
        super(mongoDB, productsModel);
    };
};
export default ProductosDAOMongoDB;