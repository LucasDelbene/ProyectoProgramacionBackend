//DESAFIO GENERICO SERVIDOR EN CAPAS (CLASE 38)//

/*CAPAS PRINCIPALES DE NODE
1) CAPA DE RUTEO: Maneja la interfaz de programacion de aplicaciones (API). Su unico trabajo es recibir las peticiones del cliente, delegar la tarea de computar la respuesta y una vez obtenido el resultado retornarlo como respuesta al cliente.
2) CAPA DE SERVICIO: Maneja la logica de negocios del app. Significa que los datos son transformados o calculados para cumplir con los requerimientos del cliente. Accede a los datos (leer, guardar) solo a traves de la capa de persistencia.
3) CAPA DE PERSISTENCIA: Tiene acceso a la base de datos para crear, editar o borrar datos. Preferentemente, aqui no debemos encontrar logica de negocio, sino mecanismos relacionados con la infraestructura del servidor.
*/

//REALIZO LAS IMPORTACIONES PARA PODER UTILIZARLAS//
import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import videogamesRouter from './routes/videogames.router.js';
import config from './config/config.js';
import __dirname from './utils.js';
import initializePassport from './config/passport.config.js';

//CONEXION//
const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(config.mongo.URL);

//MOTOR DE PLANTILLAS//
app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

//MIDDLEWARES// 
app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(cookieParser());
app.use(cors());
initializePassport();

//RUTAS//
app.use('/',viewsRouter);
app.use('/api/sessions/',sessionsRouter);
app.use('/api/videogames/',videogamesRouter);
app.listen(PORT,()=>console.log(`Listening on ${PORT}`))