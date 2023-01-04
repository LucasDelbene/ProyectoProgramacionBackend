//MENSAJES EN SQLite3//
const {SQLite3Contenedor} = require('../contenedores/Contenedor');

try{
    const mensajesTabla = await SQLite3Contenedor.getKnex().schema
    .createTable('mensajes', table =>{
        table.increments('id').primary();
        table.string('text', 500);
        table.string('email', 30);
        table.string('time', 10)
    })
    await SQLite3Contenedor.destroy()

    console.log('TABLA DE MENSAJES CREADA CON EXITO!');
}catch(error){
    console.log(`ERROR: ${err}`);
}


