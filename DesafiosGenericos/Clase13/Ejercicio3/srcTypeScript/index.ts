//DESAFIO GENERICO - OPERACIONES CON TYPESCRIPT//

//IMPORTO TODAS LAS FUNCIONES DE operaciones.ts//
import * as operaciones from './operaciones/operaciones';

//CREO UNA VARIABLE const LLAMADA hola CON TIPO string//
const hola:string = 'HOLA A TODOS';
console.log(hola);

//CREO UNA VARIABLE CON DOS NUMEROS DE TIPO number//
let a:number = 5;
let b:number = 10;

//MUESTRO LOS RESULTADOS DE LAS OPERACIONES POR CONSOLA//
console.log(`EL RESULTADO DE LA SUMA ES ${operaciones.sumar(a,b)}`);                  //SUMA
console.log(`EL RESULTADO DE LA RESTA ES ${operaciones.restar(a,b)}`);                //RESTA
console.log(`EL RESULTADO DE LA MULTIPLICACION ES ${operaciones.multiplicar(a,b)}`);  //MULTIPLICACION
console.log(`EL RESULTADO DE LA DIVISION ES ${operaciones.dividir(a,b)}`);            //DIVISION