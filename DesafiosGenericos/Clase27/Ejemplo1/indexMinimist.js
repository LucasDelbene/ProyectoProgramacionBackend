//EJEMPLO 1 (CLASE 27)//

//IMPORTO minimist PARA PODER UTILIZARLO//
import minimist from 'minimist';

//USO EL METODO slice() SOBRE EL ARRAY DE ARGUMENTOS DEL OBJETO GLOBAL process:argv. EN ESTE CASO, EL METODO ELIMINA TODOS LOS ELEMENTOS DEL ARRAY ANTERIORES A PARTIR DEL INDICE QUE SE LE PASA COMO PARAMETRO. COMO SABEMOS QUE LOS ARGUMENTOS QUE PASAMOS MANUALMENTE SE ALMACENAN A PARTIR DEL SEGUNDO INDICE, PASAMOS COMO ARGUMENTO UN 2//
const argumentos = minimist(process.argv.slice(2));
console.log(argumentos);

//AL EJECUTAR (node indexMinimist Lucas 20 Delbene 23) EN LA TERMINAL, MINIMIST LOS PROCESA, LOS GUARDA EN UN OBJETO y GUARDA EN UNA PROPIEDAD GUION BAJO (_) TODOS LOS ARGUMENTOS QUE YO TENGA SUELTOS//
{ _: [ 'Lucas', 20, 'Delbene', 23 ] } //RESULTADO QUE SE MUESTRA EN LA CONSOLA EL EJECUTARLO

//EN EL CASO QUE YO LO EJECUTE CON UN -D (node indexMinimist Lucas 20 Delbene 23 -D) EL OBJETO FINAL CAMBIA, ES DECIR AL OBJETO EN PARTICULAR LE TOMO LA -D COMO SI FUERA UNA PROPIEDAD NUEVA, QUE ES LA FLAG y ES COMO (D: true)//
{ _: [ 'Lucas', 20, 'Delbene', 23 ] /*, D: true*/} //RESULTADO QUE SE MUESTRA EN LA CONSOLA EL EJECUTARLO

//ASI SE VE CUANDO MANDO EMAIL CON UN GUION (node indexMinimits Lucas 20 Delbene 23 -email lucasdelbene@gmail.com)//
{_: [ 'Lucas', 20, 'Delbene', 23 ]/*, e: true,m: true,a: true,i: true,l: 'lucasdelbene@gmail.com'*/} //RESULTADO QUE SE MUESTRA EN LA CONSOLA EL EJECUTARLO

//ASI SE VE CUANDO MANDO EMAIL CON DOBLE GUION (node indexMinimits Lucas 20 Delbene 23 --email lucasdelbene@gmail.com)//
{ _: [ 'Lucas', 20, 'Delbene', 23 ] /*, email: 'lucasdelbene@gmail.com'*/} //RESULTADO QUE SE MUESTRA EN LA CONSOLA EL EJECUTARLO


//BASICAMENTE, minimist NOS PERMITE ANALIZAR UN ARRAY DE STRINGS (USUALMENTE OBTENIDO DE LOS ARGUMENTOS INGRSADOS POR LINA DE COMANDOS) y LO TRANSFORMARA EN UN OBJETO MAS FACIL DE USAR, YA QUE NOS PERMITE ACCEDER A LOS ELEMENTOS MEDIANTE SU NOMBRE// 