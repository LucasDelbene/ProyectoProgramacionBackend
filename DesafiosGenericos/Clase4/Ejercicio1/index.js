//DESAFIO GENERICO - ASINCRONISMO y CALLBACKS//

//DEFINO UNA FUNCION mostrarLetras() QUE RECIBE UN STRING COMO PARAMETRO Y PERMITE MOSTRAR UNA VEZ POR SEGUNDO CADA UNO DE SUS CARACTERES//
function mostrarLetras(palabra, timer){
    let miFuncion = setInterval(letras, timer);
    let contador = 0;

    function letras(){
        if(contador != palabra.length){
            console.log(palabra.slice(contador, contador + 1));
            contador++;
        }else{
            fin();
            clearInterval(miFuncion);
        }
    }
}

//DEFINO FUNCION fin() EN DONDE LA INVOCO Y LA PASO COMO PARAMETRO//
let fin = () => console.log('EJECUCION FINALIZADA CON EXITO');

//REALIZO TRES LLAMADAS A mostrarLetras() CON UN MENSAJE Y DEMORAS DE 0, 250 y 500 mS VERIFICANDO QUE LOS MENSAJES DE SALIDA SE INTERCALEN//
mostrarLetras('Lucas', 0);
mostrarLetras('Emmanuel', 250);
mostrarLetras('Delbene', 500);
