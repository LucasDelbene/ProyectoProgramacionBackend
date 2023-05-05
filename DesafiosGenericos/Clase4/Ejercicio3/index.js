//DESAFIO GENERICO - LECTURA y ESCRITURA DE ARCHIVOS//

//PRIMERO INICIE UN PROYECTO CON npm init -y LA CUAL ME GENERO UN ARCHIVO LLAMADO package.json//

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
    leer(){
        try{
            //UTILIZO fs.readFile PARA PODER LEER EL ARCHIVO package.json//
            let archivo = fs.readFile(this.url, 'utf-8', (error, contenido)=>{
                if(error){
                    
                }else{
                    this.archivo = JSON.parse(contenido);
                    
                    //DECLARO UN OBJETO CON LOS SIGUIENTES FORMATOS Y DATOS//
                    const info = {
                        contenidoString: contenido,
                        contenidoObjeto: this.archivo
                    }

                    //GUARDO EL OBJETO INFO UTILIZANDO fs.writeFile, EN UN ARCHIVO LLAMADO info.txt DENTRO DE LA MISMA CARPETA DE package.json//
                    fs.writeFile('./info.txt', JSON.stringify(info, null, 2), (error, contenido)=>{});

                    //MUESTRO POR CONSOLA EL OBJETO INFO LUEGO DE LEER EL ARCHIVO//
                    console.log(info);
                }
            });
        }catch(error){
            throw new Error(error);
        }
    }
}

//LEO EL ARCHIVO package.json INVOCANDO LA FUNCION leer()//
let objetoUno = new ManejadorArchivos('./package.json');
let archivo =  objetoUno.leer();
console.log(objetoUno.archivo); 