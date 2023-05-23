//REALIZO LAS IMPORTACIONES//
import ProductosDAOMongoDB from '../daos/productos/ProductosDAOMongoDB.js';
import CarritoDAOMongoDB from '../daos/carrito/CarritoDAOMongoDB.js'; 
import OrdenesDAOMongoDB from '../daos/ordenes/OrdenesDAOMongoDB.js';

//FUNCION DE OBTENER ALMACENAMIENTO//
const getStorage = ()=>{
    const storage = 'MongoDb';
    switch(storage){

        case 'MongoDB':
            return{
                productos: new ProductosDAOMongoDB(),
                carrito: new CarritoDAOMongoDB(),
                ordenes: new OrdenesDAOMongoDB()
            }
            break

        default:
            return{
                productos: new ProductosDAOMongoDB(),
                carrito: new CarritoDAOMongoDB(),
                ordenes: new OrdenesDAOMongoDB()
            }
            break
    }
}
const storage = getStorage();
export default storage;