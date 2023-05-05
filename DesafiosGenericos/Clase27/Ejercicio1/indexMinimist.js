//DESAFIO GENERICO - ARGUMENTOS POR LINEA DE COMANDOS//

//TENGO QUE REALIZAR UNA APLICACION EN JavaScript EJECUTADA ATRAVES DE NodeJS QUE AL EJECUTARSE DE LA SIGUIENTE MANERA (node indexMinimist 1 2 3 -m dev -p 8080 -d), CONSTRUYA y MUESTRE POR PANTALLA EL SIGUIENTE OBJETO {modo:'dev', puerto:'8080', debug:true, otros[1,2,3]}//

//IMPORTO minimist PARA PODER UTILIZARLO//
import minimist from 'minimist';

//USO EL METODO slice() SOBRE EL ARRAY DE ARGUMENTOS DEL OBJETO GLOBAL process:argv. EN ESTE CASO, EL METODO ELIMINA TODOS LOS ELEMENTOS DEL ARRAY ANTERIORES A PARTIR DEL INDICE QUE SE LE PASA COMO PARAMETRO. COMO SABEMOS QUE LOS ARGUMENTOS QUE PASAMOS MANUALMENTE SE ALMACENAN A PARTIR DEL SEGUNDO INDICE, PASAMOS COMO ARGUMENTO UN 2//
const argumentos = minimist(process.argv.slice(2),{
    //SE SUPONE QUE VOY A RECIBIR ARGUMENTOS, ENTONCES LOS PROCESO PASANDOLE OPTIONS COMO SE MUESTRAN A CONTINUACION
    alias: {m:'modo', p:'puerto', d:'debug'}, //CUANDO ME MANDEN m (ME GUSTARIA LLAMARLO 'modo'), p (ME GUSTARIA LLAMARLO 'puerto'), d (ME GUSTARIA LLAMARLO 'debug') 
    default: {m:'prod', p:0, d:false}         //ACA EN default, PUEDO APROVECHAR PARA COLOCAR LOS PARAMETROS QUE YO QUIERA QUE TENGAN, EN EL CASO QUE NO ME LOS HAYAN MANDADO
});

//EJECUTO (node indexMinimist 1 2 3 -m dev -p 8080 -d) y ME MUESTRA POR CONSOLA LO SIGUIENTE//
{_: [ 1, 2, 3 ] /* , m:'dev', modo:'dev', p:8080, puerto:8080, d:true, debug:true */} //AGREGUE ALIAS PARA QUE SEA MAS FACIL ACCEDER A POR EJEMPLO argumentos.modo, argumentos.puerto y argumentos.debug

//CONSTRUYO EL OBJETO DE CONFIGURACION//
const configuracion ={
    modo :argumentos.modo,
    puerto: argumentos.puerto,
    debug: argumentos.debug,
    other: argumentos._ //GUION BAJO
}
console.log(configuracion);

//LUEGO DE CONSTRUIR EL OBJETO DE CONFIGURACION, EJECUTO NUEVAMENTE (node indexMinimist 1 2 3 -m dev -p 8080 -d) y ME MUESTRA LO SIGUIENTE POR CONSOLA//
/*  {modo:'dev', puerto:8080, debug:true, other:[1,2,3]}  */
 
//LUEGO EN EL CASO QUE LO MANDE SIN PARAMETROS (node indexMinimist 1 2 3), DEBIDO A QUE YA TENGO POR default LAS COSAS, SIMPLEMENTE YA MUESTRA LOS VALORES POR DEFECTO EN LA CONSOLA//
/*  {modo:'prod', puerto:0, debug:false, other:[1,2,3]}  */
