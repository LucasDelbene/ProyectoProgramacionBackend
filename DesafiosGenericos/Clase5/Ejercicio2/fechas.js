//REQUIERO moment PARA PODER UTILIZARLO//
let moment = require('moment');

let Fechas = require('./controladorFechas');
let cumpleaños = moment('01/11/2002', 'DD/MM/YYYY');
let objeto = new Fechas(cumpleaños);

console.log(`HOY ES ${objeto.getToday()}`)
console.log(`DESDE MI NACIMIENTO HAN PASADO ${objeto.getAllYears()} AÑOS`)
console.log(`DESDE MI NACIMIENTO HAN PASADO ${objeto.getAllDays()} DIAS`)