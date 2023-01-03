//IMPORTAMOS LAS DEPENDENCIAS//
import knexLib from 'knex'

class ClientSQl{
    constructor(config){
        this.knex = knexLib(config)
    }

    //FUNCION PARA CREAR TABLA//
    crearTabla(){
        return this.knex.schema.dropTableIfExists('articulos')
        .finally(() =>{
            return this.knex.schema.createTable('articulos', table =>{
                table.increments('id').primary();
                table.string('nombre', 50).notNullable();
                table.string('codigo', 10).notNullable();
                table.float('precio');
                table.integer('stock')
            })
        })
    }

    //FUNCION INSERTAR ARTICULOS//
    insertarArticulos(articulos) {
        return this.knex("articulos").insert(articulos);
    }

    //FUNCION PARA LISTAR ARTICULOS//
    listarArticulos() {
      return this.knex("articulos").select("*");
    }

    //FUNCION PARA BORRAR ARTICULO POR ID//
    borrarArticuloPorId(id) {
      return this.knex.from("articulos").where("id", id).del();
    }

    //FUNCION PARA ACTUALIZAR STOCK POR ID//
    actualizarStockPorId(stock, id) {
      return this.knex.from("articulos").where("id", id).update({ stock: stock });
    }

    //FUNCION PARA CERRAR LA SESION DE TRANSACCION//
    close() {
      this.knex.destroy();
    }
}

export default ClientSQl

