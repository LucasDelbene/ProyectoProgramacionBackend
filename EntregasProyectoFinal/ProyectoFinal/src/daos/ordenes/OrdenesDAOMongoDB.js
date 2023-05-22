//DAO DE ORDENES//

//REALIZO LAS IMPORTACIONES//
import mongoDB from '../../dataBase/options/mongoDB.js';
import productsModel from '../../dataBase/models/producto.js';
import userModel from '../../dataBase/models/user.js';
import ordenModel from '../../dataBase/models/ordenes.js';
import CrudMongoDB from '../../dataBase/crudMongoDB/crudOrdenes.js';

class OrdenesDAOMongoDB extends CrudMongoDB{
    constructor(){
        super(mongoDB, productsModel, userModel, ordenModel);
    };
};
export default OrdenesDAOMongoDB;
