//CRUD DE PRODUCTOS//

export default class Contenedor{
    constructor(mongoDB, productoModel){
        this.mongoDB = mongoDB;
        this.productoModel = productoModel;
    }

    //GUARDAR PRODUCTO//
    async save(producto){
        producto = new this.productoModel(producto);

        this.mongoDB
            .then(_ => producto.save())
            .then(document => document)
            .catch(error => console.log(`ERROR: ${error.message}`));
    }

    //OBTENER TODOS LOS PRODUCTOS//
    async getAll(){
        try{
            let docs = false;
            docs = await this.productoModel.find();
            if(docs){
                return docs;
            }else{
                return false;
            }
        }catch(error){
            throw Error(`ERROR AL OBTENER TODOS LOS PRODUCTOS`);
        }
    }

    //OBTENER PRODUCTO POR ID//
    async getById(idProducto){
        try{
            let doc = false;
            doc = await this.productoModel.findOne({_id: idProducto}, {__v: 0});

            if(doc){
                return doc;
            }else{
                return false;
            }
        }catch(error){
            throw Error(`ERROR PRODUCTO NO ENCONTRADO`);
        }
    }

    //BORRAR PRODUCTO POR ID//
    async deleteById(idProducto){
        this.mongoDB
            .then(_ => this.productoModel.deleteOne({
                _id: idProducto
            }))
            .catch(error => console.log(`ERROR: ${error.message}`))
    }

    //ACTUALIZAR PRODUCTO POR ID//
    async updateById(idProducto, name, price, url, description, date, code, stock){

        this.mongoDB
            .then(_ => this.productoModel.findOne({_id: idProducto}, {__v: 0}))
            .then(producto =>{
                producto.nombre = name;
                producto.precio = price;
                producto.url = url;
                producto.descripcion = description;
                producto.date = date;
                producto.codigo = code;
                producto.stock = stock;

                return producto.save();
            })
            .catch(error => console.log(`ERROR: ${error.message}`))
    }
}
