//DESAFIO GENERICO - HANDLEBARS CON EXPRESS//

//TENGO QUE TRANSFORMAR EL PRIMER DESAFIO GENERICO, PERO ESTA VEZ LA PAGINA DINAMICA LA CREARA EL SERVIDOR DESDE handlebars INSTALADO y CONFIGURADO PARA TRABAJAR CON express//
//TENGO QUE UTILIZAR LA MISMA ESTRUCTURA DE PLANTILLA HTML DENTRO DE UNA PAGINA WEB CON ENCABEZADO y EL MISMO OBJETO DE DATOS//
//EL SERVIDOR SE TENDRA QUE ESCUCHAR EN EL PUERTO 8080 y EL RESULTADO LO OFRECERA EN SU RUTA ROOT//

//REQUIERO express y express-handlebars PARA PODER UTILIZARLOS//
const express = require('express');
const app = express();
const hbs = require('express-handlebars');

//UTILIZO EL METODO app.engine() PARA CREAR MI PROPIO MOTOR DE PLANTILLAS//
app.engine('handlebars', hbs.engine());

//CREO EL METODO app.set('views', path) PARA ESPECIFICAR LA CARPETA DE PLANTILLAS, EN ESTE CASO 'hbs'//
app.set('views', './views/hbs');
//CREO EL METODO app.set('view engine', name) PARA REGISTRAR EL MOTOR DE PLANTILLAS, EN ESTE CASO 'hbs'//
app.set('view engine', 'handlebars');

//CREO LA RUTA PRINCIPAL//
app.get('/', (peticion,respuesta)=>{
    let data = {
        titulo: 'La Casa de Papel',
        mensaje: 'Una de mis peliculas mas favoritas y atrapantes',
        autor: 'Alex Pina',
        version: '2017.0.0'   
    }
    respuesta.render('index',data);
})

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO, ()=> console.log(`Servidor escuchandose en http://localhost:${PUERTO}`))