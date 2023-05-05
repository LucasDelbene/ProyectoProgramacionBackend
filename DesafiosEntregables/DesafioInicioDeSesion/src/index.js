//DESAFIO ENTREGABLE - INICIO DE SESION//

//REQUIERO faker y express PARA PODER UTILIZARLOS//
const express = require('express');
const app = express();

//REQUIERO faker PARA PODER UTILIZARLO//
const faker = require('@faker-js/faker')

//REQUIERO connect-mongo, express-session y Router DE express PARA PODER UTILIZARLOS//
const MongoStore = require('connect-mongo');
const session = require('express-session');
const {Router} = require('express');

//REQUIERO UN SERVIDOR HTTP//
const {Server: HttpServer} = require('http');
const httpServer = new HttpServer(app);

//REQUIERO socket.io PARA PODER UTILIZARLO//
const {Server: IOServer} = require('socket.io');
const io = new IOServer(httpServer);

//UTILIZO express.static PARA PODER BUSCAR LOS ARCHIVOS RELATIVOS AL DIRECTORIO ESTATICO COMO POR EJEMPLO IMAGENES, ARCHIVOS CSS o JS//
app.use(express.static('./public'));  //CARPETA 'public'

//DECLARO ESTO PARA QUE NUESTRO SERVIDOR INTERPRETE DE FORMA AUTOMATICA MENSAJES DE TIPO JSON EN FORMATO urlencoded AL RECIBIRLOS//
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//CREO EL METODO app.set('views', path) PARA ESPECIFICAR LA CARPETA DE PLANTILLAS, EN ESTE CASO './views'//
app.set('views', './views');
//CREO EL METODO app.set('view engine', name) PARA REGISTRAR EL MOTOR DE PLANTILLAS, EN ESTE CASO 'ejs'//
app.set('view engine', 'ejs');

//REQUIERO LOS CONTENEDORES DE chat y producto//
const ContenedorP = require('./Contenedores/contenedorProducto.js');
const ContenedorC = require('./Contenedores/contenedorChat.js');
let contenedorProductos = new ContenedorP(`./Contenedores/productos.txt`);
let contenedorChat = new ContenedorC(`./Contenedores/mensajes.txt`);

//CREO UNA VARIABLE LLAMADA usuarios CON UN ARRAY//
let usuarios = [];

//CREO LA RUTA PRINCIPAL CON EL METODO get//
app.get('/', (peticion, respuesta) => {
    const data = {
        title: "DESAFIO ENTREGABLE - LOGIN FORMULARIO",
    }
    return respuesta.render('index', data);
});

//CREO LA RUTA DE FORMULARIO CON EL METODO get//
app.get('/formulario', (peticion, respuesta) => respuesta.render('formularioProductos'));

//CREO LA RUTA DE LOGIN CON EL METODO get//
app.get('/acceso', (peticion, respuesta) => respuesta.render('acceso'));

//CREO LA RUTA DE LOGIN CON EL METODO post//
app.post('/acceso', (peticion, respuesta) => {
    const {nombreUsuario} = peticion.body;
    return respuesta.redirect(`/chat?nombreUsuario=${nombreUsuario}`);
});

//CREO LA RUTA DE CHAT CON EL METODO get//
app.get('/chat', (peticion, respuesta) => respuesta.render('chat'));

//---------- CODIGO DEL DESAFIO LOGIN por FORMULARIO ----------//
const ruta = Router();

//IMPORTACION DE RUTAS//
const rutaInicio = require('./routers/rutaInicio.js');
app.use('/', rutaInicio); 

//OPCIONES MONGO//
opcionesMongo = {useNewUrlParser:true, useUnifiedTopology:true};

app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://LucasDelbene:776@clase24-programacionbac.13mdabl.mongodb.net/DesafioLoginFormulario?retryWrites=true&w=majority",
        mongoOptions: opcionesMongo,
        ttl:3600
    }),
    secret: '123456',
    resave: true,
    saveUninitialized: true
}));

//RUTA '/loginSession' CON METODO GET//
app.use('/', ruta);
ruta.get('/loginSession', (peticion, respuesta) =>{
    respuesta.render("loginSession");
    peticion.session.destroy(error =>{
        if(!error){
            console.log('TODO PERFECTO')
        }else{
            console.log('ERROR')
        }
    });
});

