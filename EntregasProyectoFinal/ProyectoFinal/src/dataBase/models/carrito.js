//MODEL DE CARRITO//

//IMPORTO mongoose PARA PODER UTILIZARLO//
import mongoose from 'mongoose';

//ESQUEMA DE CARRITO//
const collectionCarrito = 'Carritos';
const carritoSchema = new mongoose.Schema({
    timestamp:{type:Date, required:true},
    products:{type:Array, required:true},
    dueño:{type:Object, require:true}
});
const carritoModel = mongoose.model(collectionCarrito,carritoSchema);
export default carritoModel;