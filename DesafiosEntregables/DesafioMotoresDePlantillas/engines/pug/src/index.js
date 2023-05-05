//DESAFIO ENTREGABLE - MOTORES DE PLANTILLAS//

//REQUIERO express PARA PODER UTILIZARLO//
const express = require('express');
const app = express();

//DECLARO ESTO PARA QUE NUESTRO SERVIDOR INTERPRETE DE FORMA AUTOMATICA MENSAJES DE TIPO JSON EN FORMATO urlencoded AL RECIBIRLOS//
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//CREO EL METODO app.set('views', path) PARA ESPECIFICAR LA CARPETA DE PLANTILLAS, EN ESTE CASO '../views'//
app.set('views', '../views');
//CREO EL METODO app.set('view engine', name) PARA REGISTRAR EL MOTOR DE PLANTILLAS, EN ESTE CASO 'pug'//
app.set('view engine', 'pug');

//IMPORTO LA CLASE Contenedor//
const Contenedor = require('../../../api/contenedor');
const productos = new Contenedor('../../resources/productos.txt');

//CREO LA RUTA PRINCIPAL CON METODO get//
app.get('/', (peticion, respuesta) => {
    respuesta.render('formulario.pug', {})
})

//CREO LA RUTA '/productos' CON METODO get//
app.get('/productos', async (peticion, respuesta) => {
    const productos = await productos.getAll()
    respuesta.render('productos.pug', {productos})
})

//CREO LA RUTA '/productos' CON METODO post//
app.post('/productos', async (peticion, respuesta)=> {
    let producto = peticion.body;

    if(producto){
        await productos.saveProduct(producto)
        console.log(`PRODUCTO GUARDADO CON EXITO: ${JSON.stringify(producto)}`)
        respuesta.redirect('/')
    }
    else{respuesta.sendStatus(400)}
})

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO, ()=> console.log(`Servidor escuchandose en http://localhost:${PUERTO}`))