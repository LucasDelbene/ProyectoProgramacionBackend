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
            throw Error(`ERROR AL LEER EL ARCHIVO${err}`);
        }
    }

    //ESCRIBE EL ARCHIVO//
    async write(datos, mensaje){
        try{
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(datos, null, 2));
            console.log(mensaje);
        }catch(err){
            throw Error(`ERROR AL ESCRIBIR EL ARCHIVO${err}`);
        }
    }

    //CREA EL CARRITO//
    async createCart() {
        let nuevoCarrito;
        let date = new Date().toDateString();
        let carrito = {
            id: 0,
            timestamp: date,
            productos: []
        };

        let data = await this.read();
        let datos = JSON.parse(data);

        if(datos.length == 0){
            carrito.id = 1;
            nuevoCarrito = carrito;
        }else{
            carrito.id = datos[datos.length - 1].id + 1;
            nuevoCarrito = carrito;
        }
        datos.push(nuevoCarrito);
        await this.write(datos, `PRODUCTO AGREGADO!`);

        return carrito.id;
    }

    //OBTIENE UN PRODUCTO POR ID//
    async getProductsByID(idCarrito) {

        let data = await this.read();
        let datos = JSON.parse(data);

        let resultado = datos.filter(carrito => carrito.id == idCarrito);
        if(resultado.length == 0){
            return [];
        }else{
            return resultado[0].productos;
        }
    }

    //OBTIENE UN ELEMENTO DEL CARRITO POR ID//
    async getCartById(miId) {

        let data = await this.read();
        let datos = JSON.parse(data);
        let resultado = datos.filter(carrito => carrito.id == miId);

        return resultado;
    }

    //DEVUELVE TODO//
    async getAll() {
        let data = await this.read();
        let datos = JSON.parse(data);

        return datos;
    }

    //BORRA UN ELEMENTO DEL CARRITO POR ID//
    async deleteCartById(idCarrito) {
        try {
            let data = await this.read();
            let datos = JSON.parse(data);

            let carrito = datos.find(carrito => carrito.id == idCarrito);
            if(carrito){
                let index = datos.indexOf(carrito);
                datos.splice(index, 1);
                await this.write(datos, `CARRITO CON ID: ${idCarrito} ELIMINADO CON EXITO!`)
            }else{
                throw Error(`EL CARRITO CON ID ${idCarrito} NO EXISTE!`);
            }
        }catch(err){
            throw Error(`ERROR ${err}`);
        }
    }

    //BORRA UN PRODUCTO POR ID//
    async deleteProductById(idCart, idProduct) {
        try {
            let data = await this.read();
            let datos = JSON.parse(data);

            let carrito = datos.find(carrito => carrito.id == idCart);
            let producto = carrito.producto.find(producto => producto.id == idProduct);

            if(carrito && producto){
                let indexProducto = carrito.producto.indexOf(producto);
                carrito.producto.splice(indexProducto, 1);
                await this.write(datos, `EL PRODUCTO CON ID: ${idProduct} DEL CARRITO CON ID ${idCart} FUE ELIMINADO CON EXITO!`);
            }else{
                if(!carrito){
                    throw Error(`ERROR EL CARRITO NO EXISTE`);
                }
                if(!producto){
                    throw Error(`ERROR EL PRODUCTO NO EXISTE`);
                }
            }
        }catch(err){
            throw Error(`ERROR ${err}`);
        }

    }

    //BORRA TODOS LOS PRODUCTOS DEL CARRITO//
    async deleteAll() {
        let data = [];
        await this.write(data, `SE HAN ELIMINADO TODOS LOS PRODUCTOS DEL CARRITO!`);
    }
}

module.exports = Contenedor;