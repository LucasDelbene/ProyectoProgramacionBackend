//DESAFIO GENERICO - CARPETA PUBLIC//

//PARTIENDO DEL EJERCICIO ANTERIOR, GENERE UNA CARPETA PUBLICA 'public' EN EL SERVIDOR, LA CUAL TENDRA UN ARCHIVO 'index.html'//
//EN ESE ARCHIVO SE ENCONTRARAN DOS FORMULARIOS: UNO QUE PERMITA INGRESAR MASCOTAS y OTRO PERSONAS UTILIZANDO EL METODO post//
//LUEGO PROBE EL INGRESO DE DATOS MEDIANTE LOS FORMULARIOS y CON POSTMAN//

//REQUIERO express PARA PODER UTILIZARLO//
const express = require('express');
const app = express();

//DECLARO ESTO PARA QUE NUESTRO SERVIDOR INTERPRETE DE FORMA AUTOMATICA MENSAJES DE TIPO JSON EN FORMATO urlencoded AL RECIBIRLOS//
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//UTILIZO express.static PARA PODER BUSCAR LOS ARCHIVOS RELATIVOS AL DIRECTORIO ESTATICO COMO POR EJEMPLO IMAGENES, ARCHIVOS CSS o JS//
app.use('/estudiantes', express.static('public'));  //CARPETA 'public'
app.use(express.static('html'));    //CARPETA 'html'

//CREO UNA VARIABLE LLAMADA serverRutas LA CUAL ES EL CONTROLADOR DE RUTAS//
let serverRutas = require('./routes');
serverRutas(app);

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO, ()=> console.log(`Servidor escuchandose en http://localhost:${PUERTO}`))
