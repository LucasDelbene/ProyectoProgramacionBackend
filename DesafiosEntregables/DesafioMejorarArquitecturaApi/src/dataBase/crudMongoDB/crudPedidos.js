//CRUD DE PEDIDOS//

export default class Contenedor{
    constructor(mongoDB, productoModel, usuarioModel, pedidoModel){
        this.mongoDB = mongoDB;
        this.productoModel = productoModel;
        this.usuarioModel = usuarioModel,
        this.pedidoModel = pedidoModel
    }

    //CREAR PEDIDO//
    async crearPedido(idDueño){
        let documentoUsuario = false;
        let productosPedido = [];
        documentoUsuario = await this.usuarioModel.findOne({_id: idDueño}, {__v: 0});

        if(documentoUsuario){
            productosPedido = documentoUsuario.carrito;
            documentoUsuario.carrito = [];

            let date = new Date();
            let nuevoPedido = {
                timestamp: date,
                productos: productosPedido,
                idDueño: idDueño
            };
            await documentoUsuario.save();

            const pedido = new this.pedidoModel(nuevoPedido);

            this.mongoDB
                .then(_ => pedido.save())
                .then(document => console.log(document))
                .catch(error => console.log(`ERROR: ${error.message}`));

            return pedido;
        }else{
            throw Error('ERROR AL ACCEDER AL USUARIO');
        }

    }

}
