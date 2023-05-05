//EJEMPLO TDD CON UNA FUNCION SUMA//
//PRIMERO HICE QUE LA PRUEBA FALLE, SEGUNDO ESCRIBI EL CODIGO MINIMO, TERCERO HICE QUE LA PRUEBA PASE CON EXITO y CUARTO REFACTORIZE EL CODIGO PARA UNA MEJOR LECTURA//

//DECLARO FUNCION DE SUMA//
const suma = (...numeros) =>{
    //TEST 1//
    if(!numeros.every(numero => typeof numero==="number")) return null;

    //TEST 2//
    if(numeros.length === 0) return 0;
    
    //TEST 3 y TEST 4//
    return numeros.reduce((prev,current) => prev+current);
}

//PRUEBAS TDD//
let testPasados = 0;
let testTotales = 4;

console.log('-------------------------------------------');
console.log('EJECUTO LAS PRUEBAS PARA LA FUNCION DE SUMA');
console.log('-------------------------------------------');

//TEST 1//
console.log('TEST 1 LA FUNCION DEBE DEVOLVER NULL SI ALGUN PARAMETRO NO ES NUMÉRICO');
let resultadoTestUno = suma(1,'b')
if(resultadoTestUno === null){
    testPasados++;
    console.log('TEST 1 PASADO CON EXITO')
}
else console.log(`TEST 1 FALLADO: SE ESPERABA NULL PERO SE RECIBIIO ${resultadoTestUno}`);
console.log('-------------------------------------------');

//TEST 2//
console.log('TEST 2 LA FUNCION DEBE DEVOLVER 0 SI NO LE PASO NINGUN ARGUMENTO');
let resultadoTestDos = suma();
if(resultadoTestDos===0){
    testPasados++;
    console.log('TEST 2 PASADO CON EXITO');   
}
else console.log(`TEST 2 FALLADO: SE ESPERABA 0 PERO SE RECIBIO ${resultadoTestDos}`);
console.log('-------------------------------------------');

//TEST 3//
console.log('TEST 3 LA SUMA DEBE SER CORRECTA');
let resultadoTestTres = suma(4,5);
if(resultadoTestTres===9){
    testPasados++;
    console.log('TEST 3 PASADO CON EXITO');
}
else console.log(`TEST 3 FALLADO: SE ESPERABA 9 PERO SE RECIBIO ${resultadoTestTres}`);
console.log('-------------------------------------------');

//TEST 4//
console.log('TEST 4 LA SUMA DEBE PODER RECIBIR CUALQUIER NUMERO DE ARGUMENTOS');
let resultadoTestCuatro = suma(1,4,2,5,1);
if(resultadoTestCuatro===13){
    testPasados++;
    console.log('TEST 4 PASADO CON EXITO');
}
else console.log(`TEST 4 FALLADO: SE ESPERABA 13 PERO SE RECIBIO ${resultadoTestCuatro}`);
console.log('-------------------------------------------');

//CONTADOR DE TEST TOTALES//
if(testPasados===testTotales) console.log('TODAS LAS PRUEBAS FUERON PASADAS CON EXITO');
else console.log(`PASE ${testPasados} PRUEBAS DE UN TOTAL DE ${testTotales}`);
console.log('-------------------------------------------');