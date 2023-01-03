const {options} = require("./options/mysql.js")
const knex = require("knex")(options)

//ACTUALIZA EL PRECIO A 5000 EN LOS AUTOS CUYO PRECIO SEA 1000//
knex.from("cars").where("price", "1000").update({ price: 5000 })
.then(() => {
    console.log("Car updated")
}).catch((err) => { console.log(err); throw err })
.finally(() => {
    knex.destroy()
})