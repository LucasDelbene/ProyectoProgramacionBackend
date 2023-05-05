const getNumero = () => {
    let cantidad = process.env.CANTIDAD_BUCLE;
    if (!cantidad){
        cantidad = 100000000;
    }
    let array = [];
    let data = {};

    //CREO EL ARRAY DE 0 -1000, UTILIZANDO DEL 1 AL 1000//
    for (let i=0; i<=1000; i++){
        array[i] = 0;
    }

    //UTILIZO LAS POSICIONES DEL ARRAY PARA GUARDAR EL CONTEO DEL NUMERO RANDOM QUE APARECE//
    for (let i=0; i<=cantidad; i++) {
        let numeroRandom = Math.floor((Math.random() * (1001 - 1) + 1));
        array[numeroRandom]++;
    }

    //CREO EL OBJETO DE SALIDA CLAVE-VALOR//
    for (let i=0; i<=array.length-1; i++) {
        data[i] = {vecesQueAparece: array[i]}
    }
    
    return(data);
}

const numeroAleatorio = getNumero();
process.send(numeroAleatorio);
