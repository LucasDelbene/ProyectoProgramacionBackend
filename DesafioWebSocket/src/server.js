//SERVER DESAFIO WEBSOCKET - PROGRAMACION BACKEND//
const express = require('express');
const app = express();

//CONFIGURANDO HANDLEBARS//
const handlebars = require("express-handlebars");
const hbs = handlebars.create({
})

//APLICANDO REQUIRES E INSTANCIAS//
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');
const Producto = require('../api/js/productos');
const Mensaje = require('../api/js/mensajes');

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const productos = new Producto('./api/txt/productos.txt')
const mensajes = new Mensaje('./api/txt/mensajes.txt')

//CONFIGURO EL MOTOR DE PLANTILLAS Y UTILIZO APP, SET, ENGINE y USE//
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './public/views');

//UTILIZO GET y SOCKETS//
app.get('/', (req, res) => {
    res.render('index', {})
})
io.on('connection', async socket => {
    socket.emit('update_products', await productos.getAll());
    socket.emit('update_messages', await mensajes.getAll());

    socket.on('new_product', async product => {
        await productos.guardarProducto(product)
        io.emit('update_products', await productos.getAll())
    })
    socket.on('new_message', async message => {
        await mensajes.save(message)
        io.emit('update_messages', await mensajes.getAll())
    })
})

//CONECTANDO AL SERVIDOR//
const PUERTO = 8080;
const conectarServidor = httpServer.listen(PUERTO, () => {
    console.log(`Servidor escuchandose en http://localhost:${PUERTO}`)
});
conectarServidor.on(
    'error', error => console.log(`ERROR EN EL SERVIDOR: ${error}`)
)

