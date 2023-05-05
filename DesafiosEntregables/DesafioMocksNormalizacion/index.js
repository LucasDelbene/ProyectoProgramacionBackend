//DESAFIO ENTREGABLE - MOCKS y NORMALIZACION//

//IMPORTO express PARA PODER UTILIZARLO//
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

//REQUIERO mongoose PARA PODER UTILIZARLO//
const mongoose = require('mongoose');
const MessageDAOMongoDB = require('./daos/MessageDAOMongoDB.js');

//REQUIERO normalizr y util PARA PODER UTILIZARLOS//
const normalizr = require('normalizr');
const {normalize, denormalize, schema } = require('normalizr');
const util = require('util');

let usuarios = [];

//CRUD DB//
const {seleccionarTodosLosProductos} = require('./db/seleccionarTodosLosProductos.js');
const {insertarProducto} = require('./db/insertarProducto.js');

//IMPORTACION DE RUTAS//
const rutaInicio = require('./routers/rutaInicio.js');
const rutaFormulario = require('./routers/rutaFormulario.js');
const rutaAccesoGet = require('./routers/rutaAccesoGet.js');
const rutaAccesoPost = require('./routers/rutaAccesoPost.js');
const rutaChat = require('./routers/rutaChat.js');
const rutaFaker = require('./routers/rutaFaker.js');

//RUTAS//
app.use('/', rutaInicio);
app.use('/formulario', rutaFormulario);
app.use('/acceso', rutaAccesoGet);
app.use('/acceso', rutaAccesoPost);
app.use('/chat', rutaChat);
app.use('/api/productos-test', rutaFaker);

//INSTANCIA DE CONTENEDORES//
const storageMensajes = new MensajeDAOMongoDB();

//SOCKETS PRODUCTOS//
io.on('connection', socket => {
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
            const todosLosMensajesDB = await storageMensajes.getAll();

            const dataJson ={
                "id": 1,
                "mensajes": [
                    {
                        "id": "lucasdelbene@gmail.com",
                        "autor": {
                            "id": "lucasdelbene@gmail.com",
                            "nombre": "Lucas",
                            "apellido": "Delbene",
                            "alias": "Alias de Lucas",
                            "edad": 20,
                            "avatar": "Avatar de Lucas"
                        },
                        "texto": {
                            "id": 1,
                            "mensaje": "Bienvenidos a mi Desafio Entregable Mocks y Normalizacion"
                        }
                    },
                    {
                        "id": "lionelmessi@gmail.com",
                        "author": {
                            "id": "lionelmessi@gmail.com",
                            "nombre": "Lionel",
                            "apellido": "Messi",
                            "alias": "Alias de Messi",
                            "edad": 35,
                            "avatar": "Avatar de Messi"
                        },
                        "text": {
                            "id": 2,
                            "mensaje": "Muchas gracias Lucas, esta muy bien hecho"
                        }
                    },
                    {
                        "id": "neymar@gmail.com",
                        "author": {
                            "id": "neymar@gmail.com",
                            "nombre": "Neymar",
                            "apellido": "JR",
                            "alias": "Alias de Neymar",
                            "edad": 31,
                            "avatar": "Avatar de Neymar"
                        },
                        "text": {
                            "id": 3,
                            "mensaje": "Muito obrigado Lucas, com Messi te convidamos para um jogo do PSG tudo pago"
                        }
                    },
                    {
                        "id": "lucasdelbene@gmail.com",
                        "author": {
                            "id": "lucasdelbene@gmail.com",
                            "nombre": "Lucas",
                            "apellido": "Delbene",
                            "alias": "Alias de Lucas",
                            "edad": 20,
                            "avatar": "Avatar de Lucas"
                        },
                        "text": {
                            "id": 4,
                            "mensaje": "Muchas gracias por la invitacion"
                        }
                    }
                ]
            };

            //NORMALIZO LA INFORMACION//
            normalizar(dataJson);

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
        const usuario = usuarios.find(usuario => usuario.id === socket.id);

        const nuevoMensaje = {
            id: usuario.nombreUsuario,
            autor: {
                id: usuario.nombreUsuario,
                nombre: 'Nombre del Usuario',
                apellido: 'Apellido del Usuario',
                edad: 'Edad del Usuario',
                alias: 'Alias del Usuario',
                avatar: 'Avatar del Usuario'
            },
            texto: {
                id: mongoose.Types.ObjectId().toString(),
                mensaje: data,
            }
        }
        await storageMensajes.save(nuevoMensaje);

        //EL SERVIDOR ENVIA EL MENSAJE//
        socket.emit('mensaje', nuevoMensaje);
        socket.broadcast.emit('mensaje', nuevoMensaje);
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

const print = (objeto) => {
    console.log(util.inspect(objeto, false, 12, true));
}

const normalizar = (inMensaje) => {

    const autorSchema = new normalizr.schema.Entity('autor');
    const textoSchema = new normalizr.schema.Entity('texto');

    const mensajeSchema = new normalizr.schema.Entity('mensaje', {
        autor: autorSchema,
        mensaje: textoSchema,
    });

    chatSchema = new normalizr.schema.Entity('chat', {
        mensajes: [mensajeSchema]
    });

    //NORMALIZO y DESNORMALIZO CHAT//
    const normalizarChat = normalizr.normalize(inMensaje, chatSchema);
    const desnormalizarChat = normalizr.denormalize(normalizarChat.result, chatSchema, normalizarChat.entities);

    console.log('==OBJETO ORIGINAL==');
    console.log(`Tamaño en Bytes: ${JSON.stringify(inMensaje).length}`);
    print(inMensaje);

    console.log('==OBJETO NORMALIZADO==');
    console.log(`Tamaño en Bytes: ${JSON.stringify(normalizarChat).length}`);
    print(normalizarChat);

    console.log('==OBJETO DESNORMALIZADO==');
    console.log(`Tamaño en Bytes: ${JSON.stringify(desnormalizarChat).length}`);
    print(desnormalizarChat);

}

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
httpServer.listen(PUERTO, () => console.log(`Servidor escuchando en http://localhost:${PUERTO}`));



