//REQUIERO moment PARA PODER UTILIZARLO//
let moment = require('moment');

class Fechas{
    constructor(nacimiento){
        this.cumpleaños = nacimiento;
        this.today = moment();
    }
    
    //CREO LA FUNCION getToday() PARA MOSTRAR QUE SEMANA, DIA, AÑO y HORA ES ACTUALMENTE//
    getToday(){
        return this.today.format('LLLL'); //EN moment, CON CUATRO "LLLL" MUESTRO LA SEMANA, EL DIA, EL AÑO y LA HORA ACTUAL//
    }

    //CREO LA FUNCION getAllYears() PARA MOSTRAR CUANTOS AÑOS TENGO ACTUALMENTE//
    getAllYears(){
        return this.today.diff(this.cumpleaños, 'years', true);
    }

    //CREO LA FUNCION getAllDays() PARA MOSTRAR CUANTOS DIAS TENGO ACTUALMENTE//
    getAllDays(){
        return this.today.diff(this.cumpleaños, 'days', true);
    }
}

module.exports = Fechas;