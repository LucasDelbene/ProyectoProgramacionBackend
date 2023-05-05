//RUTA DE PEDIDOS//

//IMPORTO Router DE express PARA PODER UTILIZARLO//
import {Router} from 'express';

//IMPORTO LAS FUNCIONES DE PEDIDOS PARA PODER UTILIZARLAS//
import {crearPedido, verPedido} from '../controller/pedidosController.js';

const rutaPedidos = Router();
rutaPedidos.get('/', verPedido);
rutaPedidos.post('/', crearPedido);

export default rutaPedidos;





