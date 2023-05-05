//REQUIERO SQLite3Contenedor DESDE LA CARPETA './Contenedor'//
const {SQLite3Contenedor} = require('./Contenedor.js');

seleccionarTodosLosMensajes = async () => {
    try{
        //ES LO MISMO CUANDO USAMOS SELECT * FROM//
        let todosLosMensajes = await SQLite3Contenedor.getKnex()
            .select('*')
            .from('mensajes');

        return todosLosMensajes;
    }catch(error){
        console.log(`ERROR ${error}`);
    }
};
seleccionarTodosLosMensajes();
module.exports = {seleccionarTodosLosMensajes}