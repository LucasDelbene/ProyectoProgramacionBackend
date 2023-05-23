//CONTROLLER DE CARRITO//

//IMPORTO storage PARA PODER UTILIZARLO//
import storage from '../daos/index.js';
const productsStorage = storage.carrito;

//FUNCION PARA OBTENER TODOS LOS PRODUCTOS DEL CARRITO POR ID//
const getAllProductsByIdCart = async (peticion,respuesta)=>{
    try{
        let idCart = peticion.params.id;
        let productsbyId = await productsStorage.getProductsByID(idCart);

        if(productsbyId.length == 0){
            return respuesta.json('EL CARRITO ESTA VACIO');
        }else{
            return respuesta.json(productsbyId);
        }
    }catch(error){
        return respuesta.status(404).json({
            error: `ERROR AL OBTENER EL PRODUCTO POR ID ${error}`
        });
    }
};

//FUNCION PARA CREAR CARRITO//
const createCart = async (peticion,respuesta,next)=>{
    try{
        userLog = peticion.user;
        const cart = await productsStorage.createCart();
        return respuesta.redirect('/api/productos');
    }catch(error){
        return respuesta.status(404).json({
            error: `ERROR AL CREAR EL CARRITO ${error}`
        });
    }
};

//FUNCION PARA AGREGAR PRODUCTO AL CARRITO//
const addProductToCart = async (peticion,respuesta)=>{
    try{
        const idUser = peticion.body.idUser;
        const idProduct = peticion.body.idProduct;
        await productsStorage.addProduct(idUser, idProduct);

        return respuesta.redirect('/api/productos')
    }catch(error){
        console.log("ERROR AL AGREGAR UN PRODUCTO AL CARRITO:", error);
        return respuesta.status(404).json({
            error: `ERROR AL AGREGAR UN PRODUCTO AL CARRITO ${error}`
        });
    }
};

//FUNCION PARA BORRAR CARRITO POR ID//
const deleteCartById = async (peticion,respuesta)=>{
    try{
        const idCart = peticion.params.id;
        await productsStorage.deleteCartById(idCart);

        return respuesta.json('CARRITO ELIMINADO EXITOSAMENTE');
    }catch(error){
        return respuesta.status(404).json({
            error: `ERROR AL ELIMINAR CARRITO POR ID ${error}`
        });
    }
};

//FUNCION PARA BORRAR PRODUCTO POR ID//
const deleteProductById = async (peticion,respuesta)=>{
    try{
        const idUser = peticion.body.idUser;
        const idProduct = peticion.body.idProduct;
        await productsStorage.deleteProductById(idUser, idProduct);

        return respuesta.redirect('/api/carrito')
    }catch(error){
        console.log("ERROR AL BORRAR UN PRODUCTO POR ID:", error);
        return respuesta.status(404).json({
            error: `ERROR AL BORRAR UN PRODUCTO POR ID ${error}`
        });
    }
};

//FUNCION PARA VER CARRITO//
const viewCart = (peticion,respuesta)=>{
    const userLog = peticion.user;
    return respuesta.render('carrito', { userLog });
}

export {getAllProductsByIdCart, createCart, addProductToCart, deleteCartById, deleteProductById, viewCart};