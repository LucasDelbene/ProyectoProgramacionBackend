//IMPORTO mongoose PARA PODER UTILIZARLO//
import mongoose from "mongoose";

const collection = 'Usuarios';

const schema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    apellido:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    rol:{
        type:String,
        default:'usuario'
    }
})

const usuarioModel = mongoose.model(collection,schema);
export default usuarioModel;