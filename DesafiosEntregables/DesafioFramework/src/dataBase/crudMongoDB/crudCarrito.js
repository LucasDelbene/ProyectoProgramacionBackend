//CRUD DE CARRITO//

export default class Contenedor{
    constructor(mongoDB, carritoModel, productoModel, usuarioModel){
        this.mongoDB = mongoDB;
        this.carritoModel = carritoModel;
        this.productoModel = productoModel;
        this.usuarioModel = usuarioModel
    }

    //CREAR CARRITO//
    async crearCarrito(){
        let date = new Date();
        let nuevoCarrito = {
            timestamp: date,
            productos: [],
        };
        const carrito = new this.carritoModel(nuevoCarrito);

        this.mongoDB
            .then(_ => carrito.save())
            .then(document => console.log(document))
            .catch(error => console.log(`ERROR: ${error.message}`));
    }

    //OBTENER PRODUCTOS DEL CARRITO POR ID//
    async obtenerProductosPorId (idCarrito){
        let docs = false
        docs = await this.carritoModel.findOne({_id: idCarrito}, {__v: 0});
        if(docs){
            return docs.productos;
        }else{
            return false;
        }
    }

    //BORRAR CARRITO POR ID//
    async borrarCarritoPorId(idCarrito){
        this.mongoDB
            .then(_ => this.carritoModel.deleteOne({
                _id: idCarrito
            }))
            .then(resultado => console.log(resultado))
            .catch(error => console.log(`ERROR: ${error.message}`))
    }

    //AGREGAR PRODUCTO AL CARRITO//
    async agregarProducto(idUsuario,idProducto){
        let documentoUsuario = false;
        let documentoProducto = false;
        let esRepetido = false;
        let nuevoCarrito = [];

        documentoUsuario = await this.usuarioModel.findOne({_id: idUsuario}, {__v: 0});
        documentoProducto = await this.productoModel.findOne({_id: idProducto}, {__v: 0});

        if (documentoUsuario && documentoProducto){
            if(documentoUsuario.carrito.length == 0){
                documentoProducto.cantidad++;
                nuevoCarrito.push(documentoProducto);
            }else{
                nuevoCarrito = documentoUsuario.carrito;
                nuevoCarrito.forEach(element=>{
                    if (element._id.toString() == documentoProducto._id.toString()){
                        element.cantidad += 1;
                        element.precio += documentoProducto.precio;
                        esRepetido = true;
                    }
                });
                if(!esRepetido){
                    documentoProducto.cantidad++;
                    nuevoCarrito.push(documentoProducto)
                }
            }

            documentoUsuario.carrito = [];
            await documentoUsuario.save();
            documentoUsuario.carrito = nuevoCarrito;
            return await documentoUsuario.save();
        }else{
            throw Error(`ERROR AL ACCEDER AL ID DEL PRODUCTO EN EL CARRITO`);
        }
    }

    //BORRAR PRODUCTO DEL CARRITO POR ID//
    async borrarProductoPorId(idUsuario,idProducto){
        let documentoUsuario = false;
        let documentoProducto = false;

        documentoUsuario = await this.usuarioModel.findOne({_id: idUsuario}, {__v: 0});
        documentoProducto = await this.productoModel.findOne({_id: idProducto}, {__v: 0});

        if(documentoUsuario && documentoProducto){
            let todosLosProductosDelCarrito = documentoUsuario.carrito;
            let productos = [];

            todosLosProductosDelCarrito.forEach(element=>{
                if(element._id.toString() != documentoProducto._id.toString()){
                    productos.push(element);
                }
            })

            documentoUsuario.carrito = [];
            await documentoUsuario.save();
            documentoUsuario.carrito = productos;
            return await documentoUsuario.save();

        }else{
            throw Error('ERROR AL ACCEDER AL ID DEL PRODUCTO EN EL CARRITO');
        }
    }
}
