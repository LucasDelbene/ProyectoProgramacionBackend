//RUTA DE PRODUCTOS//

//REALIZO LAS IMPORTACIONES//
import {Router} from 'express';
import {getAllProducts, getProductById, addProduct, updateProductById, deleteProductById} from '../controller/productosController.js';

//RUTAS//
const productosRouter = Router();
productosRouter.get('/', getAllProducts);
productosRouter.get('/:id', getProductById);
productosRouter.post('/', addProduct);
productosRouter.put('/:id', updateProductById);
productosRouter.delete('/:id', deleteProductById);
export default productosRouter;