//RUTA DE CARRITO//

//IMPORTO Router DE express PARA PODER UTILIZARLO//
import {Router} from 'express';

//IMPORTO LAS FUNCIONES DE CARRITO PARA PODER UTILIZARLAS//
import {obtenerProductosCarritoPorId, crearCarrito, agregarProductoAlCarrito, borrarCarritoPorId, borrarProductoCarritoPorId, verCarrito} from '../controller/carritoController.js';

const rutaCarrito = Router();
rutaCarrito.get('/:id/productos', obtenerProductosCarritoPorId);
rutaCarrito.get('/', verCarrito);
rutaCarrito.post('/', crearCarrito);
rutaCarrito.post('/agregarProducto', agregarProductoAlCarrito);
rutaCarrito.post('/borrarProducto', borrarProductoCarritoPorId);
rutaCarrito.delete('/:id', borrarCarritoPorId);

export default rutaCarrito;


