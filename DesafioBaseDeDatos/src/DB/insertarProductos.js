const {MySQLContenedor} = require('../contenedores/Contenedor');

insertarProducto = async(producto) =>{
    try{
        const insertarProducto = await MySQLContenedor.getKnex()
        .into('productos')
        .insert(producto);
        
        const todosLosProductos = await MySQLContenedor.knex()
        .select('*')
        .from('productos');
        return todosLosProductos[todosLosProductos.length - 1]; 
    }catch(error){
        console.log(`ERROR: ${err}`);
    }
}

module.exports = {insertarProducto};
