const {SQLite3Contenedor} = require('../contenedores/Contenedor.js');

insertarMensaje = async(mensaje) =>{
    try{
        const insertarMensaje = await SQLite3Contenedor.getKnex()
        .into('mensajes')
        .insert(mensaje);     
    }catch(error){
        console.log(`Error ${err}`);
    }
}

module.exports = {insertarMensaje};


