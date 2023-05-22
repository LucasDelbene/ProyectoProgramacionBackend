//CRUD DE ORDENES//

class Contenedor{
    constructor(mongoDB, productsModel, userModel, ordenModel){
        this.mongoDB = mongoDB;
        this.productsModel = productsModel;
        this.userModel = userModel,
        this.ordenModel = ordenModel
    }

    //FUNCION PARA CREAR ORDEN//
    async createOrden(idDueño){
        let docUser = false;
        let productosOrden = [];
        docUser = await this.userModel.findOne({_id: idDueño}, {__v: 0});

        if(docUser){
            productosOrden = docUser.carrito;
            docUser.carrito = [];

            let date = new Date();
            let nuevaOrden = {
                timestamp: date,
                products: productosOrden,
                idDueño: idDueño
            };
            await docUser.save();

            const orden = new this.ordenModel(nuevaOrden);
            this.mongoDB
                .then(_ => orden.save())
                .then(document => console.log(document))
                .catch(error => console.log(`ERROR: ${error.message}`));
            return orden;
        }else{
            throw Error(`ERROR AL CREAR ORDEN`);
        }

    }
}
export default Contenedor;