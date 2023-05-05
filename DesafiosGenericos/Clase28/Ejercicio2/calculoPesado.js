//DECLARO CON process.on() QUE SI EN ALGUN MOMENTO LLEGA UN MENSAJE, EMPIECE A EJECUTARSE//
process.on('message', message=>{
    let suma = 0;
    for(let i=0; i<6e9; i++){
        suma+=1
    }
    process.send(suma) //AL SER UN PROCESO COMPLETAMENTE AJENO, PUEDO DEVOLVER LA SUMA COMO SI FUERA UNA FUNCION MAS
})
