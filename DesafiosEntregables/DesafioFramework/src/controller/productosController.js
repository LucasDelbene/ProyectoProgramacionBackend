//CONTROLLER DE PRODUCTOS//

//IMPORTO storage PARA PODER UTILIZARLO//
import storage from '../DAOs/index.js';
const productosStorage = storage().productos;

//FUNCION PARA AGREGAR PRODUCTO//
const agregarProducto = async(peticion,respuesta)=>{
    if(usuarioLogueado.admin){
        try{
            const name = peticion.body.nombre;
            const price = Number(peticion.body.precio);
            const url = peticion.body.thumbnail;
            const description = peticion.body.descripcion;
            const date = new Date().toDateString();
            const code = Number(peticion.body.codigo);
            const stock = Number(peticion.body.stock);

            const nuevoProducto = {
                timestamp: date,
                nombre: `${name}`,
                descripcion: `${description}`,
                codigo: code,
                thumbnail: `${url}`,
                precio: price,
                stock: stock,
                cantidad: 0
            };
            const id = await productosStorage.save(nuevoProducto);

            return respuesta.redirect('/api/productos');
        }catch(error){
            return respuesta.status(404).json({
                error: `ERROR AL AGREGAR EL PRODUCTO ${error}`
            });
        }
    }else{
        return respuesta.status(404).json({
            error: `RUTA NO PERMITIDA, NO ERES USUARIO ADMINISTRADOR!`
        });
    }
}

//FUNCION PARA OBTENER TODOS LOS PRODUCTOS//
const obtenerTodosLosProductos = async(peticion,respuesta)=>{
    try{
        usuarioLogueado = peticion.usuario;
        let todosLosProductos = await productosStorage.getAll();
        return respuesta.render('productos', {todosLosProductos,usuarioLogueado});
    }catch(error){
        return respuesta.status(404).json({
            error: `ERROR AL OBTENER TODOS LOS PRODUCTOS ${error}`
        });
    }
}

//FUNCION PARA OBTENER UN PRODUCTO POR ID//
const obtenerProductoPorId = async(peticion,respuesta)=>{
    try{
        let idCarrito = peticion.params.id;
        let productoPorId = await productosStorage.getById(idCarrito);

        if(!productoPorId){
            return respuesta.status(404).json({
                error: `ERROR PRODUCTO NO ENCONTRADO`
            });
        }else{
            return respuesta.render('productosPorId', {productoPorId});
        }
    }catch(error){
        return respuesta.status(404).json({
            error: `ERROR AL OBTENER EL PRODUCTO POR ID ${error}`
        });
    }
}

//FUNCION PARA ACTUALIZAR PRODUCTO POR ID//
const actualizarProductoPorId = async(peticion,respuesta)=>{
    if(usuarioLogueado.admin){
        try{
            const idProduct = peticion.params.id;
            const name = peticion.body.nombre;
            const price = Number(peticion.body.precio);
            const url = peticion.body.thumbnail;
            const description = peticion.body.descripcion;
            const date = new Date().toDateString();
            const code = Number(peticion.body.codigo);
            const stock = Number(peticion.body.stock);

            await productosStorage.updateById(idProduct, name, price, url, description, date, code, stock);
            return respuesta.json('PRODUCTO ACTUALIZADO CON EXITO');
        }catch(error){
            return respuesta.status(404).json({
                error: `ERROR AL ACTUALIZAR EL PRODUCTO ${error}`
            });
        }
    }else{
        return respuesta.status(404).json({
            error: `RUTA NO PERMITIDA, NO ERES USUARIO ADMINISTRADOR!`
        });
    }
}

//FUNCION PARA BORRAR PRODUCTO POR ID//
const borrarProductoPorId = async(peticion,respuesta)=>{
    if(usuarioLogueado.admin){
        try{
            const id = peticion.params.id;
            await productosStorage.deleteById(id);
            return respuesta.json(`PRODUCTO CON ID :${id} BORRADO CON EXITO`);
        }catch(error){
            return respuesta.status(404).json({
                error: `ERROR AL BORRAR UN PRODUCTO POR ID ${error}`
            });
        }
    }else{
        return respuesta.status(404).json({
            error: `RUTA NO PERMITIDA, NO ERES USUARIO ADMINISTRADOR!`
        });
    }
}
export default {agregarProducto, obtenerTodosLosProductos, obtenerProductoPorId, actualizarProductoPorId, borrarProductoPorId};

