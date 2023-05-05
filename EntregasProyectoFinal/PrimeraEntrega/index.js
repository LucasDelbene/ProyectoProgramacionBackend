//DESAFIO PRIMERA ENTREGA PROYECTO FINAL//

//TENGO QUE ENTREGAR EL ESTADO DE AVANCE DE TU APLICACION eCommerce Backend, QUE IMPLEMENTE UN SERVIDOR DE APLICACION BASADO EN LA PLATAFORMA node.js y EL MODULO express//
//EL SERVIDOR IMPLEMENTARA DOS CONJUNTOS DE RUTAS AGRUPADAS EN routers, UNO CON LA URL BASE '/productos' y EL OTRO CON '/carrito'//
//EL PUERTO DE ESCUCHA SERA 8080 PARA DESARROLLO y process.env.PUERTO PARA PRODUCCION EN glitch.com//

//REQUIERO express PARA PODER UTILIZARLO//
const express = require('express');
const app = express();

//REQUIERO Router DE express PARA PODER UTILIZARLO//
const {Router} = express;

//DECLARO ESTO PARA QUE NUESTRO SERVIDOR INTERPRETE DE FORMA AUTOMATICA MENSAJES DE TIPO JSON EN FORMATO urlencoded AL RECIBIRLOS//
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//UTILIZO express.static PARA PODER BUSCAR LOS ARCHIVOS RELATIVOS AL DIRECTORIO ESTATICO COMO POR EJEMPLO IMAGENES, ARCHIVOS CSS o JS//
app.use(express.static('public'));  //CARPETA 'public'

//IMPORTO LAS RUTAS//
const rutaProductos = require("./routes/rutaProductos");
const rutaCarrito = require("./routes/rutaCarrito");

//RUTAS DE productos y carrito//
app.use('/api/productos', rutaProductos);
app.use('/api/carrito', rutaCarrito);

//EN EL CASO DE RECIBIR UNA peticion A UNA RUTA NO PERMITIDA POR EL PERFIL, DEVUELVO EL SIGUIENTE OBJETO DE ERROR//
app.use((peticion, respuesta, next) => {
    respuesta.status(404).json({ error: -2, descripcion: `Ruta ${peticion.originalUrl} metodo ${peticion.method} no implementada` });
});

//CONEXION AL SERVIDOR//
const PUERTO = process.env.PUERTO || 8080;
const server = app.listen(PUERTO, () => console.log(`Servidor escuchandose en http://localhost:${PUERTO}`))
server.on(`error`, error => console.log(`ERROR EN EL SERVIDOR ${error}`));






