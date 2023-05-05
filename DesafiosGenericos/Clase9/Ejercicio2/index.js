//DESAFIO GENERICO - MOTOR DE PLANTILLAS CUSTOM//

//TENGO QUE DESARROLLAR UN MOTOR DE PLANTILLAS CUSTOM PARA UN SERVIDOR BASADO EN express//

//REQUIERO express y fs (File System) PARA PODER UTILIZARLOS//
const express = require('express');
const app = express();
const fs = require('fs');

//UTILIZO EL METODO app.engine() PARA CREAR MI PROPIO MOTOR DE PLANTILLAS//
app.engine('cte', async(filePath, options, callback)=>{
    try{
        const contenido = await fs.promises.readFile(filePath);
        const renderizado = contenido.toString()
                                     .replace(`^^titulo$$`, `${options.titulo}<br>`)
                                     .replace(`^^mensaje$$`, `${options.mensaje}<br>`)
                                     .replace(`^^autor$$`, `${options.autor}<br>`)
                                     .replace(`^^version$$`,`${options.version}<br>`)

                                     .replace(`^^nombre$$`, `${options.nombre}<br>`)
                                     .replace(`^^apellido$$`, `${options.apellido}<br>`)
                                     .replace(`^^fecha$$`,`${options.fecha}<br>`)
        return callback(null, renderizado);
    }catch(error){
        return callback(new Error(error));
    }
});

//CREO EL METODO app.set('views', path) PARA ESPECIFICAR LA CARPETA DE PLANTILLAS, EN ESTE CASO 'custom'//
app.set('views', './views/custom');
//CREO EL METODO app.set('view engine', name) PARA REGISTRAR EL MOTOR DE PLANTILLAS, EN ESTE CASO 'cte'//
app.set('view engine', 'cte');

//CREO LA RUTA PRINCIPAL//
app.get('/', (peticion,respuesta)=>{
    respuesta.send('Bienvenidos a la ruta principal del Desafio Generico Motor de Plantillas Custom');
})

//CREO LA RUTA '/cte1', EN LA CUAL TENGO QUE REPRESENTAR EL SIGUIENTE ARCHIVO DE PLANTILLA 'plantilla1.cte'//
app.get('/cte1', (peticion,respuesta)=>{
    let data = {
        titulo: 'Interestellar',
        mensaje: 'De mis peliculas favoritas',
        autor: 'Cristopher Nolan',
        version: '2014.0.0'   
    }
    respuesta.render('plantilla1',data)
})

//CREO LA RUTA '/cte2', EN LA CUAL TENGO QUE REPRESENTAR EL SIGUIENTE ARCHIVO DE PLANTILLA 'plantilla2.cte'//
app.get('/cte2', (peticion,respuesta)=>{
    let data = {
        nombre: 'Lucas',
        apellido: 'Delbene',
        fecha: `${new Date().getUTCFullYear()}`
    }
    respuesta.render('plantilla2',data)
})

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO, ()=> console.log(`Servidor escuchandose en http://localhost:${PUERTO}`))