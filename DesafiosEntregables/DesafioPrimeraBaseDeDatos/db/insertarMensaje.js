//REQUIERO SQLite3Contenedor DESDE LA CARPETA './Contenedor'//
const {SQLite3Contenedor} = require('./Contenedor.js');

insertarMensaje = async (mensaje) => {
    try{
        const insertarMensaje = await SQLite3Contenedor.getKnex()
        .into('mensajes')
        .insert(mensaje);

    }catch(error){
        console.log(`ERROR ${error}`);
    }
};

module.exports = {insertarMensaje}