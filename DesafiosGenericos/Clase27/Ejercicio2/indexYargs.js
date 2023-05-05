//DESAFIO GENERICO - USANDO YARGS//

//TENGO QUE REALIZAR LA OPERACION DEL DESAFIO ANTERIOR, ESTA VEZ USANDO LA DEPENDENCIA yargs EN LUGAR DE minimist//

//IMPORTO yargs PARA PODER UTILIZARLO//
import yargs from 'yargs';

//USO EL METODO slice() SOBRE EL ARRAY DE ARGUMENTOS DEL OBJETO GLOBAL process:argv. EN ESTE CASO, EL METODO ELIMINA TODOS LOS ELEMENTOS DEL ARRAY ANTERIORES A PARTIR DEL INDICE QUE SE LE PASA COMO PARAMETRO. COMO SABEMOS QUE LOS ARGUMENTOS QUE PASAMOS MANUALMENTE SE ALMACENAN A PARTIR DEL SEGUNDO INDICE, PASAMOS COMO ARGUMENTO UN 2//
const instanciaYargs = yargs(process.argv.slice(2))
//A LA INSTANCIA DE yargs LE COLOCO .alias y .default COMO EN EL EJEMPLO 1 DE minimist//
.alias({m:'modo', p:'puerto', d:'debug'})
.default({m:'prod', p:0, d:false}) 
console.log(instanciaYargs.argv); //PARA PODER ACCEDER A LOS ARGUMENTOS, YO NECESITARIA MANDAR A LLAMAR MIS PROPIOS ARGUMENTOS

//EJECUTO (node indexYargs 1 2 3) y ME MUESTRA LO SIGUIENTE POR CONSOLA//
/*  YargsInstance {customScriptName:false, parsed:false, '$0':'indexYargs', argv:[Getter]}  */ 

//DESPUES DE LLAMAR A MIS PROPIOS ARGUMENTOS (instanciaYargs.argv), EJECUTO NUEVAMENTE (node indexYargs 1 2 3) y ME MUESTRA LO SIGUIENTE POR CONSOLA//
{ _: [ 1, 2, 3 ] /* ,'$0':'indexYargs' */} 

//CONSTRUYO EL OBJETO DE CONFIGURACION//
const argumentos = instanciaYargs.argv
const configuracion ={
    modo :argumentos.modo,
    puerto: argumentos.puerto,
    debug: argumentos.debug,
    other: argumentos._ //GUION BAJO
}
console.log(configuracion);

//LUEGO DE CONSTRUIR EL OBJETO DE CONFIGURACION, EJECUTO NUEVAMENTE (node indexYargs 1 2 3 -m dev -p 8080 -d) y ME MUESTRA LO SIGUIENTE POR CONSOLA//
/*  {_: [ 1, 2, 3 ], m:'dev',modo:'dev', p:8080,puerto:8080, d:false,debug:false, '$0':'indexYargs'}  */


//BASICAMENTE, yargs ES OTRO MODULO QUE NOS AYUDARA A ANALIZAR LOS ARGUMENTOS DE LA LINEA DE COMANDOS PASADOS A LOS PROGRAMAS DE NODE. FUNCIONA DE IGUAL MANERA QUE minimist, CON ALGUNAS MODIFICACIONES y EN SU SINTAXIS. SIN EMBARGO, ESTA LIBRERIA POSEE MUCHISIMAS MAS FUNCIONALIDAES//
