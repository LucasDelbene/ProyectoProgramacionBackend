//RUTA DE CARRITO//

//REALIZO LAS IMPORTACIONES//
import {Router} from 'express';
import {getAllProductsByIdCart, createCart, viewCart, addProductToCart, deleteCartById, deleteProductById} from '../controller/carritoController.js';

//RUTAS//
const carritoRouter = Router();
carritoRouter.get('/:id/productos', getAllProductsByIdCart);
carritoRouter.get('/', viewCart);
carritoRouter.post('/', createCart);
carritoRouter.post('/addProduct', addProductToCart);
carritoRouter.post('/deleteProduct', deleteProductById);
carritoRouter.delete('/:id', deleteCartById);
export default carritoRouter;


