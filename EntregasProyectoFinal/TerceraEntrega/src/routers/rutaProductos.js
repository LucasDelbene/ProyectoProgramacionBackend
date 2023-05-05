//RUTA DE PRODUCTOS//

//IMPORTO Router DE express PARA PODER UTILIZARLO//
import {Router} from 'express';

//IMPORTO LAS FUNCIONES DE PRODUCTOS PARA PODER UTILIZARLAS//
import {obtenerTodosLosProductos, obtenerProductoPorId, agregarProducto, actualizarProductoPorId, borrarProductoPorId} from '../controller/productosController.js';

const rutaProductos = Router();
rutaProductos.get('/', obtenerTodosLosProductos);
rutaProductos.get('/:id', obtenerProductoPorId);
rutaProductos.post('/', agregarProducto);
rutaProductos.put('/:id', actualizarProductoPorId);
rutaProductos.delete('/:id', borrarProductoPorId);

export default rutaProductos;