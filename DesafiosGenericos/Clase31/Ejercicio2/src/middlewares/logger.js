//IMPORTO winston PARA PODER UTILIZARLO//
import winston from winston;

//CREO MI PROPIO NIVEL DE PRIORIDAD//
const customLevelsOptions = {
    levels:{
        fatal:0,
        error:1,
        warning:2,
        http:3,
        debug:4,
    }
}

//CREO UN LOGGER MEDIANTE winston.createLogger()//
const logger = winston.createLogger({
    //ANTES DE COLOCAR LOS TRANSPORTES LLAMO DESDE MIS OPCIONES customLevelsOptions, LOS levels QUE PROPIAMENTE CREE//
    levels: customLevelsOptions.levels,
    transports:[
        new winston.transports.Console({
            level:'debug'
        })
    ]
})

//PARA NO TENER QUE ESTAR IMPORTANDO y EXPORTANDO MI LOGGER, GENERO UN UNICO MIDDLEWARE QUE SE LLAMARA agregarLogger//
export const agregarLogger = (peticion,respuesta,next)=>{
    //CREO LA PROPIEDAD peticion.logger y AHI COLOCO MI logger QUE ACABO DE CREAR//
    peticion.logger = logger;
    peticion.logger.http(`${peticion.method} en ${peticion.url} ${new Date().toLocaleTimeString()}`)
    next();
}