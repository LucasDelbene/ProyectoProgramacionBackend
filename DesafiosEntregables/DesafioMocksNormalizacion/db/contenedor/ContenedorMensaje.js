class Contenedor{
    constructor(mongoDB, mensajeModel){
        this.mongoDB = mongoDB;
        this.mensajeModel = mensajeModel;
    }

    //GUARDAR MENSAJE//
    async save(mensaje){
        try{
            //INSTANCIA DEL MODELO MENSAJE//
            const nuevoMensaje = new this.mensajeModel(mensaje);
            console.log('Actualmente me encuentro desde MongoDB');

            this.mongoDB
                .then(_ => nuevoMensaje.save())
                .catch(error => console.log(`ERROR${error.mensaje}`));

        }catch(error){
            throw Error(`ERROR AL GUARDAR EL MENSAJE`);
        }
    }

    //TRAER TODO//
    async getAll(){
        try{
            let documentos = false;
            documentos = await this.mensajeModel.find();
            if(documentos){
                return documentos;
            }else{
                return false;
            }
        }catch(error){
            throw Error(`ERROR AL TRAER TODO`);
        }
    }
}
module.exports = Contenedor;