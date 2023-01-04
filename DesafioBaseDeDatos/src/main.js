const express = require('express');
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');

//INSTANCIAS//
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//MIDDLEWARES//
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//CONFIGURO MOTOR DE PLANTILLAS//
app.set('views', './views');
app.set('view engine', 'ejs');

//CRUD DB//
const {seleccionarTodosLosProductos} = require('./db/seleccionarTodosLosProductos.js');
const {insertarProductos} = require('./db/insertarProductos.js');
const {seleccionarTodosLosMensajes} = require('./db/seleccionarTodosLosMensajes.js');
const {insertarMensajes} = require('./db/insertarMensajes.js');

//IMPORTACION DE RUTAS//
const rutaInicio = require('./routers/rutaInicio');
const rutaFormulario = require('./routers/rutaFormulario');
const rutaAccesoGet = require('./routers/rutaAccesoGet');
const rutaAccesoPost = require('./routers/rutaAccesoPost');
const rutaChat = require('./routers/rutaChat');

//RUTAS//
app.use('/', rutaInicio);
app.use('/formulario', rutaFormulario);
app.use('/acceso', rutaAccesoGet);
app.use('/acceso', rutaAccesoPost);
app.use('/chat', rutaChat);



//CONFIGURO SOCKETS//
let usuarios = [];
//SOCKET PRODUCTOS//
io.on('connection', socket => {
    socket.on('enviarProducto', async () => {
        try{
            const productosDB = await seleccionarTodosLosProductos();

            //SE ENVIAN TODOS LOS MENSAJES AL USUARIO QUE SE CONECTO//
            socket.emit('todosLosProductos', productosDB);
        }catch(err){
            console.log(`ERROR: ${err}`);
        }
    });

    socket.on('agregarProductos', async data => {
        try{
            const nuevoProducto = {
                title: `${data.nombre}`,
                precio: Number(data.precio),
                imagen: `${data.imagen}`
            };

            const producto = await insertarProductos(nuevoProducto);

            //ENVIO EL PRODUCTO NUEVO A TODOS LOS CLIENTES CONECTADOS//
            io.sockets.emit('actualizarTabla', [producto]);

        }catch(err){
            console.log(`ERROR: ${err}`);
        }
    });
});

//SOCKET CHAT//
io.on('connection', socket => {
    //EL CLIENTE SE UNE AL CHAT//
    socket.on('unirseAlChat', async ({nombreUsuario}) => {
        usuarios.push({
            id: socket.id,
            nombreUsuario: nombreUsuario,
            avatar: "https://cdn-icons-png.flaticon.com/512/456/456141.png"
        });

        //EL SERVIDOR DA LA BIENVENIDA AL USUARIO QUE SE CONECTO//
        socket.emit('notificacion', `Bienvenido ${nombreUsuario}`);

        try{
            const mensajesDB = await seleccionarTodosLosMensajes();

            //SE ENVIAN TODOS LOS MENSAJES AL USUARIO QUE SE CONECTO//
            socket.emit('todosLosMensajes', mensajesDB);
        }catch(err){
            return res.status(404).json({
                error: `ERROR: ${err}`
            });
        }

        //LE DOY LA BIENVENIDA A TODOS LOS USUARIOS MENOS AL QUE INICIO LA CONEXION//
        socket.broadcast.emit('notificacion', `${nombreUsuario} SE HA UNIDO AL CHAT`);

        //ENVIO A TODOS LOS USUARIOS LA LISTA ACTUALIZADA DE PARTICIPANTES//
        io.sockets.emit('usuarios', usuarios);
    });

    //ACA SE GENERA EL EVENTO DE mensajeInput//
    socket.on('mensajeInput', async data => {

        const tiempoAhora = new Date();
        const usuario = usuarios.find(usuario => usuario.id === socket.id);

        const mensajeDB = {
            text: data,
            time: `${tiempoAhora.getHours()}:${tiempoAhora.getMinutes()}`,
            email: usuario.nombreUsuario
        };

        //ENVIO MENSAJE//
        socket.emit('mensaje', mensajeDB);
        socket.broadcast.emit('mensaje', mensajeDB);
        await insertarMensajes(mensajeDB);
    });

    //CUANDO UN CLIENTE SE DESCONECTA EJECUTO ESTO//
    socket.on('disconnect', reason => {
        const usuario = usuarios.find(usuario => usuario.id === socket.id);
        usuarios = usuarios.filter(usuario => usuario.id !== socket.id);

        if(usuario){
            socket.broadcast.emit('notificacion', `${usuario.nombreUsuario} SE HA IDO DEL CHAT`);
        }

        io.sockets.emit('usuarios', usuarios);
    });
});


//INICIO SERVIDOR//
const PUERTO = 8080;
const conectarServidor = httpServer.listen(PUERTO, () =>{
    console.log(`Servidor escuchandose en http://localhost:${PUERTO}`)
})
conectarServidor.on(
    'error', error => console.log(`Error en el servidor: ${error}`)
)