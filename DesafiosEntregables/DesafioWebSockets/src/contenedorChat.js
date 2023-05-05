//REQUIERO fs (File System) PARA PODER UTILIZARLO//
const fs = require('fs');

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    //LEER ARCHIVO//
    async read(){
        try{
            let data = await fs.promises.readFile(`./${this.archivo}`, `utf-8`);
            return data
        }catch(error){
            throw Error(`Error al leer el archivo ${error}`);
        }
    }

    //ESCRIBIR ARCHIVO//
    async write(datos, mensaje){
        try{
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(datos, null, 2));
            console.log(mensaje);
        }catch(error){
            throw Error(`Error al escribir el archivo ${error}`);
        }
    }

    //GUARDAR MENSAJE//
    async save(mensaje){
        console.table(mensaje);
        let nuevoMensaje = {};

        let data = await this.read();
        let datos = JSON.parse(data);

        if(!data){
            nuevoMensaje = [mensaje];
        }else{
            nuevoMensaje = mensaje;
        }
        datos.push(nuevoMensaje);

        await this.write(datos, 'Agregado con Exito');
    }

    //TRAER SEGUN ID//
    async getById(myId){
        let data = await this.read();
        let datos = JSON.parse(data);

        let resultado = datos.filter(producto => producto.id == myId);
        return resultado;
    }

    //TRAER TODO//
    async getAll(){
        let data = await this.read();
        let datos = JSON.parse(data);

        return datos;
    }
    
    //BORRAR PRODUCTO SEGUN ID//
    async deleteById(myId){
        let data = await this.read();
        let datos = JSON.parse(data);

        let producto = datos.find(producto => producto.id == myId);
        if(producto){
            let index = datos.indexOf(producto);
            datos.splice(index, 1);
            await this.write(datos, `Producto con ID: ${myId} eliminado`)
        }else{
            console.log(`Producto con ID: ${myId} no existe`);
        }
    }

    //BORRAR TODOS LOS PRODUCTOS//
    async deleteAll() {
        let data = [];
        await this.write(data, 'Se eliminaron todos los productos');
    }
}
module.exports = Contenedor;