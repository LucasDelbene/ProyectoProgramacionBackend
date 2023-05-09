//OPCIONES DE MongoDB//

//IMPORTO mongoose y dotenv PARA PODER UTIIZARLOS//
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const URLMongoDB = process.env.URL_MONGO;

const conexion = mongoose.connect(URLMongoDB,{
    useNewUrlParser: true
});

export default conexion;