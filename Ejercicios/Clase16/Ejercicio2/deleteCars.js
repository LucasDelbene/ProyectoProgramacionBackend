//IMPORTAMOS DEPENDENCIAS//
const {options} = require("./options/mysql.js")
const knex = require("knex")(options)

//FUNCIONALIDADES//
knex.from("cars").del()
.then(() => console.log("TODOS LOS AUTOS HAN SIDO ELIMINADOS CON EXITO!"))
.catch((err) => {console.log(err); throw err})
.finally(() => {
    knex.destroy()
})