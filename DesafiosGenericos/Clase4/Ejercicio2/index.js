//DESAFIO GENERICO - FECHA y HORA//

//REQUIERO FS (File System) PARA PODER UTILIZARLO//
let fs = require('fs');

//INCLUYO EL MANEJO DE ERRORES CON try catch//
try{
    let fyh_actual = `${new Date().toLocaleDateString()}`;
    
    //CREO UN NUEVO ARCHIVO CON fs.writeFileSync LLAMADO fyh.txt//
    let archivo = fs.writeFileSync('./fyh.txt', fyh_actual);

    //LEO EL ARCHIVO CON fs.readFileSync Y LO MUESTRA POR CONSOLA//
    let lectura = fs.readFileSync('./fyh.txt', 'utf-8');
    console.log(lectura);
}catch(error){
    console.log(error);
}

