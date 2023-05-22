//CRUD DE PRODUCTOS//

class Contenedor{
    constructor(mongoDB, productsModel) {
        this.mongoDB = mongoDB;
        this.productsModel = productsModel;
    }

    //FUNCION PARA GUARDAR PRODUCTO//
    async save(product){
        product = new this.productsModel(product);

        this.mongoDB
            .then(_ => product.save())
            .then(document => document)
            .catch(error => console.log(`ERROR: ${error.message}`));
    }

    //FUNCION PARA OBTENER TODOS LOS PRODUCTOS//
    async getAll(){
        try{
            let docs = false;
            docs = await this.productsModel.find();
            if(docs){
                return docs;
            }else{
                return false;
            }
        }catch(error){
            throw Error(`ERROR AL OBTENER TODOS LOS PRODUCTOS`);
        }
    }

    //FUNCION PARA OBTENER PRODUCTO POR ID//
    async getById(idProduct){
        try{
            let doc = false;
            doc = await this.productsModel.findOne({_id: idProduct}, {__v: 0});

            if(doc){
                return doc;
            }else{
                return false;
            }
        }catch(error){
            throw Error(`ERROR AL OBTENER PRODUCTO POR ID`);
        }
    }

    //FUNCION PARA BORRAR PRODUCTO POR ID//
    async deleteById(idProduct){
        this.mongoDB
            .then(_ => this.productsModel.deleteOne({
                _id: idProduct
            }))
            .catch(error => console.log(`ERROR: ${error.message}`))
    }

    //FUNCION PARA ACTUALIZAR PRODUCTO POR ID//
    async updateById(idProduct, name, price, url, description, date, code, stock){

        this.mongoDB
            .then(_ => this.productsModel.findOne({_id: idProduct}, {__v: 0}))
            .then(product =>{
                product.nombre = name;
                product.precio = price;
                product.url = url;
                product.descripcion = description;
                product.date = date;
                product.codigo = code;
                product.stock = stock;

                return product.save();
            })
            .catch(error => console.log(`ERROR: ${error.message}`))
    }
}
export default Contenedor;