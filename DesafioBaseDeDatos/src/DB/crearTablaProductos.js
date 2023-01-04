//PRODUCTOS EN MariaDB//
const {MySQLContenedor} = require(`../contenedores/Contenedor.js`);

try{
    const productosTabla = await MySQLContenedor.getKnex().schema
    .createTable('productos', table =>{
        table.increments('id');
        table.string('title', 30);
        table.float('price');
        table.string('thumbnail', 255);
    });   
    console.log('TABLA DE PRODUCTOS CREADA CON EXITO!')
}catch(error){
    console.log(`ERROR: ${err}`);
};


