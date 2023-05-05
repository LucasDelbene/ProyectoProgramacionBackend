//REQUIERO EL CRUD de CARRITOS DESDE LA CARPETA '../dataBase/crudCarrito'//
const CrudCarritos = require('../dataBase/crudCarrito');
//REQUIERO EL CRUD de PRODUCTOS DESDE LA CARPETA '../dataBase/crudProductos'//
const CrudProductos = require('../dataBase/crudProductos');

let myCrudCarrito = new CrudCarritos('../dataBase/carrito.txt');
let myCrudProductos = new CrudProductos('../dataBase/productos.txt');

//TRAE TODOS LOS PRODUCTOS DEL CARRITO POR ID//
const getAllProductsByIdCart = async (peticion, respuesta) =>{
    try{
        let idCarrito = peticion.params.id;
        let productosById = await myCrudCarrito.getProductsByID(idCarrito);
        if(productosById.length == 0){
            return respuesta.json(`CARRITO VACIO`);
        }else{
            return respuesta.json(productosById);
        }
    }catch(error){
        return respuesta.status(404).json({
            error: `ERROR ${error}`
        });
    }
};

//CREA CARRITO//
const createCart = async (peticion, respuesta) =>{
    try{
        const id = await myCrudCarrito.createCart();
        return respuesta.json(`NUEVO CARRITO ASIGNADO CON EL ID ${id}`);
    }catch(error){
        return respuesta.status(404).json({
            error: `ERROR ${error}`
        });
    }
};

//AGREGA PRODUCTO//
const addProduct = async (peticion, respuesta) =>{
    try{
        let idCarrito = Number(peticion.params.idCarrito);
        let idProducto = peticion.params.idProducto;

        let todoElCarrito = await myCrudCarrito.getAll();

        const carritoIndex = todoElCarrito.findIndex(carrito => carrito.id === idCarrito);

        if(carritoIndex < 0){
            return respuesta.status(401).json({
                error: "CARRITO NO ENCONTRADO"
            });
        };

        let carrito = await myCrudCarrito.getCartById(idCarrito);

        if(carrito.length == 0){
            return respuesta.status(404).json({
                error: `NO SE ENCONTRO EL CARRITO`
            });
        };

        let productoById = await myCrudProductos.getById(idProducto);

        if(productoById.length == 0){
            return respuesta.status(404).json({
                error: `PRODUCTO NO ENCONTRADO`
            });
        };

        todoElCarrito[carritoIndex].productos.push(productoById[0]);

        await myCrudCarrito.write(todoElCarrito, `PRODUCTO AGREGADO AL CARRITO`);
        return respuesta.json(`SE AGREGO EL PRODUCTO CON ID ${idProducto} AL CARRITO CON ID ${idCarrito}`);

    }catch(error){
        return res.status(404).json({
            error: `ERROR ${error}`
        });
    }
};

//BORRA UN PRODUCTO DEL CARRITO POR ID//
const deleteCartById = async (peticion, respuesta) =>{
    try{
        const idCarrito = Number(peticion.params.id);

        await myCrudCarrito.deleteCartById(idCarrito);
        return respuesta.json(`SE ELIMINO EXITOSAMENTE EL CARRITO CON ID ${idCarrito}`);
    }catch(error){
        return respuesta.status(404).json({
            error: `ERROR ${error}`
        });
    }
};

//BORRA UN PRODUCTO POR ID//
const deleteProductById = async (peticion, respuesta) =>{
    try{
        const idCarrito = Number(peticion.params.id);
        const idProducto = Number(peticion.params.id_prod);

        await myCrudCarrito.deleteProductById(idCarrito, idProducto);

        return respuesta.json(`PRODUCTO CON ID ${idProducto} DEL CARRITO CON ID ${idCarrito} FUE ELIMINADO EXITOSAMENTE`);
    }catch(error){
        return respuesta.status(404).json({
            error: `ERROR ${error}`
        });
    }
};

module.exports = {getAllProductsByIdCart, createCart, addProduct, deleteCartById, deleteProductById};