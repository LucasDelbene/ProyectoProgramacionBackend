//REQUIERO Router DE express PARA PODER UTILIZARLO//
const {Router} = require('express');

//REQUIERO LAS FUNCIONES DE LA CARPETA '../controller/productosController'//
const {getAllProducts, getProductById, addProduct, updateProductById, deleteProductById} = require('../controller/productosController');
const rutaProductos = Router();

//CREO LAS RUTAS DE PRODUCTOS//
rutaProductos.get('/', getAllProducts);           //ME PERMITE LISTAR TODOS LOS PRODUCTOS DISPONIBLES
rutaProductos.get('/:id', getProductById);        //ME PERMITE LISTAR TODOS LOS PRODUCTOS DISPONIBLES o UN PRODUCTO POR SU ID 
rutaProductos.post('/', addProduct);              //INCORPORA PRODUCTOS AL LISTADO
rutaProductos.put('/:id', updateProductById);     //ACTUALIZA UN PRODUCTO POR SU ID 
rutaProductos.delete('/:id', deleteProductById);  //BORRA UN PRODUCTO POR SU ID

module.exports = rutaProductos;