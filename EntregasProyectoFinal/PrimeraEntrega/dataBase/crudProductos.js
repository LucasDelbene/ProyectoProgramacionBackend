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
            return data;

        }catch(error){
            throw Error(`ERROR AL LEER EL ARCHIVO ${error}`);
        }
    }

    //ESCRIBIR ARCHIVO//
    async write(datos, mensaje){
        try{
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(datos, null, 2));
            console.log(mensaje);
        }catch(error){
            throw Error(`ERROR AL ESCRIBIR EN EL ARCHIVO ${error}`);
        }
    }

    //GUARDAR PRODUCTO//
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
        await this.write(datos, 'PRODUCTO AGREGADO CON EXITO');

        return producto.id;
    }

    //TREAR PRODUCTO POR ID//
    async getById(myId){
        let data = await this.read();
        let datos = JSON.parse(data);

        let resultado = datos.filter(producto => producto.id == myId);
        return resultado;
    }

    //TRAER TODOS LOS PRODUCTOS//
    async getAll(){
        let data = await this.read();
        let datos = JSON.parse(data);

        return datos;
    }

    //BORRAR PRODUCTO POR ID//
    async deleteById(idProducto){
        let data = await this.read();
        let datos = JSON.parse(data);

        let producto = datos.find(producto => producto.id == idProducto);
        console.log(producto);

        if(producto){
            let index = datos.indexOf(producto);
            console.log(index);
            datos.splice(index, 1);
            await this.write(datos, `PRODUCTO CON ID ${idProducto} ELIMINADO`)
        }else{
            throw Error(`PRODUCTO CON ID ${idProducto} NO EXISTE`);
        }
    }

    //BORRAR TODOS LOS PRODUCTOS//
    async deleteAll() {
        let data = [];
        await this.write(data, 'SE ELIMINARON TODOS LOS PRODUCTOS');
    }
}
module.exports = Contenedor;

