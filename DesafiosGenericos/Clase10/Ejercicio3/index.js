//DESAFIO GENERICO - FORMULARIO + HISTORIAL//

//TENGO QUE DESARROLLAR UN SERVIDOR BASADO EN node.js, express y ejs QUE DISPONGA DE UN FORMULARIO EN SU RUTA RAIZ (CREADO CON UNA PLANTILLA EJS) PARA INGRESAR LOS SIGUIENTES DATOS DE UNA PERSONA: nombre, apellido y edad//

//REQUIERO express PARA PODER UTILIZARLO//
const express = require('express');
const app = express();

//DECLARO ESTO PARA QUE NUESTRO SERVIDOR INTERPRETE DE FORMA AUTOMATICA MENSAJES DE TIPO JSON EN FORMATO urlencoded AL RECIBIRLOS//
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//CREO EL METODO app.set('views', path) PARA ESPECIFICAR LA CARPETA DE PLANTILLAS, EN ESTE CASO './views/ejs'//
app.set('views', './views/ejs');
//CREO EL METODO app.set('view engine', name) PARA REGISTRAR EL MOTOR DE PLANTILLAS, EN ESTE CASO 'ejs'//
app.set('view engine', 'ejs');

//CREO UNA VARIABLE LLAMADA estudiantes CON UN ARRAY//
let personas = [];

//CREO LA RUTA PRINCIPAL CON EL METODO get//
app.get('/', (peticion, respuesta, next)=>{
    respuesta.render('index', {personas});
});

//CREO LA RUTA '/personas' CON EL METODO post//
app.post('/personas', (peticion, respuesta, next)=>{
    personas.push(peticion.body);
    respuesta.redirect('/');
});

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO, ()=> console.log(`Servidor escuchandose en http://localhost:${PUERTO}`))