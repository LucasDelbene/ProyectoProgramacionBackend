//DESAFIO GENERICO (CLASE 40)//

/*
ARQUITECTURA DEL SERVIDOR (PERSISTENCIA): 
La Persistencia en la Arquitectura del Servidor, se refiere a la capacidad de almacenar y recuperar datos de forma duradera, lo que 
permite conservar los datos mas alla de la duracion de una sesion o conexion en particular. Es esencial para el correcto funcionamiento 
de muchas aplicaciones y sistemas, y se puede implementar utilizando tecnologias y herramientas, como bases de datos relacionales o NoSQL.

PATRON DE PERSISTENCIA DAO:
El patron de Persistencia DAO (Data Access Object), es un patron de diseño que se utiliza para separar la logica de acceso a datos de la
logica de negocio de una aplicacion. El Patron DAO proporciona una interfaz abstracta para acceder a los datos, lo que permite que la capa
de negocio se concentre en la logica de la aplicacion, sin preocuparse por los detalles de como se almacenan o recuperan los datos.
En resumen, el patron DAO se utiliza para abstraer la capa de negocio de los detalles de implementacion de la persistencia de datos. 

PATRON DE PERSISTENCIA DTO:
El patron de Persistencia DTO (Data Transfer Object), es un patron de diseño que se utiliza para transferir datos entre la capa de persistencia
y la capa de negocio de una aplicacion. El patron DTO se compone de objetos que se utilizar para encapsular los datos y transportarlos 
entre las capas de la aplicacion. El objetivo principal del patron DTO es proporcionar una forma de transferir datos de una manera segura
y eficiente, sin exponer los detalles internos de la implementacion de la persistencia de datos. En resumen, el patron DTO se utiliza para
encapsular los datos y transportarlos entre las capas de la aplicacion de una manera segura y eficiente.
*/

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

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(config.mongo.URL);

//Motor de plantillas
app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

//Middlewares
app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(cookieParser());
app.use(cors());

initializePassport();

//Routers
app.use('/',viewsRouter);
app.use('/api/sessions/',sessionsRouter);
app.use('/api/videogames/',videogamesRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))