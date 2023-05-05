//DESAFIO GENERICO CREAR DEPENDENCIA CON NPM (CLASE 37)//

//CREO LA CARPETA PruebaDeDependencia PARA PODER PROBAR E IMPORTAR LAS FUNCIONES DE LA DEPENDENCIA NUEVA QUE CREE//
//INSTALO LA DEPENDENCIA CREADA (npm i calculadoralucasdelbene)

//IMPORTO LAS FUNCIONES DE calculadoralucasdelbene PARA PODER UTILIZARLAS//
import {suma,resta,multiplicacion,division,modulo} from 'calculadoralucasdelbene';

//IMPORTO express PARA PODER UTILIZARLO//
import express from 'express';
const app = express();

//CREO ENDPOINTS PARA CADA OPERACION//
//OPERACION SUMA//
app.get('/suma',(peticion,respuesta)=>{
    respuesta.send(`<h1 style="text-align:center; margin-top:50px; font-family: Georgia, 'Times New Roman', Times, serif;">RESULTADO DE LA OPERACION SUMA: ${suma(10,10)}</h1>`);
})

//OPERACION RESTA//
app.get('/resta',(peticion,respuesta)=>{
    respuesta.send(`<h1 style="text-align:center; margin-top:50px; font-family: Georgia, 'Times New Roman', Times, serif;">RESULTADO DE LA OPERACION RESTA: ${resta(10,10)}</h1>`);
})

//OPERACION MULTIPLICACION//
app.get('/multiplicacion',(peticion,respuesta)=>{
    respuesta.send(`<h1 style="text-align:center; margin-top:50px; font-family: Georgia, 'Times New Roman', Times, serif;">RESULTADO DE LA OPERACION MULTIPLICACION: ${multiplicacion(10,10)}</h1>`);
})

//OPERACION DIVISION//
app.get('/division',(peticion,respuesta)=>{
    respuesta.send(`<h1 style="text-align:center; margin-top:50px; font-family: Georgia, 'Times New Roman', Times, serif;">RESULTADO DE LA OPERACION DIVISION: ${division(10,10)}</h1>`);
})

//OPERACION MODULO//
app.get('/modulo',(peticion,respuesta)=>{
    respuesta.send(`<h1 style="text-align:center; margin-top:50px; font-family: Georgia, 'Times New Roman', Times, serif;">RESULTADO DE LA OPERACION MODULO: ${modulo(10,10)}</h1>`);
})

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO,()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));

