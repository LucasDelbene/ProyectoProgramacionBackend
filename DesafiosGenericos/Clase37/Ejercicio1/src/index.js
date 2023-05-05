//DESAFIO GENERICO CREAR PROYECTO CON YARN (CLASE 37)//

// 1) INSTALE EL GESTOR DE PAQUETES YARN CON NPM DE MANERA GLOBAL (npm i -g yarn) //
// 2) VERIFIQUE LA VERSION INSTALADA DE YARN (yarn -v) (Version 1.22.19) //
// 3) CREO UN PROYECTO DE NODE.JS UTILIZANDO YARN //
// 4) INSTALO EXPRESS UTILIZANDO YARN (yarn add express) //
// 5) CREO UN SERVIDOR EXPRESS QUE DEVUELVA EN SU RUTA RAIZ EL MENSAJE: "HOLA YARN" //
// 6) CREO UN SCRIPT START QUE EJECUTE NODEMON CON EL PUNTO DE ENTRADA DEL SERVIDOR ("start": "nodemon ./src/index.js") //
// 7) EJECUTO EL SCRIPT START CON YARN (yarn start) //

//IMPORTO express PARA PODER UTILIZARLO//
import express from 'express';
const app = express();

//CREO UNA RUTA RAIZ QUE DEVUELVE EL MENSAJE "HOLA YARN"//
app.get('/',(peticion,respuesta)=>{
    respuesta.send('HOLA YARN')
})

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO,()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));
