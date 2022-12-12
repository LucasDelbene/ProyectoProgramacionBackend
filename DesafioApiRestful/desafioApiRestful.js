//DESAFIO API RESTful - PROGRAMACION BACKEND//

const express = require('express');
const app = express();
const PUERTO = 8080;
app.listen(PUERTO,() => console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));

const Contenedor = require("./contenedor")
const productos = new Contenedor('./productos.json')

//CREANDO LAS RUTAS//

//DEVUELVE TODOS LOS PRODUCTOS (GET)//
app.get("/api/productos",async(req,res,next)=>{
    try{
        const producto = await productos.getAll();
        res.send(producto);
    }catch(error){
        console.log(error);
    }
});

//DEVUELVE UN PRODUCTO SEGUN SU ID (GET)//
app.get("/api/productos/:id", async(req,res,next)=>{
    try {
        let filtrarId = req.params.id
        let filtrarProducto = await productos.getById(filtrarId);
        res.send(filtrarProducto);
    }catch(error){
        console.log(error);
    }
});

//RECIBE Y AGREGA UN PRODUCTO (POST)//
app.post("/api/productos", async(req,res,next)=>{
    try {
        let {title,price,thumbnail} = req.body
        if(!title||!price||!thumbnail){
            console.log("FALTAN DATOS");
        }else{
            let productoAgregado = {
                title,
                price,
                thumbnail
            };
            await productos.agrega(productoAgregado);
            res.send(`${productoAgregado.id}`);
        }
    }catch(error){
        console.log(error);
    }
});

//RECIBE Y ACTUALIZA UN PRODUCTO SEGUN SU ID (PUT)//
app.put("/api/productos/:id", async(req,res,next)=>{
    try {
        let id = req.params.id;
        let {title,price,thumbnail} = req.body
        if(!title || !price || !thumbnail){
            res.send("FALTAN DATOS")
        }else{
            let actualizarProducto ={
                id,
                title,
                price,
                thumbnail
            };
            await productos.actualiza(actualizarProducto)
            res.send(`PRODUCTO ACTUALIZADO ${actualizarProducto.title}`)
        }
    }catch(error){
        console.log(error);
    }
});

//BORRA PRODUCTO SEGUN SU ID (DELETE)//
app.delete("/api/productos/:id", async(req,res,next)=>{
    try{
        let id = req.params.id;
        await productos.borraId(id);
        console.log("PRODUCTO BORRADO")
        res.send(`EL PRODUCTO CON SU ID ${id} FUE BORRADO`)
    }catch(error){
        console.log(error);
    }
})


