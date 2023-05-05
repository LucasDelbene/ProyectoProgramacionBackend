//DESAFIO GENERICO - CHILD_PROCESS CON FORK//
//LEVANTO UN APLICATIVO PARA COMPROBAR SI SE PUEDE APLICAR EN UN SERVIDOR//

//IMPORTO express PARA PODER UTILIZARLO//
import express from 'express';
const app = express();

//IMPORTO fork DE child_process PARA PODER UTILIZARLO//
import {fork} from 'child_process'; //GENERA UN DUPLICADO DEL PROCESO ACTUAL 

//DECLARO UN CONTADOR IGUAL A CERO//
let contador = 0;
 
//ESTE CALCULO PESADO VA A IR SUMANDO NUMERO x NUMERO x NUMERO y ASI SUCESIVAMENTE//
const calculoPesado = ()=>{
    let suma = 0;
    for(let i=0; i<6e9; i++){
        suma+=1
    }
    return suma;
}

//CREO LA RUTA PRINCIPAL CON METODO GET//
app.get('/',(peticion,respuesta)=>{
    respuesta.send(`<h1 style="text-align:center; margin:50px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">ESTA PAGINA SE HA VISITADO ${++contador} VECES</h1>`)
})

//CREO LA RUTA CALCULAR CON METODO GET//
app.get('/calcular',(peticion,respuesta)=>{
    const resultado = calculoPesado();
    respuesta.send(`<h1 style="text-align:center; margin:50px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">LA SUMA PESADA ES ${resultado}</h1>`)
})

//CREO LA RUTA CALCULAR CON FORK CON METODO GET//
app.get('/calcularConFork',(peticion,respuesta)=>{
    const childProcess = fork('./calculoPesado.js');  //PRIMERO NECESITO UN PROCESO HIJO (CHILD PROCESS), LA CUAL VA A HACER UN FORKEO DEL ARCHIVO calculoPesado.js
    childProcess.send('EJECUTATE POR FAVOR, GRACIAS') //CON childProcess.send() ESTOY INDICANDOLE QUE LE MANDE AL PROCESO HIJO UNA DIRECTIVA 
    
    //CON childProcess.on() ESTOY INDICANDOLE QUE SI RECIBE DEL PROCESO HIJO UN MENSAJE, QUIERO QUE AL VALOR DE ESE MENSAJE ME LO MUESTRE//
    childProcess.on('message', valor=>{
        respuesta.send(`<h2 style="text-align:center; margin:50px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">EL VALOR DE LA SUMA PESADA ES ${valor}</h2>`)
    })                                 
})

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO,()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));
