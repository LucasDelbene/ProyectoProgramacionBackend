//REQUIERO MySQLContenedor DESDE EL ARCHIVO './Contenedor.js' PARA PODER UTILIZARLO//
const {MySQLContenedor} = require('./Contenedor.js');

seleccionarTodosLosProductos = async () =>{
    try{
        //ES LO MISMO CUANDO USAMOS SELECT * FROM//
        const todosLosProductos = await MySQLContenedor.getKnex()
            .select('*')
            .from('productos');

        return todosLosProductos;
    }catch(error){
        console.log(`ERROR ${error}`);
    }
};

module.exports = {seleccionarTodosLosProductos}