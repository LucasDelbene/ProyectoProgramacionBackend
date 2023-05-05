//EJEMPLO 1 (CLASE 24)//

//IMPORTO express-session, session-file-store, connect-mongo y express PARA PODER UTILIZARLOS//
import session from 'express-session';
import storage from 'session-file-store';
import MongoStore from 'connect-mongo';
import express from 'express';
const app = express();

//CREO LA VARIABLE FileStore LA CUAL VA A REALIZAR LA INICIALIZACION DE MI STORAGE APARTIR DEL OBJETO SESSION//
//const FileStore = storage(session);
//store: new FileStore({path:'./sessions', ttl:10, retries:0}),  //CUANDO INICIALIZO UNA SESION, PUEDO INDICAR CUAL VA A SER EL ELEMENTO DE GUARDADO QUE VOY A TENER PARA ESA SESION

//MIDDLEWARE DE session//
app.use(session({
    store: MongoStore.create({                  //CREO ALMACENAMIENTO DE MONGO
        mongoUrl:"mongodb+srv://LucasDelbene:776@clase24-programacionbac.13mdabl.mongodb.net/?retryWrites=true&w=majority",
        ttl:20
    }),
    secret: 'CodigoSecretoQueSoloLoPuedoVerYo', //SIRVE PARA FIRMAR LAS Cookies ENVIADAS y PARA ANALIZAR LAS RECIBIDAS
    resave: false,                              //PONGO resave:false PORQUE COMO AHORA LA PERSISTENCIA SI VA A PERSISTIR, OSEA COMO EL ARCHIVO SI SE VA A QUEDAR AHI, LA IDEA ES QUE NO SE ESTE HACIENDO UN GUARDADO EN CADA INICIALIZACION                 
    saveUninitialized: false                    //PONGO saveUnitialized:false PORQUE COMO NUESTRA SESION YA VA A TENER UN ARCHIVO MUY ESPECIFICO, ESTA VEZ ME INTERESA QUE ESOS ARCHIVOS o ESA PERSISTENCIA (COMO VAN A ESTAR LEYENDOSE CONSTANTEMENTE) SI TENGA DATOS CONSISTENTES
}));

//CREO UNA RUTA PRINCIPAL CON METODO get//
app.get('/', (peticion, respuesta)=>{
    peticion.session.usuario = {nombre:'Lucas', rol:'estudiante'} 
    respuesta.send('<h1 style="text-align:center; margin: 30px; font-family: Arial, Helvetica, sans-serif;">Bienvenidos a la Ruta Principal del Ejemplo 1 (Clase 24)</h1>')
})

//CONEXION AL SERVIDOR//
const PUERTO = process.env.PUERTO || 8080;
app.listen(PUERTO, ()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));