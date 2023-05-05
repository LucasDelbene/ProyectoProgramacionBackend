//REQUIERO LAS OPTIONS DE mysql y sqlite//
const {optionsMySQL} = require('./mysql.js');
const {optionsSQLite3} = require('./sqlite.js');

class Contenedor {
    constructor(configuracion) {
        this.knex = require('knex')(configuracion);
    }

    getKnex() {
        return this.knex;
    }
}

const MySQLContenedor = new Contenedor(optionsMySQL);
const SQLite3Contenedor = new Contenedor(optionsSQLite3);

module.exports = {MySQLContenedor,SQLite3Contenedor};