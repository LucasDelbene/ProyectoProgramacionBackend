//DESAFIO GENERICO - PUG//

//TENGO QUE REALIZAR LO MISMO QUE EL EJERCICIO ANTERIOR (EJERCICIO 1) PERO ESTA VEZ APLICANDO EL MOTOR DE PLANTILLAS ejs//

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

//CREO LA RUTA '/datos' CON EL METODO get//
app.get('/datos', (peticion, respuesta, next)=>{
    respuesta.render('index', peticion.query);
});

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO, ()=> console.log(`Servidor escuchandose en http://localhost:${PUERTO}`))