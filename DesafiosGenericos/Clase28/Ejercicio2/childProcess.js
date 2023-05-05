//DESAFIO GENERICO - CHILD_PROCESS CON FORK//
//COMO EJECUTAR UN NUEVO PROGRAMA HIJO DESDE MI PROGRAMA PRINCIPAL CON CHILD PROCESS//

//IMPORTO EL METODO exec DESDE child_process LA CUAL YA ES NATIVO DE NODE//
import {exec} from 'child_process'; //NOS VA A PERMITIR QUE A PARTIR DE UN COMANDO YO PUEDA MANDAR A LLAMAR OTRO PROCESO

//CONSOLOGUEO UN MENSAJE CON EL process.pid//
console.log('--------------------------------------');
console.log(`PROCESO PADRE CON PID ${process.pid}`);

//MANDO A LLAMAR exec() y CON EL VOY A PODER MANDAR UN COMANDO DESDE MI PROGRAMA INTERNO PARA QUE ME EJECUTE EL codigoEjercicioAnterior.js//
exec('node ./codigoEjercicioAnterior.js',(error,stdout)=>{
    if(error) return console.log(`ERROR AL EJECUTAR ${error}`); //SI HAY ERROR, RETORNO UN MENSAJE DE ERROR
    
    console.log('--------------------------------------');
    console.log(`RESPUESTA DEL OTRO PROGRAMA ${stdout}`);      //SI NO HAY ERROR, CONSOLOGUEO UN MENSAJE CON stdout
})

