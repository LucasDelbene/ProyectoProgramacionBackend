//DESAFIO ENTREGABLE - MANEJO DE ARCHIVOS EN JAVASCRIPT//

//REQUIERO FS (File System) PARA PODER UTILIZARLO//
const fs = require('fs');

//CREO UNA CLASE LLAMADA Contenedor QUE RECIBE EL NOMBRE DEL ARCHIVO CON EL QUE VA A TRABAJAR//
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

    //IMPLEMENTO LOS SIGUIENTES METODOS//
    //CREO EL METODO getAll() LA CUAL DEVUELVE UN ARRAY CON LOS OBJETOS PRESENTES EN EL ARCHIVO//
    getAll = async() =>{
        try{
            const productos = await fs.promises.readFile(this.archivo, 'utf-8');
            return JSON.parse(productos); 
        }catch(error){
            console.log(error);  
        }
    }

    //CREO EL METODO save(Object) LA CUAL RECIBE UN OBJETO, LO GUARDA EN EL ARCHIVO Y DEVUELVE EL ID ASIGNADO//
    save = async objeto =>{
        let productos = this.getAll();

        try{
            let nuevoId;
            //SI NO HAY PRODUCTO EN ARRAY, EL ID VA A SER 1 y SI HAY PRODUCTO EN ARRAY, EL NUEVO ID SERIA UNO MAS QUE EL ULTIMO ID//
            productos.length === 0 ? nuevoId = 1 : nuevoId = productos[productos.length-1].id + 1;
            
            //DECLARO EL NUEVO OBJETO ASIGNANDO EL NUEVO ID y UTILIZO "writeFile" y "push" PARA PUSHEAR LOS PRODUCTOS//
            let nuevoObjeto = {...objeto, id: nuevoId};
            productos.push(nuevoObjeto);
            await this.writeFile(productos);
            return nuevoObjeto.id;
        }catch(error){
            console.log(error);
        }
    }

    //CREO EL METODO getById(Number) LA CUAL RECIBE UN ID Y DEVUELVE EL OBJETO CON ESE ID, O NULL SI NO ESTA//
    getById = async id =>{
        let productos = await this.getAll();

        try{
            const objeto = productos.find(id => productos.id === id);
            return objeto ? objeto : null;
        }catch(error){
            console.log(error);
        }
    }

    //CREO EL METODO deleteById(Number) LA CUAL ELIMINA DEL ARCHIVO EL OBJETO CON EL ID BUSCADO//
    deleteById = async id =>{
        let productos = await this.getAll();

        try{
            productos = productos.filter(producto => producto.id != id);
            await this.writeFile(productos);     
        }catch(error){
            console.log(error);    
        }
    }

    //CREO EL METODO deleteAll() LA CUAL ELIMINA TODOS LOS OBJETOS PRESENTES EN EL ARCHIVO//
    deleteAll = async() =>{
        this.writeFile([]);
    }
}

//PRUEBO EL MODULO CREANDO UN CONTENEDOR DE PRODUCTOS, QUE SE GUARDE EN EL ARCHIVO productos.txt//
const productos = new Contenedor('productos.txt');

//INCLUYO UN LLAMADO DE PRUEBA A CADA METODO Y MUESTRO POR PANTALLA SEGUN CORRESPONDA PARA VERIFICAR EL FUNCIONAMIENTO DEL MODULO//
const test = async () =>{
    let save = await productos.save({                 
        titulo: 'Botines Munich Continental',
        precio: 120,
        imagen: 'https://res.cloudinary.com/proyectofutsal/image/upload/v1665765181/ProyectoReactJs/botinesMunichContinental_wctv7q.jpg'
    });

    let getAll = await productos.getAll();            // getAll() 
    let getById = await productos.getById(5);         // getById()
    let deleteById = await productos.deleteById(2);   // deleteById()
    let deleteAll = await productos.deleteAll();      // deleteAll()

    console.log(save);
    console.log(getAll);
    console.log(getById);
    console.log(deleteById);
    console.log(deleteAll);
};
test();
