//EJEMPLO SOBRE CLUSTER//

//IMPORTO os, cluster y express PARA PODER UTILIZARLOS//
import cluster from 'cluster';
import os from 'os';
import express from 'express';
const app = express();

//A PARTIR DE os IMPLEMENTO LO SIGUIENTE//
const CPUs = os.cpus().length; //BASICAMENTE LE ESTOY INDICANDO AL SISTEMA OPERATIVO QUE ME AYUDE A OBTENER EL NUMERO DE NUCLEOS QUE TENGA EL SERVIDOR EN EL QUE ME ESTOY EJECUTANDO y QUE ME TRAIGA SU LENGTH


//UTILIZANDO CLUSTER//
if(cluster.isPrimary){ //PREGUNTO SI ES EL PROCESO PADRE MEDIANTE EL COMANDO isPrimary
    console.log('----------------------------------------------')
    console.log(`Proceso Padre (Primario) en PID ${process.pid} (Generando Procesos Hijos)`) //MUESTRO POR CONSOLA EL ID DEL PROCESO PADRE
    console.log('----------------------------------------------')

    //REALIZO UN cluster.fork() POR CADA NUCLEO QUE REALMENTE EL SERVIDOR PUEDA APROVECHAR//
    for(let i=0; i<CPUs; i++){
        cluster.fork(); //CUANDO YO SOY EL PROCESO PADRE PUEDO GENERAR UN PROCESO HIJO DE LA SIGUIENTE FORMA UTILIZANDO cluster.fork()
    }
}else{
    console.log(`Proceso Hijo (Worker) en PID ${process.pid}`) //MUESTRO POR CONSOLA EL ID DEL PROCESO HIJO

    //COLOCO LA CONEXION AL SERVIDOR EN EL PROCESO HIJO PORQUE AL COLOCARLO ACA ESTOY INDICANDO QUE YO COMO PROCESO PADRE VOY A MANEJAR A MULTIPLES HIJOS QUE VAN A ESCUCHAR SOBRE EL PUERTO 8080//
    const PUERTO = 8080;
    app.listen(PUERTO,()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));
}

