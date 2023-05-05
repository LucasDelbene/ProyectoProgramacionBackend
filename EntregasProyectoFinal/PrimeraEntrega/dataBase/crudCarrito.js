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

    //ESCRIBIR EL ARCHIVO//
    async write(datos, mensaje){
        try{
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(datos, null, 2));
            console.log(mensaje);
        }catch(error){
            throw Error(`ERROR AL ESCRIBIR EN EL ARCHIVO ${error}`);
        }
    }

    //CREAR CARRITO//
    async createCart(){
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
        await this.write(datos, `PRODUCTO AGREGADO AL CARRITO CON EXITO`);

        return carrito.id;
    }

    //TRAER UN PRODUCTO POR ID//
    async getProductsByID(idCarrito){
        let data = await this.read();
        let datos = JSON.parse(data);

        let resultado = datos.filter(carrito => carrito.id == idCarrito);
        if(resultado.length == 0){
            return [];
        } else {
            return resultado[0].productos;
        }
    }

    //TREA UN PRODUCTO DEL CARRITO POR ID//
    async getCartById(myId){
        let data = await this.read();
        let datos = JSON.parse(data);
        let resultado = datos.filter(carrito => carrito.id == myId);

        return resultado;
    }

    //TRAER TODOS LOS PRODUCTOS DEL CARRITO//
    async getAll(){
        let data = await this.read();
        let datos = JSON.parse(data);

        return datos;
    }

    //BORRAR UN PRODUCTO DEL CARRITO POR ID//
    async deleteCartById(idCarrito){
        try {
            let data = await this.read();
            let datos = JSON.parse(data);

            let carrito = datos.find(carrito => carrito.id == idCarrito);
            if(carrito){
                let index = datos.indexOf(carrito);
                datos.splice(index, 1);
                await this.write(datos, `CARRITO CON ID ${idCarrito} ELIMINADO`)
            }else{
                throw Error(`EL CARRITO CON ID ${idCarrito} NO EXISTE`);
            }
        }catch(error){
            throw Error(`ERROR ${error}`);
        }
    }

    //BORRAR PRODUCTO POR ID//
    async deleteProductById(idCarrito, idProducto){
        try{
            let data = await this.read();
            let datos = JSON.parse(data);

            let carrito = datos.find(carrito => carrito.id == idCarrito);
            let producto = carrito.producto.find(producto => producto.id == idProducto);

            if(carrito && producto){
                let indexProducto = carrito.productos.indexOf(producto);
                carrito.productos.splice(indexProducto, 1);
                await this.write(datos, `PRODUCTO CON ID ${idProducto} DEL CARRITO CON ID ${idCarrito} FUE ELIMINADO`);
            }else{
                if(!carrito){
                    throw Error('EL CARRITO NO EXISTE');
                }
                if(!producto){
                    throw Error('EL PRODUCTO NO EXISTE');
                }
            }
        }catch(error){
            throw Error(`ERROR  ${error}`);
        }

    }

    //BORRAR TODOS LOS PRODUCTOS DEL CARRITO//
    async deleteAll(){
        let data = [];
        await this.write(data, 'SE ELIMINARON TODOS LOS PRODUCTOS');
    }
}
module.exports = Contenedor;