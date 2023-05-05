//REQUIERO EL CRUD de PRODUCTOS DESDE LA CARPETA '../dataBase/crudProductos'//
const CrudProductos = require('../dataBase/crudProductos');

let myCrudProductos = new CrudProductos('../dataBase/productos.txt');
let administrador = true;

//TRAE TODOS LOS PRODUCTOS//
const getAllProducts = async (peticion, respuesta) =>{
    try{
        let todosLosProductos = await myCrudProductos.getAll();
        return respuesta.json(todosLosProductos);
    }catch(error){
        return respuesta.status(404).json({
            error: `ERROR ${error}`
        });
    }
}

//TRAE UN PRODUCTO POR ID//
const getProductById = async (peticion, respuesta) =>{
    try{
        let productoById = await myCrudProductos.getById(peticion.params.id);
        if (productoById.length == 0) {
            return respuesta.status(404).json({
                error: `PRODUCTO NO ENCONTRADO`
            });
        }else{
            return respuesta.json(productoById);
        }
    }catch(error){
        return respuesta.status(404).json({
            error: `ERROR ${error}`
        });
    }
}

//AGREGA PRODUCTO//
const addProduct = async (peticion, respuesta) =>{
    if (administrador){
        try{
            const nombre = peticion.body.nombre;
            const precio = Number(peticion.body.precio);
            const imagen = peticion.body.imagen;
            const descripcion = peticion.body.descripcion;
            const date = new Date().toDateString();
            const codigo = Number(peticion.body.codigo);
            const stock = Number(peticion.body.stock);

            const nuevoProducto = {
                timestamp: date,
                nombre: `${nombre}`,
                descripcion: `${descripcion}`,
                codigo: codigo,
                imagen: `${imagen}`,
                precio: precio,
                stock: stock
            };
            const id = await myCrudProductos.save(nuevoProducto);

            return respuesta.json(`EL ID ASIGNADO ES ${id}`);
        }catch(error){
            return respuesta.status(404).json({
                error: `ERROR ${error}`
            });
        }
    }else{
        return respuesta.status(404).json({
            error: `RUTA NO PERMITIDA, NO ES USUARIO CON PERFIL ADMINISTRADOR`
        });
    }
}

//ACTUALIZAR PRODUCTO POR ID//
const updateProductById = async (peticion, respuesta) =>{
    if (administrador){
        try{
            const id = Number(peticion.params.id);
            const nombre = peticion.body.nombre;
            const precio = Number(peticion.body.precio);
            const imagen = peticion.body.imagen;
            const descripcion = peticion.body.descripcion;
            const date = new Date().toDateString();
            const codigo = Number(peticion.body.codigo);
            const stock = Number(peticion.body.stock);

            let todosLosProductos = await myCrudProductos.getAll();
            const productoIndex = todosLosProductos.findIndex(producto => producto.id === id);

            if(productoIndex < 0){
                return respuesta.status(401).json({
                    error: "PRODUCTO NO ENCONTRADO"
                });
            }
            todosLosProductos[productoIndex].nombre = nombre;
            todosLosProductos[productoIndex].imagen = imagen;
            todosLosProductos[productoIndex].timestamp = date;
            todosLosProductos[productoIndex].descripcion = descripcion;
            todosLosProductos[productoIndex].codigo = codigo;
            todosLosProductos[productoIndex].precio = precio;
            todosLosProductos[productoIndex].stock = stock;

            await myCrudProductos.write(todosLosProductos, `MENSAJE MODIFICADO`);
            return respuesta.json(`SE ACTUALIZO EL ID ${id}`);

        }catch(error){
            return respuesta.status(404).json({
                error: `ERROR ${error}`
            });
        }
    }else{
        return respuesta.status(404).json({
            error: `RUTA NO PERMITIDA, NO ES USUARIO CON PERFIL ADMINISTRADOR`
        });
    }
}

//BORRAR PRODUCTO POR ID//
const deleteProductById = async (peticion, respuesta) =>{
    if (administrador){
        try{
            const id = Number(peticion.params.id);
            await myCrudProductos.deleteById(id);

            return respuesta.json(`SE ELIMINO DE FORMA CORRECTA EL ID:${id}`);
        }catch(error){
            return respuesta.status(404).json({
                error: `ERROR ${error}`
            });
        }
    }else{
        return respuesta.status(404).json({
            error: `RUTA NO PERMITIDA, NO ES USUARIO CON PERFIL ADMINISTRADOR`
        });
    }
}

module.exports = {getAllProducts, getProductById, addProduct, updateProductById, deleteProductById};
