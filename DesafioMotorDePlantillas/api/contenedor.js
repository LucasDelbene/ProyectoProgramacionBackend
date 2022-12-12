const fs = require("fs");

class Contenedor{
    constructor(ruta){
        this.ruta = ruta
    }

    //DEVUELVE TODOS LOS PRODUCTOS//
    getAll = async() =>{
        try{
            let productos = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(productos)
        }catch(error){
            console.log(error);
        }
    }

    //DEVUELVE UN PRODUCTO SEGUN SU ID//
    getById = async(numero) =>{
        let stock = await this.getAll();
        try{
            let filter = stock.find(elemento => elemento.id == numero)
            return filter;
        }catch(error){
            console.log(error);
        }
    }

    //RECIBE Y AGREGA UN PRODUCTO//
    agrega = async(producto) =>{
        let stock = await this.getAll();
        try{
            if(stock.length === 0){
                producto.id = 0;
                stock.push(producto)
                await fs.promises.writeFile(this.ruta, JSON.stringify(stock,null,3))
            }else{
                producto.id = stock[stock.length-1].id+1
                stock.push(producto)
                await fs.promises.writeFile(this.ruta,JSON.stringify(stock,null,3))
            }
        }catch(error){
            console.log(error);
        }
    }

    //RECIBE Y ACTUALIZA UN PRODUCTO SEGUN SU ID//
    actualiza = async(objeto) =>{
        let producto = await this.getAll();
        producto.map(function(item){
            if(item.id == objeto.id){
                item.title = objeto.title,
                item.price = objeto.price,
                item.thumbnail = objeto.thumbnail
            }
        })
        await fs.promises.writeFile(this.ruta,JSON.stringify(producto,null,3))
        return producto;
    }

    //BORRA PRODUCTO SEGUN SU ID//
    borraId = async(numero) =>{
        let stock = await this.getAll();
        try{
            let filter = stock.filter(producto => producto.id != numero)
            await fs.promises.writeFile(this.ruta, JSON.stringify(filter,null,3))
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = Contenedor;