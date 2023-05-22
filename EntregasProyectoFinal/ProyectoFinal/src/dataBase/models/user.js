//MODEL DE USUARIO//

//IMPORTO mongoose PARA PODER UTILIZARLO//
import mongoose from 'mongoose';

//ESQUEMA DE USUARIO//
const collectionUsuario = 'User';
const schemaUser = new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required:true},
    email:{type:String, required:true},
    telefono:{type:Number, required:true},
    edad:{type:Number, required:true},
    direccion:{type:String, required:true},
    foto:{type:String, required:true},
    carrito:{type:Array, required:true},
    admin:{type:Boolean, required:true}
});
const userModel = mongoose.model(collectionUsuario,schemaUser);
export default userModel;
