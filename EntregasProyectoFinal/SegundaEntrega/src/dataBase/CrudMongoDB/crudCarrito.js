class Contenedor{
    constructor(mongoDB, carritoModelo, productosModelo) {
        this.mongoDB = mongoDB;
        this.carritoModelo = carritoModelo;
        this.productosModelo = productosModelo;
    }

    //CREAR CARRITO//
    async createCart() {
        let date = new Date();
        let nuevoCarrito = {
            timestamp: date,
            productos: []
        };

        //CREO LA INSTANCIA DEL MODELO CARRITO//
        const carrito = new this.carritoModelo(nuevoCarrito);

        this.mongoDB
            .then(_ => carrito.save())
            .then(documento => documento._id.toString())
            .catch(err => console.log(`ERROR: ${err.message}`));
    }

    //TRAER PRODUCTO SEGUN ID//
    async getProductsByID(idCarrito) {
        let documentos = false
        documentos = await this.carritoModelo.findOne({ _id: idCarrito }, { __v: 0 });
        if(documentos){
            return documentos.productos;
        }else{
            return false;
        }
    }

    //BORRAR SEGUN ID//
    async deleteCartById(idCarrito) {
        this.mongoDB
            .then(_ => this.carritoModelo.deleteOne({
                _id: idCarrito
            }))
            .then(result => console.log(result))
            .catch(err => console.log(`Error: ${err.message}`))
    }

    //AGREGAR PRODUCTO AL CARRITO//
    async addProduct(idCarrito, idProducto) {
        let documentoCarrito = false;
        let documentoProducto = false

        documentoCarrito = await this.carritoModelo.findOne({ _id: idCarrito }, { __v: 0 });
        documentoProducto = await this.productosModelo.findOne({ _id: idProducto }, { __v: 0 });

        if(documentoCarrito && documentoProducto){

            documentoCarrito.productos.push(documentoProducto);
            return documentoCarrito.save();
        }else{
            throw Error('ERROR AL ACCEDER AL ID DEL CARRITO/PRODUCTO');
        }
    }

    //BORRAR PRODUCTO SEGUN ID//
    async deleteProductById(idCarrito, idProducto){
        let documentoCarrito = false;
        let documentoProducto = false

        documentoCarrito = await this.carritoModelo.findOne({ _id: idCarrito }, { __v: 0 });
        documentoProducto = await this.productosModelo.findOne({ _id: idProducto }, { __v: 0 });

        if(documentoCarrito && documentoProducto){
            let allProductsFromCart = documentoCarrito.productos;
            let productos = [];

            for(let i = 0; i <= allProductsFromCart.length - 1; i++){
                if(allProductsFromCart[i]._id.toString() != documentoProducto._id.toString()){
                    productos.push(allProductsFromCart[i]);
                }
            }
            documentoCarrito.productos = productos;
            return documentoCarrito.save();
        }else{
            throw Error('ERROR AL ACCEDER AL ID DEL CARRITO/PRODUCTO');
        }
    }
}

module.exports = Contenedor;