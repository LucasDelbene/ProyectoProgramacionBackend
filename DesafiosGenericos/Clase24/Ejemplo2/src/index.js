//EJEMPLO 2 (CLASE 24)//

//IMPORTO express-handlebars, express, mongoose, express-session, connect-mongo y PARA PODER UTILIZARLOS//
import handlebars from 'express-handlebars';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import storage from 'session-file-store';
const app = express();

//CONEXION CON MONGOOSE//
const conexion = mongoose.connect("mongodb+srv://LucasDelbene:776@clase24-programacionbac.13mdabl.mongodb.net/Ejemplo2?retryWrites=true&w=majority")

//MIDDLEWARE DE session//
app.use(session({
    store: MongoStore.create({                  //CREO ALMACENAMIENTO DE MONGO
        mongoUrl:"mongodb+srv://LucasDelbene:776@clase24-programacionbac.13mdabl.mongodb.net/Ejemplo2?retryWrites=true&w=majority",
        ttl:20
    }),
    secret: 'CodigoSecretoQueSoloLoPuedoVerYo', //SIRVE PARA FIRMAR LAS Cookies ENVIADAS y PARA ANALIZAR LAS RECIBIDAS
    resave: false,                              //PONGO resave:false PORQUE COMO AHORA LA PERSISTENCIA SI VA A PERSISTIR, OSEA COMO EL ARCHIVO SI SE VA A QUEDAR AHI, LA IDEA ES QUE NO SE ESTE HACIENDO UN GUARDADO EN CADA INICIALIZACION                 
    saveUninitialized: false                    //PONGO saveUnitialized:false PORQUE COMO NUESTRA SESION YA VA A TENER UN ARCHIVO MUY ESPECIFICO, ESTA VEZ ME INTERESA QUE ESOS ARCHIVOS o ESA PERSISTENCIA (COMO VAN A ESTAR LEYENDOSE CONSTANTEMENTE) SI TENGA DATOS CONSISTENTES
}));

//IMPORTO __dirname DEL ARCHIVO utils.js//
import __dirname from './utils.js';

//IMPORTO rutaViews y rutaSessions DESDE LA CARPETA Routes//
import rutaViews from './routes/rutaViews.js '
import rutaSessions from './routes/rutaSessions.js'

//INICIALIZO EL MOTOR HANDLEBARS// 
app.engine('handlebars', handlebars.engine()); //ESTO LE INDICA A express QUE SI ESTA HECHO PARA PODER TRABAJAR CON MOTORES DE PLANTILLAS y LE INDICO QUE MOTOR DE PLANTILLAS VOY A UTILIZAR, EN ESTE CASO handlebars
app.set('views', `${__dirname}/views`);        //CREO EL METODO app.set('views', path) PARA ESPECIFICAR LA CARPETA DE PLANTILLAS, EN ESTE CASO EN LA CARPETA views
app.set('view engine', 'handlebars');          //CREO EL METODO app.set('view engine', name) PARA REGISTRAR EL MOTOR DE PLANTILLAS, EN ESTE CASO handlebars

//UTILIZO express.static PARA PODER BUSCAR LOS ARCHIVOS RELATIVOS AL DIRECTORIO ESTATICO COMO POR EJEMPLO IMAGENES, ARCHIVOS CSS o JS//
app.use(express.static(`${__dirname}/public`));  //CARPETA '/public'

//DECLARO ESTO PARA QUE NUESTRO SERVIDOR INTERPRETE DE FORMA AUTOMATICA MENSAJES DE TIPO JSON EN FORMATO urlencoded AL RECIBIRLOS//
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//RUTAS//
app.use('/', rutaViews);
app.use('/api/sessions', rutaSessions);

//CONEXION AL SERVIDOR//
const PUERTO = process.env.PUERTO || 8080;
app.listen(PUERTO, ()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));