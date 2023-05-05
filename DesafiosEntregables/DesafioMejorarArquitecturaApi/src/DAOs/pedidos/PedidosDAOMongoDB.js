//DAO MongoDB DE PEDIDOS//

//REALIZO LAS IMPORTACIONES PARA PODER UTILIZARLAS//
import mongoDB from '../../dataBase/options/opcionesMongoDB.js';
import productoModel from '../../dataBase/models/producto.js';
import usuarioModel from '../../dataBase/models/usuario.js';
import pedidoModel from '../../dataBase/models/pedidos.js';
import CrudMongoDB from '../../dataBase/crudMongoDB/crudPedidos.js';

class PedidosDAOMongoDB extends CrudMongoDB{
    constructor(){
        super(mongoDB, productoModel, usuarioModel, pedidoModel);
    };
};

export default PedidosDAOMongoDB;
