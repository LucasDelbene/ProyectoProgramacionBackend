//DESAFIO GENERICO - FUNCIONES y CLOSURES//

//DEFINO FUNCION mostrarLista, MUESTRO SU CONTENIDO y LUEGO INVOCO CON DATOS PARA VERIFICAR SU FUNCIONAMIENTO//
function mostrarLista(datos = []){
    let respuesta = 'Lista Vacia';

    if(datos.length > 0){
        respuesta = datos.join('-');
    }
    return respuesta;
}

let datos = [2,0,2,3];
console.log(mostrarLista(datos));


//DEFINO FUNCION ANONIMA E INVOCO INMEDIATAMENTE, PASANDO UNA LISTA CON 3 NUMEROS COMO ARGUMENTO// 
let funcionAnonima = (function(datos = []){
    let respuesta = 'Lista Vacia';

    if(datos.length > 0){ 
        respuesta = datos.join('-');
    }
    return respuesta;
})([1,0,0])

console.log(funcionAnonima);


//DEFINO FUNCION crearMultiplicador, DEVUELVO FUNCION ANONIMA, CREO DOS FUNCIONES (duplicar, triplicar) Y LAS PRUEBO CON DIFERENTES VALORES//
function crearMultiplicador(numeroUno = 0){
    let numero = numeroUno;

    function multiplicar(numeroDos = 0){
        return numero * numeroDos;
    }
    return{multiplicar}
}

let multiplicador = crearMultiplicador(10);
let duplicar = crearMultiplicador(2);
let triplicar = crearMultiplicador(3);

console.log(duplicar.multiplicar(3));


