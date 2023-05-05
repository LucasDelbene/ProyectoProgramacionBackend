//DESAFIO ENTREGABLE - MEJORAR LA ARQUITECTURA DE NUESTRA API (CLASE 40)//

/*
PATRON DAO: El Patrón DAO (Data Access Object), es una forma de separar la logica de acceso a datos de la logica de negocio de una aplicacion, lo que permite una mayor flexibilidad y mantenibilidad del codigo.
PATRON DTO: El Patrón DTO (Data Transfer Object), es una forma de encapsular y transportar datos en forma eficiente y segura entre diferentes capas o componentes de una aplicacion, evitando el acoplamiento directo entre ellos.
*/ 

//IMPORTO express PARA PODER UTILIZARLO//
import express from 'express';
const app = express();

//REALIZO LAS DEMAS IMPORTACIONES PARA PODER UTILIZARLAS//
import passport from 'passport'
import MongoStore from 'connect-mongo';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();

//UTILIZO express.static PARA PODER BUSCAR LOS ARCHIVOS RELATIVOS AL DIRECTORIO ESTATICO COMO POR EJEMPLO IMAGENES, ARCHIVOS CSS o JS//
app.use('/avatar', express.static('./public/avatar')); //CARPETA './public/avatar'

//DECLARO ESTO PARA QUE NUESTRO SERVIDOR INTERPRETE DE FORMA AUTOMATICA MENSAJES DE TIPO JSON EN FORMATO urlencoded AL RECIBIRLOS//
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//INICIALIZO EL MOTOR EJS//
app.set('views', './views');   //CREO EL METODO app.set('views', path) PARA ESPECIFICAR LA CARPETA DE PLANTILLAS, EN ESTE CASO './views'//
app.set('view engine', 'ejs'); //CREO EL METODO app.set('view engine', name) PARA REGISTRAR EL MOTOR DE PLANTILLAS, EN ESTE CASO 'ejs'//

//MIDDLEWARE DE SESSION//
const SECRET_SESSION = process.env.SECRET;
const URLMONGO = process.env.URL_MONGO;
app.use(session({
    //CREO ALMACENAMIENTO DE MONGO//
    store: MongoStore.create({
        mongoUrl:URLMONGO,
        ttl:3600
    }),
    secret:SECRET_SESSION,
    resave:true,
    saveUninitialized: true,
}));

app.use(passport.initialize()); //INICIALIZO EL MISMO PASSPORT
app.use(passport.session());    //LO CONECTO A TODO MI MODELO DE SESSIONS ACTUAL

//MIDDLEWARE DE REGISTRADO//
const registrado = ((peticion,respuesta,next)=>{
    let mensajeError = 'PARA ACCEDER A ESTA URL DEBES INICIAR SESION';
    if(peticion.usuario){
        next();
    }else{
        return respuesta.render('verError',{mensajeError})
    }
});

//IMPORTO LOS ARCHIVOS DE AUTHENTICATION//
const login = require('./authentication/login.js');
const registro = require('./authentication/registro.js');
const serializarUsuario = require('./authentication/serializarUsuario.js');
const deserializarUsuario = require('./authentication/deserializarUsuario.js');
login();
registro();
serializarUsuario();
deserializarUsuario();

//IMPORTACION DE RUTAS//
import rutaProductos from './routers/rutaProductos.js';
import rutaCarrito from './routers/rutaCarrito.js';
import {rutaLogin} from './routers/rutaUsuario.js';
import {rutaRegistro} from './routers/rutaUsuario.js';
import {rutaCerrarSesion} from './routers/rutaUsuario.js';
import {rutaPerfil} from './routers/rutaUsuario.js';
import rutaVistaGeneral from './routers/rutaVistaGeneral.js';
import rutaPedidos from './routers/rutaPedidos.js';

//RUTAS//
app.use('/', rutaVistaGeneral);
app.use('/api/productos', registrado, rutaProductos);
app.use('/api/carrito', registrado, rutaCarrito);
app.use('/api/pedidos', registrado, rutaPedidos);
app.use('/login', rutaLogin);
app.use('/registro', rutaRegistro);
app.use('/cerrarSesion', registrado, rutaCerrarSesion);
app.use('/perfil', registrado, rutaPerfil);

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO, ()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));