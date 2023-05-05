//REQUIERO MySQLContenedor DESDE EL ARCHIVO './Contenedor' PARA PODER UTILIZARLO//
const {MySQLContenedor} = require('./Contenedor.js');

;(async () =>{
    try{
        const productosTabla = await MySQLContenedor.getKnex().schema
            .createTable('productos', table => {
                table.increments('id');
                table.string('nombre', 30);
                table.float('precio');
                table.string('imagen', 255);
            });
        console.log('TABLA DE PRODUCTOS CREADA CON EXITO');
    }catch(error){
        console.log(`ERROR ${error}`);
    }
})();