//EJEMPLO DE COMO USAR LA LIBRERIA WINSTON//

//IMPORTO winston y express PARA PODER UTILIZARLOS//
import winston from 'winston';
import express from 'express';
const app = express();

//IMPORTO agregarLogger DESDE './middlewares/logger' PARA PODER UTILIZARLO//
import {agregarLogger} from './middlewares/logger';
app.use(agregarLogger);

//CREO UN LOGGER MEDIANTE winston.createLogger()//
const logger = winston.createLogger({
    //ESTE TERMINO DE transports (TRANSPORTES), SE UTILIZA COMO UN MEDIO PARA COMUNICAR ALGO, EN DONDE EN ESTE CASO PODEMOS UTILIZARLO COMO TRANSPORTE DE DIFERENTES ELEMENTOS//
    transports:[ 
        //EL PRIMER TRANSPORTE DE TODOS ES LA CONSOLA, ES DECIR QUE EL TIPICO console.log() BASICAMENTE ESTA UTILIZANDO A LA CONSOLA COMO TRANSPORTE PARA HACERTE LLEGAR ESE REGISTRO//
        new winston.transports.Console({level:'info'}), //CUANDO SETEO UN TRANSPORTE, PUEDO SETEARLO A PARTIR DE ALGO LLAMADO level, ES DECIR, A PARTIR DE QUE NIVEL QUIERO MOSTRAR ESTE LOGGER
        
        //EL OTRO TRANSPORTE ES EL File, EN DONDE SE AGREGA EL filename QUE ES DONDE SE VAN A GUARDAR LOS DATOS A PARTIR DE level:'warn'//
        new winston.transports.File({filename:'./errors.log', level:'warn'})
    ]
})

//CREO UNA RUTA LLAMADA probandoLogger//
app.get('/Logger',(peticion,respuesta)=>{
    logger.log('silly', '127.0.0.1 - No hay lugar como en el Hogar');
    logger.log('debug', '127.0.0.1 - No hay lugar como en el Hogar');
    logger.log('verbose', '127.0.0.1 - No hay lugar como en el Hogar');
    logger.log('http', 'Log para http');
    logger.log('info', '127.0.0.1 - No hay lugar como en el Hogar');
    logger.log('warn', '127.0.0.1 - No hay lugar como en el Hogar');
    logger.log('error', '127.0.0.1 - No hay lugar como en el Hogar');

    respuesta.send('Probando Logger');
})

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO,()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`)); 