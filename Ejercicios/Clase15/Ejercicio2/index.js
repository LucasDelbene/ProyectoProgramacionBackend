//IMPORTAMOS NUESTRAS DEPENDENCIAS//
import ClientSQL from './sql.js'
import {options} from './options/mariaDB.js'

//INSTANCIAR NUESTRAS CONSTANTES//
const sql = new ClientSQL(options)

//CREAMOS LA TABLA SI NO EXISTE//
sql.crearTabla()
   .then(() =>{
    console.log("TABLA CREADA CON EXITO!")

    //CARGAR ARTICULOS EN NUESTRA TABLA DE ARTICULOS//
    const articulos = [
        { nombre: "Leche", codigo: "AB-12", precio: 207.6, stock: 24 },
        { nombre: "Harina", codigo: "CD-34", precio: 120.8, stock: 45 },
        { nombre: "DDL", codigo: "EF-56", precio: 320, stock: 16 },
        { nombre: "Huevos", codigo: "FG-44", precio: 70, stock: 34 },
        { nombre: "Chocolate", codigo: "CR-77", precio: 670.9, stock: 44 },
    ];
    return sql.insertarArticulos(articulos)
})
.then(() =>{
    console.log("ARTICULOS INGRESADOS CON EXITO!")
    return sql.listarArticulos();
})
.then(articulos =>{
    console.log("ARTICULOS LISTADOS CON EXITO!")
    console.table(articulos)
    return sql.borrarArticuloPorId(3)
})
.then(() =>{
    console.log("ARTICULOS ELIMINADOS CON EXITO!")
    return sql.actualizarStockPorId(0, 2)
})
.then(() =>{
    console.log("ARTICULO ACTUALIZADO CON EXITO!")
    return sql.listarArticulos()
})
.then(articulos =>{
    console.log("RESULTADO TOTAL")
    console.table(articulos)
})
.catch((err) => {console.log(err); throw err})
.finally(() =>{
    sql.close()
})  
      
 