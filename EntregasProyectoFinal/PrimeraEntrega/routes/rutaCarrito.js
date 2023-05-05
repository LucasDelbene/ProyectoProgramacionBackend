//REQUIERO Router DE express PARA PODER UTILIZARLO//
const {Router} = require('express');

//REQUIERO LAS FUNCIONES DE LA CARPETA '../controller/carritoController'//
const{getAllProductsByIdCart, createCart, addProduct, deleteCartById, deleteProductById} = require('../controller/carritoController');
const rutaCarrito = Router();

//CREO LAS RUTAS DE CARRITO//
rutaCarrito.get('/:id/productos', getAllProductsByIdCart);         //ME PERMITE LISTAR TODOS LOS PRODUCTOS GUARDADOS EN EL CARRITO
rutaCarrito.post('/', createCart);                                 //CREA UN CARRITO y DEVUELVE SU ID
rutaCarrito.post('/:idCar/:idProd',addProduct);                    //INCORPORA PRODUCTOS AL CARRITO POR SU ID DE PRODUCTO
rutaCarrito.delete('/:id', deleteCartById);                        //VACIA UN CARRITO y LO ELIMINA
rutaCarrito.delete('/:id/productos/:id_prod', deleteProductById);  //ELIMINA UN PRODUCTO DEL CARRITO POR SU ID DE CARRITO y DE PRODUCTO

module.exports = rutaCarrito;