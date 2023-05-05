//DESAFIO GENERICO - NODE + SQLITE3//

//TENGO QUE REALIZAR UN PROYECO EN Node.js QUE SE CONECTE A UNA BASE DE DATOS SQLite3 y EJECUTE LAS MISMAS ACCIONES PLANTEADAS EN EL EJERCICIO 1 REALIZADO ANTERIORMENTE//

//IMPORTO LA CLASE ClienteSQL DESDE LA CARPETA './sql.js'//
import ClienteSQL from './sql.js'
//IMPORTO LAS OPTIONS DESDE LA CARPETA './options/SQLite3.js'//
import {options} from './options/SQLite3.js'

//INSTANCIO CONSTANTES//
const sql = new ClienteSQL(options)

//APLICO LAS FUNCIONES//
try{
    //CREO LA TABLA SI NO EXISTE, CON LA FUNCION crearTabla()//
    await sql.crearTabla() 
    console.log('TABLA CREADA CON EXITO')

    //INSERTO 5 ARTICULOS EN LA TABLA DE ARTICULOS, CON LA FUNCION insertarArticulos()//
    const articulos = [
        {nombre: 'Botines', codigo: '00-01', precio: 250, stock: 10},
        {nombre: 'Canilleras', codigo: '00-02', precio: 110, stock: 10},
        {nombre: 'Medias', codigo: '00-03', precio: 90, stock: 10},
        {nombre: 'Camiseta', codigo: '00-04', precio: 410, stock: 10},
        {nombre: 'Guantes', codigo: '00-05', precio: 240, stock: 10}
    ]
    await sql.insertarArticulos(articulos)
    console.log('ARTICULOS INSERTADOS CON EXITO');

    //LISTO LOS ARTICULOS MOSTRANDOLOS EN LA CONSOLA, CON LA FUNCION listarArticulos()//
    const articulosListados = await sql.listarArticulos()
    console.log('ARTICULOS LISTADOS CON EXITO');
    console.table(articulosListados)

    //BORRO EL ARTICULO CON ID 3, CON LA FUNCION borrarArticuloPorId()//
    await sql.borrarArticuloPorId(3)
    console.log('ARTICULO CON ID 3, BORRADO CON EXITO');

    //ACTUALIZO EL STOCK CON ID 2 a 0 DE STOCK, CON LA FUNCION actualizarStockPorId()//
    await sql.actualizarStockPorId(0, 2)
    console.log('ACTUALIZACION DEL STOCK DEL ID 2 (STOCK DE 10 a 0), ACTUALIZADA CON EXITO');

    //LISTO NUEVAMENTE LOS ARTICULOS PARA VER EL RESULTADO FINAL, CON LA FUNCION listarArticulos()//
    const articuloFinal = await sql.listarArticulos()
    console.log('RESULTADO TOTAL DE TODAS LAS FUNCIONES EJECUTADAS')
    console.table(articuloFinal)
}catch(error){
    console.log(error)
}finally{
    sql.close() //FINALIZO LA SESION SQL//
}