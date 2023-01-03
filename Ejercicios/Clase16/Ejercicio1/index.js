//IMPORTANDO DEPENDENCIAS//
import ClientSQL from './sql.js'
import {options} from './options/SQLite3.js'

//CONEXIONES//
const sql = new ClientSQL(options)

//FUNCIONALIDADES DEL PROYECTO//
try{
    await sql.crearTabla()
    console.log("Tabla creada con exito")

    const articulosParaInsertar = [
        { nombre: "Remera", codigo: 'AB-12', precio: 15000, stock: 50 },
        { nombre: "Zapatillas", codigo: 'AB-13', precio: 25000, stock: 55 },
        { nombre: "Botines", codigo: 'AB-14', precio: 35000, stock: 56 },
        { nombre: "Campera", codigo: 'AB-15', precio: 45000, stock: 57 },
        { nombre: "Piluso", codigo: 'AB-16', precio: 5000, stock: 58 },
    ]
    await sql.insertarArticulos(articulosParaInsertar)
    console.log("Articulos insertados con exito");

    //PUNTO 3//
    const articulosLeidos = await sql.listarArticulos()
    console.log("3) articulos listado")
    console.table(articulosLeidos)

    //PUNTO 4//
    await sql.borrarArticuloPorId(3)
    console.log("4) articulo borrado")

    //PUNTO 5//
    await sql.actualizarStockPorId(0, 2)
    console.log("5) stock actualizado")

    const articuloFinal = await sql.listarArticulos()
    console.log('Resultado')
    console.table(articuloFinal) 
}catch(error){
    console.log(error)
}finally{
    sql.close()
}
