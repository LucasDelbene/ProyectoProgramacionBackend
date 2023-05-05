//DESAFIO GENERICO - EXPRESS ROUTER//

//CREARE UN SERVIDOR QUE PERMITA MANEJAR UNA LISTA DE MASCOTAS y PERSONAS, EN DONDE DEBE POSEER DOS RUTAS PRINCIPALES '/mascotas' y '/personas' LAS CUALES DEBEN INCLUIR METODOS PARA LISTAR Y AGREGAR RECURSOS//

//REQUIERO express PARA PODER UTILIZARLO//
const express = require('express');
const app = express();

//DECLARO ESTO PARA QUE NUESTRO SERVIDOR INTERPRETE DE FORMA AUTOMATICA MENSAJES DE TIPO JSON EN FORMATO urlencoded AL RECIBIRLOS//
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//CREO UNA VARIABLE LLAMADA serverRutas LA CUAL ES EL CONTROLADOR DE RUTAS//
let serverRutas = require('./routes');
serverRutas(app);

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO, ()=> console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));