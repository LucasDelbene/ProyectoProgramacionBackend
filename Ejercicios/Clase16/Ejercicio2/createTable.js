//IMPORTAMOS DEPENDENCIAS Y LIBRERIAS//
const {options} = require("./options/mysql.js")
const knex = require("knex")(options)

//CREAMOS NUEVA TABLA CON LA FUNCION createTable() DEL ESQUEMA Knex.js Y DEFINIMOS EL ESQUEMA PARA QUE CONTENGA 3 COLUMNAS: ID, PRECIOS Y NOMBRE//
knex.schema.createTable("cars", table => {
    table.increments("id")
    table.string("name")
    table.integer("price")
})
.then(() => console.log("TABLA CREADA CON EXITO!"))
.catch((err) =>{ console.log(err); throw err})
.finally(() =>{
    knex.destroy();
})
      