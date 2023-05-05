//DESAFIO GENERICO - SERVIDOR EN NODE//

//DESARROLLARE UN SERVIDOR EN node.js QUE ESCUCHE PETICIONES EN EL PUERTO 8080 y RESPONDA UN MENSAJE DE ACUERDO A LA HORA ACTUAL//
const HTTP = require('http');
let moment = require('moment');

const PUERTO = 8080;
const SERVIDOR = HTTP.createServer((peticion, respuesta)=>{
    let hora = moment().add(12, 'h').hour();

    let mensaje = '';
    if(hora >= 6 && hora <= 12) mensaje = 'BUENOS DIAS';     //ENTRE LAS 6Hs y 12Hs SERA BUENOS DIAS
    if(hora >= 13 && hora <= 19) mensaje = 'BUENAS TARDES';  //ENTRE LAS 13Hs y 19Hs SERA BUENOS TARDES
    if(hora >= 20 && hora <= 5) mensaje = 'BUENAS NOCHES';   //ENTRE LAS 20Hs y 5Hs SERA BUENOS NOCHES
    respuesta.end(`${mensaje}`);
});

let conexionServidor = SERVIDOR.listen(PUERTO, () =>{console.log(`Servidor escuchandose en http://localhost:${PUERTO}`)});
conexionServidor.on('error', error => console.log(error));