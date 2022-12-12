//DESAFIO SERVIDOR CON EXPRESS//

//Exporte Clase Contenedor//
const Contenedor = require("../DesafioManejoDeArchivos/desafioManejoDeArchivos")
const express = require("express");
const app = express();
const PUERTO = 8080;

//LA APP SE ESCUCHA EN EL SERVIDOR CON EL PUERTO NUMERO 8080//
const servidor = app.listen(process.env.PUERTO || PUERTO, () =>{
    console.log(`Servidor escuchandose en http://localhost:${PUERTO}`);
})

//MENSAJE DE ERROR//
servidor.on('error', error => console.log(`ERROR: ${error}`));

//UTILIZO CLASE CONTENEDOR DEL DESAFIO ANTERIOR//
const productos = new Contenedor('productos.txt');

//CREO LAS RUTAS '/productos' Y '/productoRandom'//
//APLICO ASYNC y AWAIT//
app.get('/productos', async(request, response) =>{
    const producto = await productos.getAll();
    response.send(producto);
})

app.get('/productoRandom', async(request, response) =>{
    const producto = await productos.getAll();
    //USO "Math.floor" PARA RENDONDEAR NUMERO y "Math.random" PARA DEVOLVER NUMERO ALEATORIO//
    let productoRandom = Math.floor(Math.random() * productos.lenght);
    response.send(producto[productoRandom]);
})


