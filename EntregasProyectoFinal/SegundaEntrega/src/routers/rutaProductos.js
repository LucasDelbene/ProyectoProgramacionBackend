//REQUIERO Router DE express PARA PODER UTILIZARLO//
const {Router} = require('express');
const {getAllProducts, getProductById, addProduct, updateProductById, deleteProductById} = require('../controller/productosController');

const rutaProductos = Router();

//IMPLEMENTANDO RUTAS//
rutaProductos.get(`/`, getAllProducts);
rutaProductos.get(`/:id`, getProductById);       //ME PERMITE LISTAR TODOS LOS PRODUCTOS DISPONIBLES O UN PRODUCTO POR SU ID//
rutaProductos.post(`/`, addProduct);             //PARA INCORPORAR PRODUCTOS AL LISTADO//
rutaProductos.put(`/:id`, updateProductById);    //ACTUALIZA UN PRODUCTO POR SU ID//
rutaProductos.delete(`/:id`, deleteProductById); //BORRA UN PRODUCTO POR SU ID//

module.exports = rutaProductos;