//EJEMPLO 1 IMPLEMENTANDO UNA API GRAPHQL (CLASE 44)//

//BASICAMENTE, UNA Api GraphQL ES UNA INTERFAZ DE PROGRAMACION DE APLICACIONES QUE UTILIZA EL LENGUAJE DE CONSULTA GraphQL PARA PERMITIR A LOS CLIENTES SOLICITAR y RECIBIR DATOS DE FORMA EFICIENTE y PERSONALIZADA DESDE UN SERVIDOR. A DIFERENCIA DE LAS APIs REST, LAS APIs GraphQL PERMITEN A LOS CLIENTES ESPECIFICAR EXACTAMENTE QUE DATOS NECESITAN y EN QUE FORMATO LOS QUIEREN RECIBIR, LO QUE PUEDE REDUCIR LA CANTIDAD DE SOLICITUDES NECESARIAS y MEJORAR EL RENDIMIENTO DE LA APLICACION//
//Apollo Server, ES UNA BIBLIOTECA DE JavaScript PARA CREAR SERVIDORES GraphQL. SE UTILIZA PARA DEFINIR y CONFIGURAR UN ESQUEMA GraphQL, MANEJAR SOLICITUDES y RESPUESTAS DE GraphQL y CONECTARSE A FUENTES DE DATOS SUBYACENTES PARA RECUPERAR y ALMACENAR DATOS. EN RESUMEN, PERMITE CREAR y EJECUTAR SERVIDORES GraphQL DE MANERA EFICIENTE y ESCALABLE//

//IMPORTO @apollo/server y expressMiddleware PARA PODER UTILIZARLOS//
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';

//IMPORTO LOS ARCHIVOS typeDefs y resolvers PARA PODER UTILIZARLOS//
import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';

//CREO UNA INSTANCIA DE UN SERVIDOR GraphQL LLAMADO apollo, USANDO LOS ESQUEMAS (typeDefs) y RESOLUTORES (resolvers) DEFINIDOS. DESPUES, INICIO EL SERVIDOR y LO USO COMO MIDDLEWARE EN UNA APLICACION EXPRESS, LO QUE ME PERMITE QUE LA APLICACION USE GraphQL PARA MANEJAR LAS SOLICITUDES y RESPUESTAS DEL CLIENTE//
const apollo = new ApolloServer({
    typeDefs,
    resolvers
})
await apollo.start();
app.use(expressMiddleware(apollo))

//IMPORTO swagger-jsdoc y swagger-ui-express PARA PODER UTILIZARLOS//
import swaggerJSDoc from 'swagger-jsdoc';   //HERRAMIENTA QUE PERMITE GENERAR AUTOMATICAMENTE LA DOCUMENTACION DE UNA API A PARTIR DE LOS COMENTARIOS EN EL CODIGO FUENTE DE JAVASCRIPT//
import swaggerUi from 'swagger-ui-express'; //HERRAMIENTA QUE PROPORCIONA UNA INTERFAZ GRAFICA PARA VISUALIZAR y PROBAR UNA API DOCUMENTADA CON SWAGGER EN UNA APLICACION NODE.JS//

//DEFINO UNA ESPECIFICACION DE API UTILIZANDO LA HERRAMIENTA SWAGGER, LA CUAL ESTA DEFINIDA EN UN OBJETO JAVASCRIPT LLAMADO swaggerDefinicion. EL OBJETO CONTIENE INFORMACION SOBRE LA VERSION DE LA API, TITULO y DESCRIPCION DE LA MISMA, ASI COMO LA RUTA DONDE SE ENCUENTRAN LOS ARCHIVOS YAML QUE DESCRIBEN LA ESTRUCTURA DE LA API. EN RESUMEN, EL CODIGO DEFINE UNA API DE VIDEOJUEGOS UTILIZANDO SWAGGER//
const swaggerDefinicion = {
    definition:{
        openapi: '3.0.1',
        info:{
            title: 'API de VideoJuegos',
            description: 'API pensada por Comision 38140'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

//INICIALIZO SWAGGER//
const especificaciones = swaggerJSDoc(swaggerDefinicion); //UTILIZO SwaggerJSDoc PARA GENERAR LA DOCUMENTACION DE UNA API A PARTIR DE UNA DEFINICION DE Swagger. LA CONSTANTE especificaciones GUARDA EL RESULTADO DE LA FUNCION swaggerJSDoc QUE PROCESA LA DEFINICION DE Swagger y GENERA LA DOCUMENTACION CORRESPONDIENTE//

//MIDDLEWARE PARA SWAGGER//
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(especificaciones)); //UTILIZO swagger-ui-express PARA MOSTRAR LA DOCUMENTACION GENERADA PREVIAMENTE A TRAVES DE SwaggerJSDoc. LA FUNCION app.use ESTABLECE UNA RUTA PARA ACCEDER A LA DOCUMENTACION A TRAVES DE LA URL '/swagger' y LAS FUNCIONES swaggerUi.serve y swaggerUi.setup SIRVEN y CONFIGURAN LA INTERFAZ DE USUARIO DE SwaggerUI UTILIZANDO LAS ESPECIFICACIONES PREVIAMENTE GENERADAS//

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
import userModel from './dao/mongo/models/user.js';
import { usersService } from './dao/index.js';

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

//RUTA DE TESTING (CLASE 42)//
app.get('/testing/init',async(peticion,respuesta)=>{
    await usersService.drop();
    respuesta.sendStatus(200);
})

//CONEXION AL SERVIDOR//
app.listen(PORT,()=>console.log(`Servidor escuchandose en http://localhost:${PORT}`))