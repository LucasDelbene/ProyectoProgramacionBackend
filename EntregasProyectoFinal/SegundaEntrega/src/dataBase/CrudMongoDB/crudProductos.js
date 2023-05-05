class Contenedor {
    constructor(mongoDB, productosModelo) {
        this.mongoDB = mongoDB;
        this.productosModelo = productosModelo;
    }


    //GUARDAR PRODUCTO//
    async save(producto) {
        //CREO LA INSTANCIA DEL MODELO PRODUCTO//
        producto = new this.productosModelo(producto);

        this.mongoDB
            .then(_ => producto.save())
            .then(documento => documento)
            .catch(error => console.log(`ERROR: ${error.message}`));
    }

    //TRAER TODOS LOS PRODUCTOS//
    async getAll() {
        try{
            let documentos = false;
            documentos = await this.productosModelo.find();

            if(documentos){
                return documentos;
            }else{
                return false;
            }
        }catch(error){
            throw Error(`ERROR`);
        }
    }

    //TRAER PRODUCTO SEGUN ID//
    async getById(idProducto) {
        try{
            let documento = false;
            documento = await this.productosModelo.findOne({ _id: idProducto }, { __v: 0 });

            if(documento){
                return documento;
            }else{
                return false;
            }
        }catch(error){
            throw Error(`ERROR PRODUCTO NO ENCONTRADO`);
        }
    }

    //BORRAR PRODUCTO SEGUN ID//
    async deleteById(idProducto) {
        this.mongoDB
            .then(_ => this.productosModelo.deleteOne({
                _id: idProducto
            }))
            .catch(error => console.log(`ERROR: ${error.message}`))
    }


    //ACTUALIZAR PRODUCTO SEGUN ID//
    async updateById(idProducto, nombre, precio, url, descripcion, date, codigo, stock) {

        this.mongoDB
            .then(_ => this.productosModelo.findOne({ _id: idProducto }, { __v: 0 }))
            .then(producto => {
                producto.nombre = nombre;
                producto.precio = precio;
                producto.url = url;
                producto.descripcion = descripcion;
                producto.date = date;
                producto.codigo = codigo;
                producto.stock = stock;

                return producto.save();
            })
            .catch(error => console.log(`ERROR: ${error.message}`))
    }

}
module.exports = Contenedor;