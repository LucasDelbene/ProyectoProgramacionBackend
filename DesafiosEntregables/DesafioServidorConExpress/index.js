//DESAFIO ENTREGABLE - SERVIDOR CON EXPRESS//

//REQUIERO LA CLASE CONTENEDOR y CREO UN NUEVO ARCHIVO DE TEXTO LLAMADO productos.txt//
const Contenedor = require('./contenedor.js');          
const productos = new Contenedor('productos.txt')

//REQUIERO express PARA PODER UTILIZARLO//
let express = require('express');
let app = express();

app.get('/', async (peticion, respuesta)=>{
    respuesta.send('<h3>BIENVENIDOS A MI RUTA RAIZ DEL DESAFIO ENTREGABLE SERVIDOR CON EXPRESS</h3>');
})

//CREO LA RUTA productos QUE ME DEVUELVE UN ARRAY CON TODOS LOS PRODUCTOS DISPONIBLES EN EL SERVIDOR//
app.get('/productos', async (peticion, respuesta)=>{
    const todosLosProductos = await productos.getAll();
    respuesta.send(todosLosProductos);
})

//CREO LA RUTA productoRandom QUE ME DEVUELVE UN PRODUCTO ELEGIDO AL AZAR ENTRE TODOS LOS PRODUCTOS DISPONIBLES//
app.get('/productoRandom', async (peticion, respuesta)=>{
    const producto = await productos.getProductoRandom();
    respuesta.send(producto);
})

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO, ()=> console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));