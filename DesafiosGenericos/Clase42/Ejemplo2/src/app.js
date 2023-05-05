//EJEMPLO 2 APLICANDO TESTING (CLASE 42)//

//REALIZO LAS IMPORTACIONES PARA PODER UTILIZARLAS//
import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//IMPORTACION DE RUTAS//
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import videogamesRouter from './routes/videogames.router.js';
import cartsRouter from './routes/carts.router.js';

//IMPORTO ALGUNAS CONFIGURACIONES//
import config from './config/config.js';
import __dirname from './utils.js';
import initializePassport from './config/passport.config.js';

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(config.mongo.URL);

//CONFIGURO EL MOTOR DE PLANTILLAS HANDLEBARS//
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
app.use('/api/carts',cartsRouter);

//CONEXION AL SERVIDOR//
app.listen(PORT,()=>console.log(`Servidor escuchandose en http://localhost:${PORT}`))