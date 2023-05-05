//IMPORTO mongoose PARA PODER UTILIZARLO//
import mongoose from 'mongoose';

const collection = 'Usuarios';        //ESTO QUIERO QUE SEA DE USUARIOS
const schema = new mongoose.Schema({  //CREO EL ESQUEMA DE MONGOOSE
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
    contraseña:{
        type:String,
        required:true
    },
    rol:{
        type:String,
        default:'usuario'
    },  
})

const usuarioModel = mongoose.model(collection,schema); //A PARTIR DE LA COLLECTION QUE ESCRIBI, QUIERO QUE GENERE EL ESQUEMA
export default usuarioModel;

