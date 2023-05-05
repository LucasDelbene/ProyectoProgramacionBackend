//EJEMPLO 1 UTILIZANDO ARTILLERY (CLASE 32)//

//BASICAMENTE, ARTILLERY ES UNA DEPENDENCIA DE NODE MODERNA, POTENTE, FACIL y MUY UTIL PARA REALIZAR TEST DE CARGA A SERVIDORES. CUENTA CON UN CONJUNTO DE HERRAMIENTAS PARA TEST DE PERFORMANCE QUE SE USA PARA ENVIAR APLICACIONES ESCALABLES QUE SE MANTENGAN EFICACES y RESISTENTES BAJO CARGAS ELEVADAS//

//ARTILLERY --count, HACE REFERENCIA AL NUMERO DE USUARIOS VIRTUALES EN EL PROCESO//
//ARTILLERY -n, HACE REFERENCIA AL NUMERO DE PETICIONES EN EL PROCESO//
//EN EL EJEMPLO QUE REALICE, ME ENCARGUE DE LEVANTAR 50 USUARIOS VIRTUALES (--count) QUE SE ENCARGUEN DE HACER 40 PETICIONES (-n)//

//IMPORTO cluster, os y express PARA PODER UTILIZARLOS//
import cluster from 'cluster';
import {cpus} from 'os';
import express from 'express';

//CREO UN SERVIDOR, EN DONDE EN ESTE CASO VAMOS A PODER ENCENDER EL SERVIDOR EN MODO FORK o EN MODO CLUSTER//
const PUERTO = parseInt(process.argv[2]) || 8080;
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


