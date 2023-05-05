const Carrito = require(`../dataBase/carrito`);
const Productos = require(`../dataBase/productos`);
let miCarrito = new Carrito(`../dataBase/carrito.json`);
let misProductos = new Productos(`../dataBase/productos.json`);

//OBTIENE TODOS LOS PRODUCTOS SEGUN ID//
const getAllProductsByIdCart = async (req, res) => {
    try{
        let idCarrito = req.params.id;
        let productoSegunID = await miCarrito.getProductsByID(idCarrito);
        if (productoSegunID.length == 0) {
            return res.json(`CARRITO VACIO`);
        } else {
            return res.json(productoSegunID);
        }
    }catch(err){
        return res.status(404).json({
            error: `ERROR ${err}`
        });
    }
};

//CREA EL CARRITO//
const createCart = async (req, res) => {
    try{
        const id = await miCarrito.createCart();
        return res.json(`NUEVO CARRITO ASIGNADO CON ID: ${id}`);
    }catch(err){
        return res.status(404).json({
            error: `ERROR ${err}`
        });
    }
};

//AÑADE PRODUCTO//
const addProduct = async (req, res) => {
    try{
        let idCarrito = Number(req.params.idCar);
        let idProducto = req.params.idProd;
        let todoElCarrito = await miCarrito.getAll();

        const indexCarrito = todoElCarrito.findIndex(carrito => carrito.id === idCarrito);
        if(indexCarrito < 0){
            return res.status(401).json({
                error: "ERROR: CARRITO NO ENCONTRADO"
            });
        };

        let carrito = await miCarrito.getCartById(idCarrito);
        if(carrito.length == 0){
            return res.status(404).json({
                error: `ERROR: NO SE ENCONTRO EL CARRITO`
            });
        };

        let productoSegunId = await misProductos.getById(idProducto);
        if(productoSegunId.length == 0){
            return res.status(404).json({
                error: `ERROR: PRODUCTO NO ENCONTRADO`
            });
        };

        todoElCarrito[indexCarrito].productos.push(productoSegunId[0]);
        await miCarrito.write(todoElCarrito, `PRODUCTO AGREGADO AL CARRITO CON EXITO`);
        return res.json(`SE AGREGO EL PRODUCTO CON ID ${idProducto} AL CARRITO CON SU ID ${idCarrito}`);

    }catch(err){
        return res.status(404).json({
            error: `ERROR ${err}`
        });
    }
};

//BORRA UN ELEMENTO DEL CARRITO POR ID//
const deleteCartById = async (req, res) => {
    try{
        const idCarrito = Number(req.params.id);
        await miCarrito.deleteCartById(idCarrito);
        return res.json(`SE ELIMINO CON EXITO EL CARRITO CON SU ID:${idCarrito}`);
    }catch(err){
        return res.status(404).json({
            error: `ERROR ${err}`
        });
    }
};

//BORRA UN PRODUCTO POR ID//
const deleteProductById = async (req, res) => {
    try{
        const idCarrito = Number(req.params.id);
        const idProducto = Number(req.params.id_prod);

        await miCarrito.deleteProductById(idCarrito, idProducto);
        return res.json(`EL PRODUCTO CON ID: ${idProducto} DEL CARRITO CON ID ${idCarrito} FUE ELIMINADO CON EXITO!`);
    }catch(err){
        return res.status(404).json({
            error: `ERROR ${err}`
        });
    }
};

module.exports = {getAllProductsByIdCart, createCart, addProduct, deleteCartById, deleteProductById};