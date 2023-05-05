//DAO DE INDEX//

//REALIZO LAS IMPORTACIONES DE DAO MongoDB PARA PODER UTILIZARLAS//
import CarritoDAOMongoDB from '../DAOs/carrito/CarritoDAOMongoDB.js';
import PedidosDAOMongoDB from '../DAOs/pedidos/PedidosDAOMongoDB.js';
import ProductosDAOMongoDB from '../DAOs/productos/ProductosDAOMongoDB.js';

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