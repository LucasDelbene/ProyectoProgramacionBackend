//DESAFIO GENERICO - FUNCIONES, PARAMETROS, CALLBACKS//

//DEFINO LAS SIGUIENTES FUNCIONES, LA CUAL RECIBIRAN DOS VALORES Y DEVOLVERAN EL RESULTADO//
const suma = (a,b) => a + b;
const resta = (a,b) => a - b;
const multiplicacion = (a,b) => a * b;
const division = (a,b) => a / b;
const modulo = (a,b) => a % b;

//DEFINO UNA FUNCION LLAMADA operacion QUE RECIBE COMO PARAMETRO DOS VALORES Y UNA FUNCION CON LA OPERACION QUE VA A REALIZAR//
function operacion(a,b,op){
    return op(a,b);
}

//MUESTRO LOS RESULTADOS POR CONSOLA//
console.log(operacion(10,10,suma));             //SUMA
console.log(operacion(10,10,resta));            //RESTA
console.log(operacion(10,10,multiplicacion));   //MULTIPLICACION
console.log(operacion(10,10,division));         //DIVISION
console.log(operacion(10,10,modulo));           //MODULO

