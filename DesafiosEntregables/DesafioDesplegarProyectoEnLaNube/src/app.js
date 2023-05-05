//DESAFIO DESPLEGAR NUESTRO PROYECTO EN LA NUBE UTILIZANDO RAILWAY (CLASE 34)//

//IMPORTO express PARA PODER UTILIZARLO//
import express from 'express';
const app = express();

//CONEXION AL SERVIDOR//
const PUERTO = process.env.PUERTO || 8080;
app.listen(PUERTO,()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`))

//CREO UNA RUTA PRINCIPAL//
app.get('/',(peticion,respuesta)=>{
    respuesta.send('BIENVENIDOS AL DESAFIO RAILWAY')
})

//CREO UNA RUTA LLAMADA ENTORNO//
app.get('/entorno',(peticion,respuesta)=>{
    respuesta.send(`ENTORNO SOLICITADO: ${process.env.LUCAS}`)
})

//CREO UNA RUTA LLAMADA DESPEDIDA//
app.get('/despedida',(peticion,respuesta)=>{
    respuesta.send('ADIOS DESAFIO RAILWAY')
})

//CREO UNA RUTA LLAMADA USUARIO//
app.get('/usuario',(peticion,respuesta)=>{
    if(process.env.ENTORNO === "PRODUCTION"){
        respuesta.send('OBTENIENDO USUARIOS DE LA BASE DE DATOS PRODUCTIVA')
    }else{
        respuesta.send(`OBTENIENDO USUARIOS DE LA BASE DE DATOS DE PRUEBA: ${process.env.TESTDB}`)
    }
})

//TENGO 3 RAMAS o BRANCHES CREADAS//
//LA RAMA MASTER o MAIN QUE YA VIENE DEFAULT, LA CUAL ES LA RAMA A DONDE VA A LLEGAR FINALMENTE TU CLIENTE//
//MEDIANTE EL COMANDO git checkout -b desarrollo, CREE LA RAMA DE DESARROLLO EN LA CUAL VA A TRABAJAR TODO EL EQUIPO DE DESARROLLADORES//
//MEDIANTE EL COMANDO git checkout -b testing, CREE LA RAMA DE TESTING EN DONDE TODO EL EQUIPO DE QA (Quality Assurance) SE VA A ENCARGAR DE HACER LAS PRUEBAS//