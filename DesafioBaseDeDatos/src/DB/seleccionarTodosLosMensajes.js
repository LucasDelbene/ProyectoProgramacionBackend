const {SQLite3Contenedor} = require('../contenedores/Contenedor.js');

seleccionarTodosLosMensajes = async () => {
    try{
        const todosLosMensajes = await SQLite3Contenedor.getKnex()
            .select('*')
            .from('mensajes');

        return todosLosMensajes;
    }catch(err){
        console.log(`Error: ${err}`);
    }
};
seleccionarTodosLosMensajes();

module.exports = {seleccionarTodosLosMensajes}