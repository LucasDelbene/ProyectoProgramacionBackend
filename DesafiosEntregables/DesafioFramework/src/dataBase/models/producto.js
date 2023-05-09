//MODEL DE PRODUCTOS//

//IMPORTO mongoose PARA PODER UTILIZARLO//
import mongoose from 'mongoose';

const collectionProductos = 'Productos';

const schemaProductos = new mongoose.Schema({
    nombre:{type:String, required:true},
    descripcion:{type:String, required:true},
    codigo:{type:Number, required:true},
    thumbnail:{type:String, required:true},
    precio:{type:Number, required:true},
    stock:{type:Number, required:true},
    cantidad:{type:Number}
});

const productoModel = mongoose.model(collectionProductos,schemaProductos);
export default productoModel;