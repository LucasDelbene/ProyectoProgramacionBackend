//REQUIERO SQLite3Contenedor DESDE EL ARCHIVO './Contenedor.js' PARA PODER UTILIZARLO//
const {SQLite3Contenedor} = require('./Contenedor.js');

;(async () =>{
    try{
        const productosTabla = await SQLite3Contenedor.getKnex().schema
            .createTable('mensajes', table => {
                table.increments('id');
                table.string('texto', 500);
                table.string('email', 30);
                table.string('tiempo', 10);
            });
        console.log('TABLA DE MENSAJES CREADA CON EXITO');
    }catch(error){
        console.log(`ERROR ${error}`);
    }
})();