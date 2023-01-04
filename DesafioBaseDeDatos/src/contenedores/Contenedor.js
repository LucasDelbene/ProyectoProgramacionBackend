const {optionsMySQL} = require('../mysql');
const {optionsSQLite3} = require('../sqlite');

class Contenedor{
    constructor(config){
        this.knex = require('knex')(config);
    }
    getKnex(){
        return this.knex;
    }
}

const MySQLContenedor = new Contenedor(optionsMySQL);
const SQLite3Contenedor = new Contenedor(optionsSQLite3);

module.exports = {MySQLContenedor,SQLite3Contenedor};