const ProductosDAOMongoDB = require('../daos/productos/ProductosDAOMongoDB');
const CarritoDAOMongoDB = require('../daos/carrito/CarritoDAOMongoDB');

const getStorage = () => {
    const storage = 'MongoDB';

    switch (storage) {
        case 'MongoDB':
            return {
                productos: new ProductosDAOMongoDB(),
                carrito: new CarritoDAOMongoDB()
            }
    }
}

module.exports = getStorage;