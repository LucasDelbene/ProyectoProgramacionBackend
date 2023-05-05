//REQUIERO MySQLContenedor DESDE LA CARPETA './Contenedor'//
const {MySQLContenedor} = require('./Contenedor.js');

insertarProducto = async (producto) => {
    try{
        let inserProduct = await MySQLContenedor.getKnex()
            .into('productos')
            .insert(producto);

        //DEVUELVE EL ULTIMO PRODUCTO INGRESADO//
        const todosLosProductos = await MySQLContenedor.knex()
            .select('*')
            .from('productos');
        return todosLosProductos[todosLosProductos.length - 1];

    }catch(error){
        console.log(`ERROR ${error}`);
    }
};


module.exports = {insertarProducto}