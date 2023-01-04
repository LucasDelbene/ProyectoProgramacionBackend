const {MySQLContenedor} = require('../contenedores/Contenedor');

seleccionarTodosLosProductos = async () => {
    try{
        const todosLosProductos = await MySQLContenedor.getKnex()
            .select('*')
            .from('productos');

        return todosLosProductos;
    }catch(err){
        console.log(`ERROR: ${err}`);
    }
};

module.exports = {seleccionarTodosLosProductos}