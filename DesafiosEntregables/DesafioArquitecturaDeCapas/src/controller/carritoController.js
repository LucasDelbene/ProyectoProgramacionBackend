//CONTROLLER DE CARRITO//

//IMPORTO storage PARA PODER UTILIZARLO//
import storage from '../daos/index.js';
const productosStorage = storage().carrito;

//FUNCION PARA OBTENER TODOS LOS PRODUCTOS DEL CARRITO POR ID//
const obtenerProductosCarritoPorId = async(peticion,respuesta)=>{
    try{
        let idCarrito = peticion.params.id;
        let productosPorId = await productosStorage.getProductsByID(idCarrito);

        if(productosPorId.length == 0){
            return respuesta.json('Carrito Vacio');
        }else{
            return respuesta.json(productosPorId);
        }
    }catch(error){
        return respuesta.status(404).json({
            error: `ERROR AL INTENTAR ACCEDER A UN ID DEL PRODUCTO EN EL CARRITO ${error}`
        });
    }
};

//FUNCION PARA CREAR CARRITO//
const crearCarrito = async(peticion,respuesta,next)=>{
    try{
        usuarioLogueado = peticion.usuario;
        const carrito = await productosStorage.createCart();
        return respuesta.redirect('/api/productos');
    }catch(error){
        return respuesta.status(404).json({
            error: `ERROR AL CREAR EL CARRITO ${error}`
        });
    }
};

//FUNCION PARA AGREGAR PRODUCTO AL CARRITO//
const agregarProductoAlCarrito = async(peticion,respuesta)=>{
    try{
        const idUsuario = peticion.body.idUsuario;
        const idProducto = peticion.body.idProducto;

        await productosStorage.addProduct(idUsuario,idProducto);
        return respuesta.redirect('/api/productos')
    }catch(error){
        return respuesta.status(404).json({
            error: `ERROR AL AGREGAR UN PRODUCTO AL CARRITO ${error}`
        });
    }
};

//FUNCION PARA BORRAR CARRITO POR ID//
const borrarCarritoPorId = async(peticion,respuesta)=>{
    try{
        const idCarrito = peticion.params.id;

        await productosStorage.deleteCartById(idCarrito);
        return respuesta.json('Carrito Borrado con Exito');
    }catch(error){
        return respuesta.status(404).json({
            error: `ERROR AL BORRAR EL CARRITO ${error}`
        });
    }
};

//FUNCION PARA BORRAR UN PRODUCTO DEL CARRITO POR ID//
const borrarProductoCarritoPorId = async(peticion,respuesta)=>{
    try{
        const idUsuario = peticion.body.idUsuario;
        const idProducto = peticion.body.idProducto;

        await productosStorage.deleteProductById(idUsuario,idProducto);
        return respuesta.redirect('/api/carrito')
    }catch(error){
        return respuesta.status(404).json({
            error: `ERROR AL BORRAR UN PRODUCTO DEL CARRITO POR ID ${error}`
        });
    }
};

//FUNCION PARA VER CARRITO//
const verCarrito = (peticion,respuesta)=>{
    usuarioLogueado = peticion.usuario;
    return respuesta.render('carrito', {usuarioLogueado});
}

//EXPORTACION DE LAS FUNCIONES//
export default {obtenerProductosCarritoPorId, crearCarrito, agregarProductoAlCarrito, borrarCarritoPorId, borrarProductoCarritoPorId, verCarrito};
