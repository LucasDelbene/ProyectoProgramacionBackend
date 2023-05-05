//REQUIERO Router DE express PARA PODER UTILIZARLO//
const {Router} = require('express');
const {getAllProductsByIdCart, createCart, addProduct, deleteCartById, deleteProductById} = require('../controller/carritoController');

const rutaCarrito = Router();

//IMPLEMENTANDO RUTAS//
rutaCarrito.get(`/:id/productos`, getAllProductsByIdCart);        //ME PERMITE LISTAR TODOS LOS PRODUCTOS GUARDADOS EN EL CARRITO//
rutaCarrito.post(`/`, createCart);                                //CREA UN CARRITO Y DEVUELVE SU ID//
rutaCarrito.post(`/:idCar/:idProd`,addProduct);                   //PARA INCORPORAR PRODUCTOS AL CARRITO POR SU ID DE PRODUCTO//
rutaCarrito.delete(`/:id`, deleteCartById);                       //VACIA UN CARRITO Y LO ELIMINA//
rutaCarrito.delete(`/:id/productos/:id_prod`, deleteProductById); //ELIMINAR UN PRODUCTO DEL CARRITO POR SU ID DE CARRITO Y DE PRODUCTO//

module.exports = rutaCarrito;