//DESAFIO GENERICO - LECTURA y ESCRITURA CON PROMISES//

//REQUIERO FS (File System) PARA PODER UTILIZARLO//
let fs = require('fs');
let moment = require('moment');

class ManejadorArchivos{
    constructor(url){
        this.url = url;
        this.fecha = moment().format('L');
        this.archivo = null;
    }
    
    //CREO LA FUNCION leer() PARA PODER LEER EL ARCHIVO package.json, UTILIZANDO EL MANEJO DE ERRORES try catch//
    async leer(){
        try{
            return await fs.promises.readFile(this.url, 'utf-8');           
        }catch(error){
            console.log(error);
            throw new Error(error);   
        }
    }

    async escribir(url, contenido){
        try{
            await fs.promises.writeFile(url, contenido, 'utf-8'); 
        }catch(error){
            console.log(error);
        }
    }

    async init(){
        try{
            let archivo = await this.leer();
            let archivoObjeto = JSON.parse(archivo);             //LO DESERIALIZO EN UN OBJETO LLAMADO INFO 
            console.log(archivoObjeto);                          //MUESTRO ESTE OBJETO INFO EN LA CONSOLA
            archivoObjeto.contenidoObjeto.author = 'CoderHouse'  //MODIFICO EL AUTHOR A CoderHouse

            //GUARDO EL OBJETO SERIALIZADO EN OTRO ARCHIVO LLAMADO package.json.coder//
            await this.escribir('./package.json.coder', JSON.stringify(archivoObjeto, null, 2));
        }catch(error){
            console.log(error);
        }
    }
}

//LEO EL ARCHIVO info.txt GENERADO EN EL EJERCICIO ANTERIOR//
let objetoUno = new ManejadorArchivos('./info.txt');
objetoUno.init();
