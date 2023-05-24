//CONTROLLER DE PRODUCTOS//

//IMPORTO storage PARA PODER UTILIZARLO//
import storage from '../daos/index.js';
const productsStorage  = storage.productos;

//FUNCION PARA AGREGAR PRODUCTO//
const addProduct = async (peticion,respuesta)=>{
    const userLog = peticion.user;
    if(userLog){
        try{
            const name = peticion.body.nombre;
            const price = Number(peticion.body.precio);
            const url = peticion.body.thumbnail;
            const description = peticion.body.descripcion;
            const date = new Date().toDateString();
            const code = Number(peticion.body.codigo);
            const stock = Number(peticion.body.stock);

            const newProduct ={
                timestamp: date,
                nombre: `${name}`,
                descripcion: `${description}`,
                codigo: code,
                thumbnail: `${url}`,
                precio: price,
                stock: stock,
                cantidad: 0
            };
            const id = await productsStorage.save(newProduct);
            return respuesta.redirect('/api/productos');
        }catch(error){
            console.log(error);
            return respuesta.status(404).json({
                error: `ERROR AL AGREGAR PRODUCTO ${error}`
            });
        }
    }else{
        return respuesta.status(404).json({
            error: `RUTA NO PERMITIDA, NO SOS USUARIO CON PERFIL ADMINISTRADOR`
        });
    }
};

//FUNCION PARA OBTENER TODOS LOS PRODUCTOS//
const getAllProducts = async (peticion,respuesta)=>{
    try{
        const userLog = peticion.user;
        let allProducts = await productsStorage.getAll();

        return respuesta.render('productos', {allProducts, userLog});
    }catch(error){
        return respuesta.status(404).json({
            error: `ERROR AL OBTENER TODOS LOS PRODUCTOS ${error}`
        });
    }
}

//FUNCION PARA OBTENER PRODUCTO POR ID//
const getProductById = async (peticion,respuesta)=>{
    try{
        let idCart = peticion.params.id;
        let productbyId = await productsStorage.getById(idCart);

        if(!productbyId){
            return respuesta.status(404).json({
                error: `PRODUCTO NO ENCONTRADO`
            });
        }else{
            return respuesta.render('productosById', {productbyId});
        }
    }catch(error){
        return respuesta.status(404).json({
            error: `ERROR AL OBTENER PRODUCTO POR ID ${error}`
        });
    }
}

//FUNCION PARA ACTUALIZAR PRODUCTO POR ID//
const updateProductById = async (peticion,respuesta)=>{
    const userLog = peticion.user;
    if(userLog.admin){
        try{
            const idProduct = peticion.params.id;
            const name = peticion.body.nombre;
            const price = Number(peticion.body.precio);
            const url = peticion.body.thumbnail;
            const description = peticion.body.descripcion;
            const date = new Date().toDateString();
            const code = Number(peticion.body.codigo);
            const stock = Number(peticion.body.stock);
            await productsStorage.updateById(idProduct, name, price, url, description, date, code, stock);

            return respuesta.json(`PRODUCTO ACTUALIZADO EXITOSAMENTE`);
        }catch(error){
            return respuesta.status(404).json({
                error: `ERROR AL ACTUALIZAR UN PRODUCTO ${error}`
            });
        }
    }else{
        return respuesta.status(404).json({
            error: `RUTA NO PERMITIDA, NO SOS USUARIO CON PERFIL ADMINISTRADOR`
        });
    }
}

//FUNCION PARA BORRAR PRODUCTO POR ID//
const deleteProductById = async (peticion,respuesta)=>{
    if(userLog.admin){
        try{
            const id = peticion.params.id;
            await productsStorage.deleteById(id);

            return respuesta.json(`PRODUCTO CON ID ${id} BORRADO EXITOSAMENTE`);
        }catch(error){
            return respuesta.status(404).json({
                error: `ERROR AL BORRAR UN PRODUCTO POR ID ${error}`
            });
        }
    }else{
        return respuesta.status(404).json({
            error: `RUTA NO PERMITIDA, NO SOS USUARIO CON PERFIL ADMINISTRADOR`
        });
    }
}

export {getAllProducts, getProductById, addProduct, updateProductById, deleteProductById};