//RUTA '/registro' CON METODO GET//
ruta.get('/registro', (peticion, respuesta) =>{
    respuesta.render("registro");
    peticion.session.destroy(error =>{
        if(!error){
            console.log('TODO PERFECTO')
        }else{
            console.log('ERROR')
        }
    });
});

//RUTA '/logout' CON METODO GET//
ruta.get('/logout', (peticion, respuesta) =>{
    usuarioLogout = peticion.session.usuario;
    respuesta.render("logout", {usuarioLogout});

    peticion.session.destroy(error =>{
        if(!error){
            console.log('TODO PERFECTO')
        }else{
            console.log('ERROR')
        }
    });
});

//CONEXION DEL USUARIO//
io.on('connection', socket => {
    //SOCKET PARA ENVIAR PRODUCTOS//
    socket.on('enviarProducto', () => {
        ; (async () => {
            try{
                todosLosProductos = await contenedorProductos.getAll();

                //EL SERVIDOR ENVIA TODOS LOS MENSAJES AL USUARIO QUE SE CONECTO//
                socket.emit('todosLosProductos', todosLosProductos);
            }catch(error){
                return respuesta.status(404).json({
                    error: `ERROR ${error}`
                });
            }
        })();
    });

    //SOCKET PARA AGREGAR PRODUCTOS//
    socket.on('agregarProductos', data => {
        ; (async () => {
            const nuevoProducto = {
                nombre: `${data.nombre}`,
                precio: Number(data.precio),
                imagen: `${data.imagen}`
            };
            const id = await contenedorProductos.save(nuevoProducto);
            const producto = await contenedorProductos.getById(id);

            //ENVIO EL PRODUCTO NUEVO A TODOS LOS CLIENTES CONECTADOS//
            io.sockets.emit('actualizarTabla', producto);
        })();
    });


    //CLIENTE UNIENDOSE AL EVENTO DEL CHAT//
    socket.on('unirseChat', ({nombreUsuario}) => {
        ; (async () => {
            usuarios.push({
                id: socket.id,
                nombreUsuario: nombreUsuario,
                avatar: "https://cdn-icons-png.flaticon.com/128/64/64572.png"
            });

            //EL SERVIDOR DA LA BIENVENIDA AL USUARIO QUE SE CONECTA//
            socket.emit('notificacion', `Bienvenido ${nombreUsuario}`);

            try{
                todosLosMensajes = await contenedorChat.getAll();
                //EL SERVIDOR ENVIA TODOS LOS MENSAJES AL USUARIO QUE SE CONECTO//
                socket.emit('todosLosMensajes', todosLosMensajes);
            }catch(error){
                return respuesta.status(404).json({
                    error: `ERROR ${error}`
                });
            }

            //EL SERVIDOR DA LA BIENVENIDA A TODOS LOS USUARIOS MENOS AL QUE INICIO LA CONEXION//
            socket.broadcast.emit('notificacion', `${nombreUsuario} se ha unido al chat`);
            //EL SERVIDOR ENVIA A TODOS LOS USUARIOS LA LISTA ACTUALIZADA DE PARTICIPANTES//
            io.sockets.emit('usuarios', usuarios);
        })();
    });

    //EVENTO DE ENTRADA DE MENSAJE//
    socket.on('mensajeInput', data => {
        ; (async () => {
            const hora = new Date();
            const usuario = usuarios.find(usuario => usuario.id === socket.id);
            const mensaje = {
                texto: data,
                tiempo: `${hora.getHours()}:${hora.getMinutes()}`,
                usuario
            };

            //EL SERVIDOR ENVIA UN MENSAJE//
            socket.emit('mensaje', mensaje);
            socket.broadcast.emit('mensaje', mensaje);
            await contenedorChat.save(mensaje);
        })();
    });

    //DESCONEXION DE USUARIO//
    socket.on('disconnect', reason => {
        const usuario = usuarios.find(usuario => usuario.id === socket.id);
        usuarios = usuarios.filter(usuario => usuario.id !== socket.id);

        if(usuario){
            socket.broadcast.emit('notificacion', `${usuario.nombreUsuario} se ha ido del chat`);
        }
        io.sockets.emit('usuarios', usuarios);
    });

});

//CONEXION AL SERVIDOR//
const PORT = 8080;
httpServer.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));