//DESAFIO ENTREGABLE - SERVIDORES CON BALANCE DE CARGA//
//ACA ABAJO ESTA TODO EL CODIGO DEL DESAFIO//

import parseArgs from 'minimist';
const args = parseArgs(process.argv.slice(2));

import cluster from 'cluster';
import os from 'os';
const CPUs = os.cpus().length;

const FORK = args.FORK;
const CLUSTER = args.CLUSTER;

const PUERTO = 8080;
const runServer = (PUERTO)=>{
    app.listen(PUERTO, ()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`))
}

if(CLUSTER){
    if(cluster.isPrimary){
        console.log(`Proceso Padre (Primario) en PID ${process.pid}`);

        for(let i=0; i<CPUs; i++){
            cluster.fork();
        }

        cluster.on('exit', (worker,code,signal)=>{
            console.log(`Proceso Worker ${worker.process.pid} finalizado`);
            cluster.fork();
        })
    }else{
        console.log(`Proceso Hijo (Worker) en PID ${process.pid}`);
        runServer(PUERTO);
    }
}else{
    runServer(PUERTO);
}

//PROCEDIMIENTOS QUE REALICE EN EL DESAFIO SERVIDORES CON BALANCE DE CARGA//
/*
Iniciar Servidor con Cluster: nodemon index.js --CLUSTER
Iniciar Servidor con Fork: nodemon index.js --FORK
Matar o Finalizar Proceso: kill numProceso --> (kill 12188)

Iniciar Servidor con Forever: 
--> forever start index.js               
--> forever start index.js --FORK
--> forever start index.js -p 8081

Detener Servidor con Forever: 
--> forever stop index.js
--> forever stopall
                              
Listar Procesos con Forever: forever list 

Iniciar Servidor PM2: 
--> pm2 start index.js
--> pm2 start index.js --watch
--> pm2 start index.js -p 8081

Detener Servidor PM2:
--> pm2 stop index.js

Ver Monitoreo en Tiempo Real con PM2: pm2 monit
Ver Logs con PM2: pm2 logs

Listar los Servicios Activos con PM2: pm2 list 
Bajar o Eliminar todos los Servicios Activos con PM2: pm2 delete all

Iniciar Servidor en Modo Cluster con PM2: pm2 start index.js -i max
Iniciar Servidor en Modo Cluster en Escucha Activa con PM2: pm2 start index.js -i max --watch
*/


//IMPORTO express PARA PODER UTILIZARLO//
import express from 'express';
const app = express();

//REALIZO LAS DEMAS IMPORTACIONES PARA PODER UTILIZARLAS//
import session from 'express-session';
import MongoStore from 'connect-mongo';
import __dirname from './utils.js';
import passport from 'passport';
import inicializarEstrategias from './config/configuracionPassport.js';

//IMPORTO dotenv PARA PODER UTILIZARLO//
import dotenv from 'dotenv';
dotenv.config();

//IMPORTO socket-io y http PARA PODER UTILIZARLOS//
import {Server as IOServer} from 'socket.io';
import {Server as HttpServer} from 'http';
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//UTILIZO express.static PARA PODER BUSCAR LOS ARCHIVOS RELATIVOS AL DIRECTORIO ESTATICO COMO POR EJEMPLO IMAGENES, ARCHIVOS CSS o JS//
app.use(express.static(`${__dirname}/public`));  //CARPETA '/public'

//DECLARO ESTO PARA QUE NUESTRO SERVIDOR INTERPRETE DE FORMA AUTOMATICA MENSAJES DE TIPO JSON EN FORMATO urlencoded AL RECIBIRLOS//
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//INICIALIZO EL MOTOR EJS//
app.set('views', `${__dirname}/views`); //CREO EL METODO app.set('views', path) PARA ESPECIFICAR LA CARPETA DE PLANTILLAS, EN ESTE CASO './views'//
app.set('view engine', 'ejs');          //CREO EL METODO app.set('view engine', name) PARA REGISTRAR EL MOTOR DE PLANTILLAS, EN ESTE CASO 'ejs'//

//REQUIERO LOS CONTENEDORES DE chat y producto//
import ContenedorChat from './Contenedores/contenedorChat.js';
import ContenedorProducto from './Contenedores/contenedorProducto.js';
const productos = new ContenedorProducto('./Contenedores/productos.txt');
const mensajes = new ContenedorChat('./Contenedores/mensajes.txt');

//MIDDLEWARE DE session//
const SECRET_SESSION = process.env.SECRET;
const URLMONGO = process.env.URL_MONGO;
app.use(session({
    store: MongoStore.create({   //CREO ALMACENAMIENTO DE MONGO
        mongoUrl:URLMONGO,
        ttl:3600
    }),
    secret:SECRET_SESSION, //SIRVE PARA FIRMAR LAS Cookies ENVIADAS y PARA ANALIZAR LAS RECIBIDAS
    resave: false,               //PONGO resave:false PORQUE COMO AHORA LA PERSISTENCIA SI VA A PERSISTIR, OSEA COMO EL ARCHIVO SI SE VA A QUEDAR AHI, LA IDEA ES QUE NO SE ESTE HACIENDO UN GUARDADO EN CADA INICIALIZACION
    saveUninitialized: false     //PONGO saveUnitialized:false PORQUE COMO NUESTRA SESION YA VA A TENER UN ARCHIVO MUY ESPECIFICO, ESTA VEZ ME INTERESA QUE ESOS ARCHIVOS o ESA PERSISTENCIA (COMO VAN A ESTAR LEYENDOSE CONSTANTEMENTE) SI TENGA DATOS CONSISTENTES
}));

inicializarEstrategias();        //INICIALIZO MIS ESTRATEGIAS
app.use(passport.initialize());  //INICIALIZO EL MISMO PASSPORT
app.use(passport.session());     //LO CONECTO A TODO MI MODELO DE SESSIONS ACTUAL

//IMPORTACION DE RUTAS//
import rutaViews from './routers/rutaViews.js';
import rutaSessions from './routers/rutaSessions.js';
import rutaFormulario from './routers/rutaFormulario.js';
import rutaAccesoGet from './routers/rutaAccesoGet.js';
import rutaAccesoPost from './routers/rutaAccesoPost.js';
import rutaChat from './routers/rutaChat.js';

//RUTAS//
app.use('/',rutaViews);
app.use('/api/sessions',rutaSessions);
app.use('/formulario',rutaFormulario);
app.use('/acceso',rutaAccesoGet);
app.use('/acceso',rutaAccesoPost);
app.use('/chat',rutaChat);

//CODIGO DEL DESAFIO USANDO EL OBJETO PROCESS//
import {fork} from 'child_process';

app.get('/info',(peticion,respuesta)=>{ //AGREGO UNA RUTA '/info' QUE PRESENTE EN UNA VISTA SENCILLA LOS SIGUIENTES DATOS
    const data = {
        directorioActual: process.cwd(),
        idProceso: process.pid,
        versionNode: process.version,
        rutaEjecutable: process.execPath,
        sistemaOperativo: process.platform,
        memoria: JSON.stringify(process.memoryUsage().rss,null,2)
    }
    respuesta.render('info',data);
});

app.get('/api/randoms',(peticion,respuesta)=>{ //AGREGO UNA RUTA '/api/randoms' QUE PERMITA CALCULAR UNA CANTIDAD DE NUMEROS ALEATORIOS EN EL RANGO DEL 1 al 1000 ESPECIFICADA POR PARAMETROS DE CONSULTA (query)
    respuesta.render('numeroRandomIN')
});
app.post('/api/randoms',(peticion,respuesta)=>{
    const {cantidadBucle} = peticion.body;
    process.env.CANTIDAD_BUCLE = cantidadBucle;

    const numeroRandom = fork('./controller/numeroRandomController.js')
    numeroRandom.on('message',dataRandom=>{
        return respuesta.send(dataRandom);
    })
});

app.get('/objectRandomOUT',(peticion,respuesta)=>{
    respuesta.render('objectRandomOUT')
});

//CONEXION DEL USUARIO//
let usuarios = [];
io.on('connection', socket => {
    //SOCKET PARA ENVIAR PRODUCTOS//
    socket.on('enviarProducto', () => {
        ; (async () => {
            try{
                todosLosProductos = await productos.getAll();

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
            const id = await productos.save(nuevoProducto);
            const producto = await productos.getById(id);

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
                todosLosMensajes = await mensajes.getAll();
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
            await mensajes.save(mensaje);
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

