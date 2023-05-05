//IMPORTO mongoose PARA PODER UTILIZARLO//
import mongoose from "mongoose";

const collection = 'usuarios';
const schema = new mongoose.Schema({
    nombre:String,
    email:String,
    contraseña:String
})

const usuarioModel = mongoose.model(collection, schema);
export default usuarioModel;