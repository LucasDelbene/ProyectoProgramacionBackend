module.exports = {
    //DENTRO DEL CAMPO apps VOY INDICAR CUANTOS y CUALES VAN A SER LAS CARACTERISTICAS DE LOS SERVIDORES QUE ESTOY POR LEVANTAR//
    apps:[
        {
            name:'ServidorUno', //NOMBRE DEL SERVIDOR
            script:'src/index.js',  //SCRIPT QUE VOY A LEVANTAR
            env:{               //ENTORNO QUE LE VOY A PASAR
                PUERTO:8080
            }
        },
        {
            name:'ServidorDos', //NOMBRE DEL SERVIDOR
            script:'src/index.js',  //SCRIPT QUE VOY A LEVANTAR
            env:{               //ENTORNO QUE LE VOY A PASAR
                PUERTO:8081
            }
        },
        {
            name:'ServidorTres', //NOMBRE DEL SERVIDOR
            script:'src/index.js',   //SCRIPT QUE VOY A LEVANTAR
            env:{                //ENTORNO QUE LE VOY A PASAR
                PUERTO:8082
            },
            exec_mode:'cluster', //INDICO EL MODO, EN ESTE CASO cluster
            instances:20,        //CREO INSTANCIAS, LA CUAL ME ESTAN INDICANDO QUE ESTE ServidorTres VA A TENER SOPORTE PARA 20 INSTANCIAS
        }
    ]
}