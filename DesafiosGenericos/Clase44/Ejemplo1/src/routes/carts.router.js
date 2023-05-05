//RUTA DE CARRITO//

//REALIZO LAS IMPORTACIONES PARA PODER UTILIZARLAS//
import {Router} from 'express';
import cartsController from '../controllers/carts.controller.js';

const router = Router();

router.get('/videogame/:vid', executePolicies(["USER"]), cartsController.insertGameToCart);

export default router;

/*
EXPLICACION DEL CODIGO DEL ARCHIVO carts.router.js:

Este es un codigo que utiliza el framework Express de Node.js para crear rutas en una aplicacion web. En este caso, se esta definiendo
una ruta para manejar una peticion GET a la URL "/videogame/:vid". Esta ruta esta protegida por politicas de acceso que restringen el acceso
a usuarios autenticados ("USER"). Cuando se realiza una solicitud a esta ruta, se ejecuta la funcion "cartsController.insertGameToCart",
que es responsable de agregar un videojuego al carrito de compras del usuario.
*/
