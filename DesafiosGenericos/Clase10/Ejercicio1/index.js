//DESAFIO GENERICO - PUG//

//TENGO QUE REALIZAR UN SERVIDOR QUE RECIBA POR QUERY PARAMS (MEDIANTE LA RUTA get '/datos') EL VALOR QUE DEBE REPRESENTAR UNA BARRA DE MEDICION (USANDO EL TAG DE HTLM meter)

//REQUIERO express PARA PODER UTILIZARLO//
const express = require('express');
const app = express();

//DECLARO ESTO PARA QUE NUESTRO SERVIDOR INTERPRETE DE FORMA AUTOMATICA MENSAJES DE TIPO JSON EN FORMATO urlencoded AL RECIBIRLOS//
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//CREO EL METODO app.set('views', path) PARA ESPECIFICAR LA CARPETA DE PLANTILLAS, EN ESTE CASO './views/pug'//
app.set('views', './views/pug');
//CREO EL METODO app.set('view engine', name) PARA REGISTRAR EL MOTOR DE PLANTILLAS, EN ESTE CASO 'pug'//
app.set('view engine', 'pug');

//CREO LA RUTA '/datos' CON EL METODO get//
app.get('/datos', (peticion, respuesta, next)=>{
    let {min, max, titulo} = peticion.query;
    respuesta.render('medidor', peticion.query);
});

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO, ()=> console.log(`Servidor escuchandose en http://localhost:${PUERTO}`))