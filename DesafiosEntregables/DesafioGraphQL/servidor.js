//DESAFIO ENTREGABLE - REFORMAR PARA USAR GRAPHQL (CLASE 44)//

//IMPORTO express PARA PODER UTILIZARLO//
import express from 'express';
const app = express();

//IMPORTO @apollo/server y expressMiddleware PARA PODER UTILIZARLOS//
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';

//IMPORTO LOS ARCHIVOS typeDefs y resolvers PARA PODER UTILIZARLOS//
import typeDefs from './GraphQL/typeDefs.js';
import resolvers from './GraphQL/resolvers.js';

//CREO UNA INSTANCIA DE UN SERVIDOR GraphQL LLAMADO apollo, USANDO LOS ESQUEMAS (typeDefs) y RESOLUTORES (resolvers) DEFINIDOS. DESPUES, INICIO EL SERVIDOR y LO USO COMO MIDDLEWARE EN UNA APLICACION EXPRESS, LO QUE ME PERMITE QUE LA APLICACION USE GraphQL PARA MANEJAR LAS SOLICITUDES y RESPUESTAS DEL CLIENTE//
const apollo = new ApolloServer({
    typeDefs,
    resolvers
})
await apollo.start();

//MIDDLEWARES//
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(expressMiddleware(apollo))

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO,()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));