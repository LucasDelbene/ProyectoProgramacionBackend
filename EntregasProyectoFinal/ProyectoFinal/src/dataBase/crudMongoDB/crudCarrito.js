//CRUD DE CARRITO//

class Contenedor{
    constructor(mongoDB, cartModel, productsModel, userModel){
        this.mongoDB = mongoDB;
        this.cartModel = cartModel;
        this.productsModel = productsModel;
        this.userModel = userModel
    }

    //FUNCION PARA CREAR CARRITO//
    async createCart(){
        let date = new Date();
        let newCart = {
            timestamp: date,
            products: [],
        };
        const cart = new this.cartModel(newCart);

        this.mongoDB
            .then(_ => cart.save())
            .then(document => console.log(document))
            .catch(error => console.log(`ERROR AL CREAR CARRITO: ${error.message}`));
    }

    //FUNCION PARA OBTENER PRODUCTOS POR ID//
    async getProductsByID(idCart){
        let docs = false
        docs = await this.cartModel.findOne({_id: idCart}, {__v: 0});
        if(docs){
            return docs.products;
        }else{
            return false;
        }
    }

    //FUNCION PARA BORRAR CARRITO POR ID//
    async deleteCartById(idCart){
        this.mongoDB
            .then(_ => this.cartModel.deleteOne({
                _id: idCart
            }))
            .then(result => console.log(result))
            .catch(error => console.log(`ERROR AL BORRAR CARRITO POR ID: ${error.message}`))
    }

    //FUNCION PARA AGREGAR PRODUCTO//
    async addProduct(idUser,idProduct){
        let docUser = false;
        let docProduct = false;
        let esRepetido = false;
        let newCarrito = [];

        docUser = await this.userModel.findOne({_id: idUser}, {__v: 0});
        docProduct = await this.productsModel.findOne({_id: idProduct}, {__v: 0});

        if(docUser && docProduct){
            if(docUser.carrito.length == 0){
                docProduct.cantidad++;
                newCarrito.push(docProduct);
            }else{
                newCarrito = docUser.carrito;
                newCarrito.forEach(element =>{
                    if (element._id.toString() == docProduct._id.toString()) {
                        element.cantidad += 1;
                        element.precio += docProduct.precio;
                        esRepetido = true;
                    }
                });
                if(!esRepetido){
                    docProduct.cantidad++;
                    newCarrito.push(docProduct)
                }
            }

            docUser.carrito = [];
            await docUser.save();
            docUser.carrito = newCarrito;
            return await docUser.save();
        }else{
            throw Error(`ERROR AL AGREGAR PRODUCTO`);
        }
    }

    //FUNCION PARA BORRAR PRODUCTO POR ID//
    async deleteProductById(idUser, idProduct){
        let docUser = false;
        let docProduct = false;

        docUser = await this.userModel.findOne({_id: idUser}, {__v: 0});
        docProduct = await this.productsModel.findOne({_id: idProduct}, {__v: 0});

        if(docUser && docProduct){
            let allProductsFromCart = docUser.carrito;
            let products = [];

            allProductsFromCart.forEach(element=>{
                if(element._id.toString() != docProduct._id.toString()){
                    products.push(element);
                }
            })

            docUser.carrito = [];
            await docUser.save();
            docUser.carrito = products;
            return await docUser.save();
        }else{
            throw Error(`ERROR AL BORRAR PRODUCTO POR ID`);
        }
    }
}
export default Contenedor;