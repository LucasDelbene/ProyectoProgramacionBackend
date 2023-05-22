//MODEL DE CARRITO//

//IMPORTO mongoose PARA PODER UTILIZARLO//
import mongoose from 'mongoose';

const collectionCarrito = 'Carrito';

const schemaCarrito = new mongoose.Schema({
    timestamp:{type:Date, required:true},
    productos:{type:Array, required:true},
    dueño:{type:Object, require:true}
});
const carritoModel = mongoose.model(collectionCarrito,schemaCarrito);
export default carritoModel;