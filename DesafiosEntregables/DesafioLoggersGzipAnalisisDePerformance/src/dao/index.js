//IMPORTO mongoose PARA PODER UTILIZARLO//
import mongoose from "mongoose";

//IMPORTO dotenv PARA PODER UTILIZARLO//
import dotenv from 'dotenv';
dotenv.config()
const URLMONGO = process.env.URL_MONGO;

const persistencia = "MONGO";
export let usuariosService;

switch(persistencia) {
    case 'MONGO':
        mongoose.set('strictQuery', false)
        const connection = mongoose.connect(URLMONGO);
        const {default:MongoUser} = await import('./Mongo/UsuariosContenedor.js')
        usuariosService = new MongoUser();
        break;
    case 'FILESYSTEM':
        const {default:FSUser} = await import('./FileSystem/UsuariosContenedor.js')
        usuariosService = new FSUser();
        break;
}