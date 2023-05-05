//DESAFIO SEGUNDA ENTREGA PROYECTO FINAL//

//REQUIERO express PARA PODER UTILIZARLO//
const express = require('express');
const app = express();

//DECLARO ESTO PARA QUE NUESTRO SERVIDOR INTERPRETE DE FORMA AUTOMATICA MENSAJES DE TIPO JSON EN FORMATO urlencoded AL RECIBIRLOS//
app.use(json());
app.use(urlencoded({ extended: true }));

//RUTA DE productos y carrito//
import rutaProductos from './routers/rutaProductos';
import rutaCarrito from './routers/rutaCarrito';
app.use(`/api/productos`, rutaProductos);
app.use(`/api/carrito`, rutaCarrito);

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO, ()=> console.log(`Servidor escuchandose en http://localhost:${PUERTO}`))
