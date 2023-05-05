//MODEL DE PEDIDOS//

//IMPORTO mongoose PARA PODER UTILIZARLO//
import mongoose from 'mongoose';

const collectionPedidos = 'Pedidos';

const schemaPedidos = new mongoose.Schema({
    timestamp:{type:Date, required:true},
    productos:{type:Array, required:true},
    idDueño:{type:Object, require:true}
});

const pedidoModel = mongoose.model(collectionPedidos,schemaPedidos);
export default pedidoModel;