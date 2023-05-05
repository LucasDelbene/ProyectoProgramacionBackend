//DAO DE INDEX//

//REALIZO LAS IMPORTACIONES DE DAO MongoDB PARA PODER UTILIZARLAS//
import CarritoDAOMongoDB from '../daos/carrito/CarritoDAOMongoDB.js';
import PedidosDAOMongoDB from '../daos/pedidos/PedidosDAOMongoDB.js';
import ProductosDAOMongoDB from '../daos/productos/ProductosDAOMongoDB.js';

//FUNCION PARA OBTENER STORAGE//
const obtenerStorage = ()=>{
    const storage = 'MongoDB'; 

    switch(storage){
        case 'MongoDB':
            return{
                productos: new ProductosDAOMongoDB(),
                carrito: new CarritoDAOMongoDB(),
                pedidos: new PedidosDAOMongoDB()
            }
            break
        default:
            return{
                productos: new ProductosDAOMongoDB(),
                carrito: new CarritoDAOMongoDB(),
                pedidos: new PedidosDAOMongoDB()
            }
            break
    }
}
export default obtenerStorage;