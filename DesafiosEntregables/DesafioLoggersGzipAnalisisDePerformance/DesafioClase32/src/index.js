//DESAFIO ENTREGABLE - DESAFIO LOGGERS, GZIP y ANALISIS DE PERFORMANCE//

//PRIMERO TENGO QUE INCORPORAR AL PROYECTO DE SERVIDOR DE TRABAJO LA COMPRESION GZIP//

//IMPORTO winston, express-compression y express PARA PODER UTILIZARLOS//
import winston from 'winston';
import compression from 'express-compression';
import express from 'express';
const app = express();

//A PARTIR DE AHORA INDICO QUE LAS RESPUESTAS PASEN POR UN PROCESO DE COMPRESION//
app.use(compression()); 

//VERIFICO SOBRE LA RUTA INFO CON y SIN COMPRESION//
app.get('/info',async(peticion,respuesta)=>{
    let string = 'Compresion de Info';
    for(let i=0; i<5e5; i++){
        string+='Compresion de Info'
    }
    respuesta.send(string);
})

//SECCION LOGGERS UTILIZANDO LIBRERIA WINSTON//
const logger = winston.createLogger({
    transports:[
        new winston.transports.File({filename:'./error.log'})
    ]
})
app.get('/logger',(peticion,respuesta)=>{
    respuesta.send('Logger con Exito');
})


//SECCION ARTILLERY//
//IMPORTO cluster y os PARA PODER UTILIZARLOS//
import cluster from 'cluster';
import {cpus} from 'os';

//CREO UN SERVIDOR, EN DONDE EN ESTE CASO VAMOS A PODER ENCENDER EL SERVIDOR EN MODO FORK o EN MODO CLUSTER//
const PUERTO = 8080;
const modoCluster = process.argv[3] == 'CLUSTER'

//TERMINO DE CONFIGURAR EL SERVIDOR//
if(modoCluster && cluster.isPrimary){
    const numeroCPUs = cpus().length
    console.log(`Numero de Procesadores: ${numeroCPUs}`)
    console.log(`PID MASTER ${process.pid}`)

    for(let i=0; i<numeroCPUs; i++){
        cluster.fork()
    }
    cluster.on('exit', worker =>{
        console.log('Worker',worker.process.pid, 'died',new Date().toLocaleDateString())
        cluster.fork()
    })
}else{
    const app = express()

    app.get('/',(peticion,respuesta)=>{
        const numerosPrimos = []
        const max = Number(peticion.query.max) || 1000

        for(let i=1; i<=max; i++){
            if(isPrime(i)) numerosPrimos.push(i)
        }
        respuesta.json(numerosPrimos)
    })

    app.listen(PUERTO,()=>{
        console.log(`Servidor escuchandose en http://localhost:${PUERTO}`)
        console.log(`PID WORKER ${process.pid}`)
    })

    //UTILIZO LA FUNCION isPrime EN EL SERVIDOR, EN DONDE SU UNICA FUNCION ES RECIBIR UN NUMERO COMO PARAMETRO y RETORNAR true SI EL NUMERO ES PRIMO o false SI NO LO ES//
    function isPrime(num){
        if([2,3].includes(num)) return true;
        else if([2,3].some(n => num % n == 0)) return false;
        else{
            let i=5, w=2;
            while((i**2) <= num){
                if(num % i == 0) return false
                i += w
                w = 6 - w
            }
        }
        return true
    }
}


