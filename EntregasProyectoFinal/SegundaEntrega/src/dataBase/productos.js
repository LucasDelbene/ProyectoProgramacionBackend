//REQUIERO fs (File System) PARA PODER UTILIZARLO//
const fs = require('fs');

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    } 

    //LEE EL ARCHIVO//
    async read() {
        try{
            let data = await fs.promises.readFile(`./${this.archivo}`, `utf-8`);
            return data;

        }catch(err){
            throw Error(`ERROR AL LEER EL ARCHIVO ${err}`);
        }
    }

    //ESCRIBE EL ARCHIVO//
    async write(datos, mensaje){
        try{
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(datos, null, 2));
            console.log(mensaje);
        }catch(err){
            throw Error(`ERROR AL ESCRIBIR EL ARCHIVO ${err}`);
        }
    }

    //GUARDA PRODUCTO//
    async save(producto) {
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
        await this.write(datos, `PRODUCTO AGREGADO CON EXITO!`);

        return producto.id;
    }

    //OBTIENE PRODUCTO SEGUN ID//
    async getById(miId) {
        let data = await this.read();
        let datos = JSON.parse(data);

        let resultado = datos.filter(producto => producto.id == miId);
        return resultado;
    }

    //OBTIENE TODOS LOS PRODUCTOS//
    async getAll() {
        let data = await this.read();
        let datos = JSON.parse(data);

        return datos;
    }

    //BORRA PRODUCTO SEGUN ID//
    async deleteById(idProducto) {
        let data = await this.read();
        let datos = JSON.parse(data);

        let producto = datos.find(producto => producto.id == idProducto);
        console.log(producto);

        if(producto) {
            let index = datos.indexOf(producto);
            console.log(index);
            datos.splice(index, 1);
            await this.write(datos, `PRODUCTO CON ID: ${idProducto} ELIMINADO CON EXITO!`)
        }else{
            throw Error(`EL PRODUCTO CON ID: ${idProducto} NO EXISTE!`);
        }
    }

    //BORRA TODOS LOS PRODUCTOS//
    async deleteAll() {
        let data = [];
        await this.write(data, `TODOS LOS PRODUCTOS FUERON ELIMINADOS CON EXITO!`);
    }
}

module.exports = Contenedor;