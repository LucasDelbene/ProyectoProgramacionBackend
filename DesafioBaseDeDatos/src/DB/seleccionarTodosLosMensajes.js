const {SQLite3Contenedor} = require('../contenedores/Contenedor');

seleccionarTodosLosMensajes = async () => {
    try{
        const todosLosMensajes = await SQLite3Contenedor.getKnex()
            .select('*')
            .from('mensajes');

        return todosLosMensajes;
    }catch(err){
        console.log(`ERROR: ${err}`);
    }
};
seleccionarTodosLosMensajes();

module.exports = {seleccionarTodosLosMensajes}