//DESAFIO GENERICO - CHAT COLABORATIVO//

//EN BASE A LO DESARROLLADO EN CLASE, TENGO QUE REALIZAR UNA APLICACION BASADA EN node.js, express y websocket QUE PERMITA GENERAR UN CHAT COLABORATIVO ENTRE USUARIOS CONECTADOS//

//REQUIERO express PARA PODER UTILIZARLO//
const express = require('express');
const app = express();

//REQUIERO path PORQUE VAMOS A UTILIZAR RUTAS DINAMICAS//
const path = require('path');

//REQUIERO UN SERVIDOR HTTP//
const {Server: HttpServer} = require('http');
const httpServer = new HttpServer(app);

//DECLARO ESTO PARA QUE NUESTRO SERVIDOR INTERPRETE DE FORMA AUTOMATICA MENSAJES DE TIPO JSON EN FORMATO urlencoded AL RECIBIRLOS//
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//UTILIZO express.static PARA PODER BUSCAR LOS ARCHIVOS RELATIVOS AL DIRECTORIO ESTATICO COMO POR EJEMPLO IMAGENES, ARCHIVOS CSS o JS//
app.use(express.static('./public'));  //CARPETA 'public'

//CREO EL METODO app.set('views', path) PARA ESPECIFICAR LA CARPETA DE PLANTILLAS, EN ESTE CASO 'views'//
app.set('views', path.join(__dirname, 'views'));
//CREO EL METODO app.set('view engine', name) PARA REGISTRAR EL MOTOR DE PLANTILLAS, EN ESTE CASO 'ejs'//
app.set('view engine', 'ejs');

//CREO UNA VARIABLE LLAMADA serverRutas LA CUAL ES EL CONTROLADOR DE RUTAS//
const serverRutas = require('./routes');
serverRutas(app);

//REQUIERO sockets DE LA CARPETA utils PARA PODER UTILIZARLO//
const Socket = require('./utils/sockets')
const iniciarSocket = new Socket(httpServer);
iniciarSocket.init();

//CONEXION AL SERVIDOR//
const PUERTO = process.env.PUERTO || 8080;
httpServer.listen(PUERTO, ()=> console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));