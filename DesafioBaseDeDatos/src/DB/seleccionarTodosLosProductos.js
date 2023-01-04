const {MySQLContenedor} = require('../contenedores/Contenedor.js');

seleccionarTodosLosProductos = async () => {
    try{
        const todosLosProductos = await MySQLContenedor.getKnex()
            .select('*')
            .from('productos');

        return todosLosProductos;
    }catch (err){
        console.log(`Error: ${err}`);
    }
};

module.exports = {seleccionarTodosLosProductos}