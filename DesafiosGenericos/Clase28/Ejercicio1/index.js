//DESAFIO GENERICO - USO DEL OBJETO PROCESS//

/*
1) REALIZAR UNA APLICACION EN Node.js QUE PERMITA RECIBIR COMO PARAMETROS UNA CANTIDAD ILIMITADA DE NUMEROS, CON LOS CUALES DEBE CONFECCIONAR CON EL OBJETO DADO DE DATOS y MOSTRARLO POR CONSOLA.
2) EN EL CASO DE INGRESAR UN NUMERO NO VALIDO, SE CREARA UN OBJETO DE ERROR CON UN FORMATO DADO RESPECTIVAMENTE. EN ESTE CASO DE ERROR, LA APLICACION SALDRA CON CODIGO DE ERROR -5.
3) SI NO INGRESO NINGUN NUMERO, EL OBJETO DE ERROR SERA error:{descripcion:'entrada vacia'} y SALDRA CON CODIGO DE ERROR -4.
*/

//IMPORTO minimist PARA PODER UTILIZARLO//
import minimist from 'minimist';

//COLOCO UN LISTENER, LA CUAL SIEMPRE TIENE QUE ESTAR PRIMERO ARRIBA, PARA QUE ESTE ALCANZE A ESCUCHAR EL ERROR//
process.on('uncaughtException',error=>{
    console.log(error.stack);   //STACK DEL ERROR (SE UTILIZA PARA DAR UN SEGUIMIENTO COMPLETO DEL ERROR y HACER UN RASTREO DESDE DONDE HASTA DONDE SE GENERO EL ERROR)
    console.log(error.message); //MENSAJE DEL ERROR
    console.log(error.code);    //CODIGO DEL ERROR
})

//RECIBO LOS ARGUMENTOS ILIMITADOS//
const argumentos = minimist(process.argv.slice(2))._; //USO EL METODO slice() SOBRE EL ARRAY DE ARGUMENTOS DEL OBJETO GLOBAL process:argv. EN ESTE CASO, EL METODO ELIMINA TODOS LOS ELEMENTOS DEL ARRAY ANTERIORES A PARTIR DEL INDICE QUE SE LE PASA COMO PARAMETRO. COMO SABEMOS QUE LOS ARGUMENTOS QUE PASAMOS MANUALMENTE SE ALMACENAN A PARTIR DEL SEGUNDO INDICE, PASAMOS COMO ARGUMENTO UN 2
console.log(argumentos);

//VALIDO SI SE INGRESARON LOS ARGUMENTOS O NO//
if(argumentos.length===0){
    const error = new Error('ENTRADA VACIA (NO SE INGRESARON PRODUCTOS)'); //UNA DE LAS MANERAS CORRECTAS PARA TRABAJAR CON ERRORES, ES TENER UN MANEJO PROPIO DE ERROR
    error.code = -4;                                                       //LA APLICACION SALDRA CON CODIGO DE ERROR -4
    throw error;
}

//RECORRO ARGUMENTO POR ARGUMENTO y EN EL CASO QUE EL ARGUMENTO NO SEA DE TIPO NUMERICO, PREPARO EL ERROR//
argumentos.forEach(argumento=>{
    if(typeof argumento !== 'number'){
        const error = new Error('ERROR DE TIPO (NO ES NUMERICO)')  //MENSAJE DE ERROR
        error.code = -5;                                           //LA APLICACION SALDRA CON CODIGO DE ERROR -5
        const tiposDeArgumentos = argumentos.map(argumento=>typeof argumento); //NECESITO TENER UN ARREGLO CON LOS TIPOS DE ENTRADA y CON EL METODO .map() ME DEVUELVE SOLAMENTE SU TIPO

        //CREO EL OBJETO DE ERROR//
        error.stack={
            descripcion: 'TIPO DE ARGUMENTO INVALIDO', //DESCRIPCION DEL ERROR
            argumentos,                                //ARGUMENTOS QUE ME MANDARON 
            tipos:tiposDeArgumentos                    //TIPOS DE ARGUMENTOS QUE ME MANDARON
        }
        throw error;
    }
})

//CONFECCIONO EL OBJETO DE DATOS//
let suma = argumentos.reduce((prev,current)=> prev + current);
const objeto={
    numeros: argumentos,              //NUMEROS INGRESADOS
    promedio: suma/argumentos.length, //PROMEDIO DE NUMEROS
    maximo: Math.max(...argumentos),  //NUMERO MAXIMO
    minimo: Math.min(...argumentos),  //NUMERO MINIMO
    ejecutable: process.title,        //NOMBRE DEL EJECUTABLE
    pid: process.pid                  //ID DEL PROCESO
}
console.log(objeto);

