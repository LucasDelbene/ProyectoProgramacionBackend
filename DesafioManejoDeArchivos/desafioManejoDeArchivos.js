//DESAFIO MANEJO DE ARCHIVOS EN JAVASCRIPT - PROGRAMACION BACKEND//

const fs = require("fs");

const pathToFile = "./DesafioManejoDeArchivos/productos.txt";

class Contenedor{
   

    //HICE UN METODO "writeFile" PARA AHORRAR UN POCO MAS DE CODIGO//
    writeFile = async data =>{
        try{
            await fs.promises.writeFile(
                pathToFile, JSON.stringify(data, null, 2)
            )
        }catch (error){
            console.log(`ERROR: ${error}`);
        }
    }

    //RECIBE UN OBJETO, LO GUARDA EN EL ARCHIVO Y DEVUELVE EL ID ASIGNADO//
    save = async objeto =>{
        let productos = this.getAll();

        try{
            //SI NO HAY PRODUCTO EN ARRAY, EL ID VA A SER 1 y SI HAY PRODUCTO EN ARRAY, EL NUEVO ID SERIA UNO MAS QUE EL ULTIMO ID//
            let nuevoId;
            productos.length === 0 ? nuevoId = 1 : nuevoId = productos[productos.length-1].id + 1;

            //DECLARO EL NUEVO OBJETO ASIGNANDO EL NUEVO ID y UTILIZO "writeFile" y "push" PARA PUSHEAR LOS PRODUCTOS//
            let nuevoObjeto = {...objeto, id: nuevoId};
            productos.push(nuevoObjeto);
            await this.writeFile(productos);
            return nuevoObjeto.id;
            
        }catch (error){
            console.log(`ERROR: ${error}`); 
        }
    }

    //RECIBE UN ID Y DEVUELVE EL OBJETO CON ESE ID//
    getById = async id =>{
        let productos = await this.getAll();
        try{
            //ACA SE BUSCA EL QUE TENGA EL MISMO ID y EN CASO DE NO ENCONTRARLO DEVUELVE NULL//
            const objeto = productos.find(id => productos.id === id);
            return objeto ? objeto : null;
        }catch (error){
            console.log(`ERROR: ${error}`);
        }
    }

    //DEVUELVO UN ARRAY CON LOS OBJETOS PRESENTES EN EL ARCHIVO//
    getAll = async() =>{
        try{
            //CREO UNA VARIABLE, LE ASIGNO "readFile" PARA QUE LEA CON "this.file" EL ARCHIVO y DEVUELVE "JSON.parse" DE LOS PRODUCTOS//
            const productos = await fs.promises.readFile(pathToFile, "utf-8");
            return JSON.parse(productos);
        }catch (error){
            if(error.message.includes("ERROR")) return [];
            console.log(`ERROR: ${error}`);
        }
    }

    //ELIMINA DEL ARCHIVO EL OBJETO CON EL ID BUSCADO//
    deleteById = async id =>{
        let productos = await this.getAll();
        try{
            //CON "filter" FILTRO Y SACO EL ID DESIGNADO y DEVUELVE EL NUEVO ARRAY SIN ESE PRODUCTO//
            productos = productos.filter(producto => producto.id != id);
            await this.writeFile(productos);  
        }catch (error){
            console.log(`ERROR: ${error}`);
        }
    }

    //ELIMINA TODOS LOS OBJETOS PRESENTES EN EL ARCHIVO//
    deleteAll = async() =>{
        this.writeFile([]);
    }
}

module.exports = Contenedor;
