//IMPORTAMOS DEPENDENCIAS//
const { options } = require("./options/mysql.js")
const knex = require("knex")(options)

//FUNCIONALIDADES//
knex.from("cars").where("price", ">", "500").del()
.then(() => console.log("EL AUTO HA SIDO ELIMINADO CON EXITO!"))
.catch((err) => {console.log(err); throw err})
.finally(() => {
    knex.destroy()
})