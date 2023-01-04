const {SQLite3Contenedor} = require('../contenedores/Contenedor');

insertarMensaje = async(mensaje) =>{
    try{
        const insertarMensaje = await SQLite3Contenedor.getKnex()
        .into('mensajes')
        .insert(mensaje);     
    }catch(error){
        console.log(`ERROR: ${err}`);
    }
}

module.exports = {insertarMensaje};


