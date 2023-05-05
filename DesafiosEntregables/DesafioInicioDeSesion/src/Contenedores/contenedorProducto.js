//REQUIERO fs (File System) PARA PODER UTILIZARLO//
const fs = require('fs');

class Contenedor {
    constructor(archivo){
        this.archivo = archivo;
    }

    //LEER ARCHIVO//
    async read(){
        try{
            let data = await fs.promises.readFile(`./${this.archivo}`, `utf-8`);
            return data;

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
            throw Error(`Error al escribir en el archivo ${error}`);
        }
    }

    //GUARDA PRODUCTO//
    async save(producto){
        let nuevoId = 1;
        let nuevoProducto = {};

        let data = await this.read();
        let datos = JSON.parse(data);

        if(!data){
            producto.id = nuevoId;
            nuevoProducto = [producto];
        }else{
            producto.id = datos[datos.length - 1].id + 1;
            nuevoProducto = producto;
        }
        datos.push(nuevoProducto);

        await this.write(datos, 'Producto Agregado con Exito');
        return producto.id;
    }

    //TRAE UN PRODUCTO SEGUN ID//
    async getById(myId){
        let data = await this.read();
        let datos = JSON.parse(data);

        let resultado = datos.filter(producto => producto.id == myId);
        return resultado;
    }

    //TRAE TODOS LOS PRODUCTOS//
    async getAll(){
        let data = await this.read();
        let datos = JSON.parse(data);

        return datos;
    }

    //BORRA UN PRODUCTO SEGUN ID//
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

    //BORRA TODOS LOS PRODUCTOS//
    async deleteAll(){
        let data = [];
        await this.write(data, 'Se eliminaron todos los Productos');
    }
}
module.exports = Contenedor;