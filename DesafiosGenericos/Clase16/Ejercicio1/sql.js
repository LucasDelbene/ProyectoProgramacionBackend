//IMPORTO knex PARA PODER UTILIZARLO//
import knexLib from "knex";

//CREO LAS INSTANCIAS DE CLASES PARA TRABAJAR CON MySQL//
class ClienteSQL {
  constructor(config) {
    this.knex = knexLib(config);
  }

  //CREO UNA TABLA EN LA BASE DE DATOS desafiogenericoclase15//
  crearTabla() {
    return this.knex.schema.dropTableIfExists("articulos").finally(() => {
      return this.knex.schema.createTable("articulos", (table) => {
        table.increments("id").primary();
        table.string("nombre", 15).notNullable();
        table.string("codigo", 10).notNullable();
        table.float("precio");
        table.integer("stock");
      });
    });
  }

  //INSERTO LOS ARTICULOS//
  insertarArticulos(articulos) {
    return this.knex("articulos").insert(articulos);
  }

  //LISTO LOS ARTICULOS//
  listarArticulos() {
    return this.knex("articulos").select("*");
  }

  //BORRO ARTICULO POR ID//
  borrarArticuloPorId(id) {
    return this.knex.from("articulos").where("id", id).del();
  }

  //ACTUALIZO ARTICULO POR ID//
  actualizarStockPorId(stock, id) {
    return this.knex.from("articulos").where("id", id).update({ stock: stock });
  }

  //CREO LA FUNCION close() PARA CERRAR LA SESION ABIERTA en SQL//
  close() {
    this.knex.destroy();
  }
}

export default ClienteSQL;