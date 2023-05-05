//REQUIERO fs (File System) PARA PODER UTILIZARLO//
const fs = require('fs');

class Contenedor{
    constructor(archivo){
        this.archivo = archivo;
    } 

    //CREO EL METODO writeFile() PARA AHORRAR UN POCO MAS DE CODIGO//
    writeFile = async data =>{
        try{
            await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, 2))
        }catch(error){
            console.log(error);    
        }
    }

    //CREO EL METODO getAll() LA CUAL DEVUELVE UN ARRAY CON LOS OBJETOS PRESENTES EN EL ARCHIVO//
    getAll = async() =>{
        try{
            const productos = await fs.promises.readFile(this.archivo, 'utf-8');
            return JSON.parse(productos); 
        }catch(error){
            console.log(error);  
        }
    }

    //CREO EL METODO getProductoRandom() LA CUAL DEVUELVE UN PRODUCTO ELEGIDO AL AZAR ENTRE TODOS LOS PRODUCTOS DISPONIBLES//
    getProductoRandom = async() =>{
        const productos = await this.getAll();
        return this.checkLength(productos) ? productos[Math.floor(Math.random() * productos.length)] : null;
    }

    //CREO EL METODO checkLength() PARA SABER SI EL ARRAY ESTA VACIO O NO//
    checkLength(array){
        if(array.length === 0){
            console.error('EL ARRAY ESTA VACIO')
            return false;
        }
        return true;
    }
}

module.exports = Contenedor;