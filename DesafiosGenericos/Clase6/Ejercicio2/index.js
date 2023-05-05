//DESAFIO GENERICO - SERVIDOR CON EXPRESS//

//CREO UN PROYECTO DE servidor http EN node.js QUE UTILIZA LA DEPENDENCIA express, SE ESCUCHA EN EL PUERTO 8080 y TIENE TRES RUTAS GET//

//REQUIERO express PARA PODER UTILIZARLO//
let express = require('express');
let app = express();
const moment = require('moment');

//CREO LA RUTA RAIZ, DONDE EL SERVIDOR ENVIARA UN STRING CON UN ELEMENTO DE TITULO NIVEL 1 QUE CONTENGA UN MENSAJE EN COLOR AZUL//
app.get('/', (peticion, respuesta, next)=>{
    respuesta.send('<h1 style="color:blue;">BIENVENIDOS A MI PRIMER SERVIDOR EN EXPRESS</h1>')
})

//CREO LA RUTA VISITAS, DONDE CON CADA PETICION, EL SERVIDOR DEVOLVERA UN MENSAJE CON LA CANTIDAD DE VISITAS QUE SE HAYAN REALIZADO A ESTE ENDPOINT//
let visitas = 0;
app.get('/visitas', (peticion, respuesta, next)=>{
    visitas ++;
    respuesta.send(`EL TOTAL DE VISITAS ES DE ${visitas} USUARIOS`)
})

//CREO LA RUTA FyH, DONDE SE DEVOLVERA LA FECHA Y HORA ACTUAL EN FORMATO OBJETO///
app.get('/fyh', (peticion, respuesta, next)=>{
    let hora = moment().format("L");
    respuesta.json({hora});
})

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO, ()=> console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));