//MODEL DE PRODUCTO//

//IMPORTO mongoose PARA PODER UTILIZARLO//
import mongoose from 'mongoose';

//ESQUEMA DE PRODUCTO//
const collectionProductos = 'Productos';
const productoSchema = new mongoose.Schema({
    nombre:{type:String, required:true},
    descripcion:{type:String, required:true},
    codigo:{type:Number, required:true},
    thumbnail:{type:String, required:true},
    precio:{type:Number, required:true},
    stock:{type:Number, required:true},
    cantidad:{type:Number}
});
const productsModel = mongoose.model(collectionProductos,productoSchema);
export default productsModel;