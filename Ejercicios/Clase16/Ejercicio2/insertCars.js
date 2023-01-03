//IMPORTAMOS DEPENDENCIAS Y LIBRERIAS//
const {options} = require("./options/mysql.js")
const knex = require("knex")(options)

//FUNCIONALIDADES//
//ARRAY DE DATOS//
const cars = [
    {name: "Audi", price: 1000 },
    {name: "Renault", price: 400 },
    {name: "Fiat", price: 700 },
    {name: "Hummer", price: 1000 },
    {name: "Toyota", price: 750 }
]

//INSERTAMOS DATOS//
knex("cars").insert(cars)
.then(() => console.log("DATOS INSERTADOS CON EXITO!"))
.catch(() => {console.log(err); throw err})
.finally(() => {
    knex.destroy()
})