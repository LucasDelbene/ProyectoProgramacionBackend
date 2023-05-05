//IMPORTO mongoose PARA PODER UTILIZARLO//
import mongoose from "mongoose";

const persistencia = "MONGO";
export let usuariosService;

switch(persistencia) {
    case 'MONGO':
        mongoose.set('strictQuery', false)
        const connection = mongoose.connect("mongodb+srv://LucasDelbene:776@clase24-programacionbac.13mdabl.mongodb.net/Clase26?retryWrites=true&w=majority");
        const {default:MongoUser} = await import('./Mongo/UsuariosContenedor.js')
        usuariosService = new MongoUser();
        break;
    case 'FILESYSTEM':
        const {default:FSUser} = await import('./FileSystem/UsuariosContenedor.js')
        usuariosService = new FSUser();
        break;
}