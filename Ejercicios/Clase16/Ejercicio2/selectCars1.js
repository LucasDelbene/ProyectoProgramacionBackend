const { options } = require("./options/mysql.js")
const knex = require("knex")(options)

//SELECCIONAMOS TODAS LAS FILAS CON LA FUNCION select(). ESTA VEZ HEMOS ELEIGO LA TABLA CON LA FUNCION from(). LUEGO REVISAMOS LA MATRIZ DE FILAS DEVUELTA E IMPRIMIMOS LOS CAMPOS//
knex.from("cars").select("*")
.then((rows) => {
    for(const row of rows){
        console.log(`${row[ "id" ]} ${row[ "name" ]} ${row[ "price" ]}`)
    }
}).catch((err) => { console.log(err); throw err })
.finally(() => {
    knex.destroy()
})