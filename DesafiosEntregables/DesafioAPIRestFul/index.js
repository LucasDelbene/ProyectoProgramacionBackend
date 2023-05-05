//DESAFIO ENTREGABLE - API RESTful//

//TENGO QUE REALIZAR UN PROYECTO DE SERVIDOR BASADO EN node.js y express QUE OFREZCA UNA API RESTful DE PRODUCTOS e IMPLEMENTAR ALGUNAS RUTAS//

//REQUIERO express PARA PODER UTILIZARLO//
const express = require('express');
const app = express();

//REQUIERO Router PARA PODER UTILIZARLO//
const {Router} = require('express');

//IMPORTO LA CLASE Contenedor//
const Contenedor = require('./api/contenedor');
const productos = new Contenedor('productos.txt');

//DECLARO ESTO PARA QUE NUESTRO SERVIDOR INTERPRETE DE FORMA AUTOMATICA MENSAJES DE TIPO JSON EN FORMATO urlencoded AL RECIBIRLOS//
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//RUTA DE PRODUCTOS//
const rutaProductos = new Router();
app.use('/api/productos', rutaProductos);

//UTILIZO express.static PARA PODER BUSCAR LOS ARCHIVOS RELATIVOS AL DIRECTORIO ESTATICO COMO POR EJEMPLO IMAGENES, ARCHIVOS CSS o JS//
app.use(express.static('public'));     //CARPETA 'public'

//CREO LA RUTA '/api/productos' CON METODO get, LA CUAL DEVUELVE TODOS LOS PRODUCTOS//
rutaProductos.get('/', async(peticion,respuesta)=>{
    const productos = await productos.getAll()
    if(productos.length > 0){
        respuesta.json(productos);
    }else{
        respuesta.sendStatus(400);
    }
})

//CREO LA RUTA '/api/productos/:id' CON METODO get, LA CUAL DEVUELVE UN PRODUCTO SEGUN ID//
rutaProductos.get('/:id', async(peticion,respuesta)=>{
    const producto = await productos.getById(peticion.params.id)
    if(producto){
        respuesta.json({
            busqueda: `EL PRODUCTO CON ID ${peticion.params.id} FUE ENCONTRADO`,
            resultado: producto
        });
    }else{
        respuesta.sendStatus(400);
    }
})

//CREO LA RUTA '/api/productos' CON METODO post, LA CUAL RECIBE y AGREGA UN PRODUCTO y LO DEVUELVE CON SU ID ASIGNADO//
rutaProductos.post('/', async(peticion,respuesta)=>{
    const nombre = peticion.body.nombre;
    const precio = Number(peticion.body.precio);
    const imagen = peticion.body.imagen;

    const nuevoProducto ={
        nombre: nombre,
        precio: precio,
        imagen: imagen,
    }
    const id = await productos.save(nuevoProducto);
    return respuesta.json(`EL ID ASIGNADO ES ${id}`);
})

//CREO LA RUTA '/api/productos/:id' CON METODO put, LA CUAL RECIBE y ACTUALIZA UN PRODUCTO SEGUN SU ID//
rutaProductos.put('/:id', async(peticion,respuesta)=>{
    const resultado = productos.save(peticion.body);
    if(resultado.length > 0){
        respuesta.send(`EL PRODUCTO ${JSON.stringify(resultado[1])} REEMPLAZADO POR ${JSON.stringify(resultado[0])} EN LA POSICION ${resultado[0].id}`);
    }else{
        respuesta.sendStatus(400);
    }
})

//CREO LA RUTA '/api/productos/:id' CON METODO delete, LA CUAL ELIMINA UN PRODUCTO SEGUN SU ID//
rutaProductos.delete('/:id', async(peticion,respuesta)=>{
    const producto = peticion.params.id;
    try{
        let borrar = await productos.deleteById(producto);
        respuesta.json({
            borrarProducto: borrar,
            productos: await productos.getAll()
        });  
    }catch(error){
        console.log(error)
        res.sendStatus(404)
    }
})

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO, ()=> console.log(`Servidor escuchandose en http://localhost:${PUERTO}`))