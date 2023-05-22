//OPCIONES DE MongoDB//

//REALIZO LAS IMPORTACIONES//
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//CONEXION CON MongoDB//
const URL = process.env.URL_MONGO;
const connection = mongoose.connect(URL,{
    useNewUrlParser:true
});
export default connection;