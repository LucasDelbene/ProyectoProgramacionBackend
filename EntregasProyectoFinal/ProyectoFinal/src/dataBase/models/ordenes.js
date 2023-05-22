//MODEL DE ORDENES//

//IMPORTO mongoose PARA PODER UTILIZARLO//
import mongoose from 'mongoose';

//ESQUEMA DE ORDEN//
const collectionPedidos = 'Ordenes';
const ordenesSchema = new mongoose.Schema({
    timestamp:{type:Date, required:true},
    products:{type:Array, required:true},
    idDueño:{type:Object, require:true}
});
const ordenModel = mongoose.model(collectionPedidos,ordenesSchema);
export default ordenModel;