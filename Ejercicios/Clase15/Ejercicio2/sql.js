//IMPORTAMOS NUESTRAS DEPENDENCIAS//
import knexLib from 'knex'

//CREAMOS INSTANCIAS DE CLASES PARA TRABAJAR CON MYSQL//
class ClientSQL{
    constructor(config){
        this.knex = knexLib(config)
    }

    //FUNCION CREAR TABLA//
    crearTabla(){
        return this.knex.schema.dropTableIfExists('articulos')
        .finally(() => {
            return this.knex.schema.createTable('articulos', table => {
                table.increments('id').primary();
                table.string('nombre', 50).notNullable();
                table.string('codigo', 10).notNullable();
                table.float('precio');
                table.integer('stock')
            })
        })
    }

    //FUNCION INSERTAR ARTICULOS//
    insertarArticulos(articulos){
        return this.knex('articulos').insert(articulos)
    }

    //FUNCION PARA LISTAR ARTICULOS//
    listarArticulos(articulos){
        return this.knex('articulos').select('*') //Es lo que mismo que SELECT * FROM en SQL//
    }

    //FUNCION PARA BORRAR ARTICULO POR ID//
    borrarArticuloPorId(id){
        return this.knex.from('articulos').where('id', id).del()
    }

    //FUNCION PARA ACTUALIZAR STOCK POR ID//
    actualizarStockPorId(id){
        return this.knex.from('articulos').where('id', id).update({stock: stock})
    }

    //FUNCION PARA CERRAR LA SESION DE TRANSACCION//
    close(){
        this.knex.destroy()
    }
}

export default ClientSQL