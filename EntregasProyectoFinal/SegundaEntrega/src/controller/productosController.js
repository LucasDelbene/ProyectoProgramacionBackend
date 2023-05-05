const Productos = require(`../dataBase/productos`);
let misProductos = new Productos(`../dataBase/productos.json`);
let administrador = true;

//OBTENER TODOS LOS PRODUCTOS//
const getAllProducts = async (req, res) => {
    try{
        let todosLosProductos = await misProductos.getAll();
        return res.json(todosLosProductos);
    }catch(err){
        return res.status(404).json({
            error: `ERROR ${err}`
        });
    }
}

//OBTENER PRODUCTO SEGUN ID//
const getProductById = async (req, res) => {
    try{
        let productoSegunId = await misProductos.getById(req.params.id);
        if(productoSegunId.length == 0){
            return res.status(404).json({
                error: `ERROR: PRODUCTO NO ENCONTRADO!`
            });
        }else{
            return res.json(productoSegunId);
        }
    }catch(err){
        return res.status(404).json({
            error: `ERROR ${err}`
        });
    }
}

//AGREGA PRODUCTO//
const addProduct = async (req, res) => {
    if(administrador){
        try{
            const nombre = req.body.nombre;
            const precio = Number(req.body.precio);
            const imagen = req.body.imagen;
            const descripcion = req.body.descripcion;
            const date = new Date().toDateString();
            const codigo = Number(req.body.codigo);
            const stock = Number(req.body.stock);

            const nuevoProducto = {
                timestamp: date,
                nombre: `${nombre}`,
                descripcion: `${descripcion}`,
                codigo: codigo,
                imagen: `${imagen}`,
                precio: precio,
                stock: stock
            };

            const id = await misProductos.save(nuevoProducto);
            return res.json(`EL ID ASIGNADO ES ${id}`);
        }catch(err){
            return res.status(404).json({
                error: `ERROR ${err}`
            });
        }
    }else{
        return res.status(404).json({
            error: `ERROR: RUTA NO PERMITIDA`
        });
    }
}

//ACTUALIZAR PRODUCTO SEGUN ID//
const updateProductById = async (req, res) => {
    if(administrador){
        try{
            const id = Number(req.params.id);
            const nombre = req.body.nombre;
            const precio = Number(req.body.precio);
            const imagen = req.body.imagen;
            const descripcion = req.body.descripcion;
            const date = new Date().toDateString();
            const codigo = Number(req.body.codigo);
            const stock = Number(req.body.stock);

            let todosLosProductos = await misProductos.getAll();
            const indexProducto = todosLosProductos.findIndex(producto => producto.id === id);
            if(indexProducto < 0){
                return res.status(401).json({
                    error: "ERROR: PRODUCTO NO ENCONTRADO"
                });
            }

            todosLosProductos[indexProducto].nombre = nombre;
            todosLosProductos[indexProducto].imagen = imagen;
            todosLosProductos[indexProducto].timestamp = date;
            todosLosProductos[indexProducto].descripcion = descripcion;
            todosLosProductos[indexProducto].codigo = codigo;
            todosLosProductos[indexProducto].precio = precio;
            todosLosProductos[indexProducto].stock = stock;

            await misProductos.write(todosLosProductos, `MENSAJE MODIFICADO CON EXITO!`);
            return res.json(`SE ACTUALIZO EL ID ${id}`);

        }catch(err){
            return res.status(404).json({
                error: `ERROR ${err}`
            });
        }
    }else{
        return res.status(404).json({
            error: `ERROR: RUTA NO PERMITIDA`
        });
    }
}

//BORRA UN PRODUCTO POR ID//
const deleteProductById = async (req, res) => {
    if(administrador){
        try{
            const id = Number(req.params.id);
            await misProductos.deleteById(id);
            return res.json(`SE ELIMINO CON EXITO EL ID:${id}`);
        }catch(err){
            return res.status(404).json({
                error: `ERROR ${err}`
            });
        }
    }else{
        return res.status(404).json({
            error: `ERROR: RUTA NO PERMITIDA`
        });
    }
}

module.exports = {getAllProducts, getProductById, addProduct, updateProductById, deleteProductById};