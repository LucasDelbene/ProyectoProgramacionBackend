//DESAFIO ENTREGABLE - PRIMERA BASE DE DATOS//

//REQUIERO express PARA PODER UTILIZARLO//
const express = require('express');
const app = express();

//REQUIERO http y socket.io PARA PODER UTILIZARLOS//
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//DECLARO ESTO PARA QUE NUESTRO SERVIDOR INTERPRETE DE FORMA AUTOMATICA MENSAJES DE TIPO JSON EN FORMATO urlencoded AL RECIBIRLOS//
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//UTILIZO express.static PARA PODER BUSCAR LOS ARCHIVOS RELATIVOS AL DIRECTORIO ESTATICO COMO POR EJEMPLO IMAGENES, ARCHIVOS CSS o JS//
app.use(express.static('./public'));  //CARPETA 'public'

//CREO EL METODO app.set('views', path) PARA ESPECIFICAR LA CARPETA DE PLANTILLAS, EN ESTE CASO './views'//
app.set('views', './views');
//CREO EL METODO app.set('view engine', name) PARA REGISTRAR EL MOTOR DE PLANTILLAS, EN ESTE CASO 'ejs'//
app.set('view engine', 'ejs');

//CREO UNA VARIABLE LLAMADA usuarios CON UN ARRAY//
let usuarios = [];

//CRUD DB//
const {seleccionarTodosLosProductos} = require('./db/seleccionarTodosLosProductos');
const {insertarProducto} = require('./db/insertarProducto');
const {seleccionarTodosLosMensajes} = require('./db/seleccionarTodosLosMensajes');
const {insertarMensaje} = require('./db/insertarMensaje');

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

//SOCKETS PRODUCTOS//
io.on('connection', socket =>{
    socket.on('enviarProducto', async () =>{
        try{
            const todosLosProductosDB = await seleccionarTodosLosProductos();

            //SE ENVIAN TODOS LOS MENSAJES AL USUARIO QUE SE CONECTO//
            socket.emit('todosLosProductos', todosLosProductosDB);
        }catch(error){
            console.log(`ERROR ${error}`);
        }
    });

    socket.on('agregarProductos', async data =>{
        try{
            const nuevoProducto = {
                nombre: `${data.nombre}`,
                precio: Number(data.precio),
                imagen: `${data.imagen}`
            };

            const producto = await insertarProducto(nuevoProducto);

            //ENVIO EL PRODUCTO NUEVO A TODOS LOS CLIENTES CONECTADOS//
            io.sockets.emit('actualizarTabla', [producto]);
        }catch(error){
            console.log(`ERROR ${error}`);
        }
    });
});

//SOCKETS CHAT//
io.on('connection', socket =>{
    //CLIENTE UNIENDOSE AL EVENTO DEL CHAT//
    socket.on('unirseChat', async ({nombreUsuario}) => {
        usuarios.push({
            id: socket.id,
            nombreUsuario: nombreUsuario,
            avatar: "https://cdn-icons-png.flaticon.com/128/64/64572.png"
        });

        //EL SERVIDOR DA LA BIENVENIDA AL USUARIO QUE SE CONECTA//
        socket.emit('notificacion', `Bienvenido ${nombreUsuario}`);

        try{
            const todosLosMensajesDB = await seleccionarTodosLosMensajes();

            //SE ENVIAN TODOS LOS MENSAJES AL USUARIO QUE SE CONECTO//
            socket.emit('todosLosMensajes', todosLosMensajesDB);
        }catch(error){
            return res.status(404).json({
                error: `ERROR ${error}`
            });
        }

        //EL SERVIDOR DA LA BIENVENIDA A TODOS LOS USUARIOS MENOS AL QUE INICIO LA CONEXION//
        socket.broadcast.emit('notificacion', `${nombreUsuario} se ha unido al chat`);

        //EL SERVIDOR ENVIA A TODOS LOS USUARIOS LA LISTA ACTUALIZADA DE PARTICIPANTES//
        io.sockets.emit('usuarios', usuarios);
    });

    
    //EVENTO DE ENTRADA DE MENSAJE//
    socket.on('mensajeInput', async data =>{
        const hora = new Date();
        const usuario = usuarios.find(usuario => usuario.id === socket.id);

        const mensajeDB = {
            texto: data,
            tiempo: `${hora.getHours()}:${hora.getMinutes()}`,
            email: usuario.nombreUsuario,
            usuario
        };

        //EL SERVIDOR ENVIA EL MENSAJE//
        socket.emit('mensaje', mensajeDB);
        socket.broadcast.emit('mensaje', mensajeDB);

        await insertarMensaje(mensajeDB);
    });

    //DESCONEXION DE USUARIO//
    socket.on('disconnect', reason =>{
        const usuario = usuarios.find(usuario => usuario.id === socket.id);
        usuarios = usuarios.filter(usuario => usuario.id !== socket.id);

        if(usuario){
            socket.broadcast.emit('notificacion', `${usuario.nombreUsuario} se ha ido del chat`);
        }

        io.sockets.emit('usuarios', usuarios);
    });
});

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
httpServer.listen(PUERTO, () => console.log(`Servidor escuchando en http://localhost:${PUERTO}`));