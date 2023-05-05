//LA FORMA MAS PROFESIONAL DE TRABAJAR CON PM2 ES A PARTIR DE ALGO QUE SE LLAMA EcoSystem//

//ECO SYSTEM ES TAN UTIL PORQUE ACA VOY A PODER TRABAJAR CON TODAS LAS APLICACIONES QUE QUIERA LEVANTAR//
module.exports = {
    apps:[
        {
            name: 'ServidorUno',    //NOMBRE DEL SERVIDOR
            script: 'src/index.js', //SCRIPT QUE VOY A LEVANTAR
            env:{                   //ENTORNO QUE LE VOY A PASAR
                PUERTO: 8081
            }
        },
        {
            name: 'ServidorDos',    //NOMBRE DEL SERVIDOR
            script: 'src/index.js', //SCRIPT QUE VOY A LEVANTAR
            env:{                   //ENTORNO QUE LE VOY A PASAR
                PUERTO: 8082
            }
        },

        //TENGO LA POSIBILIDAD DE EJECUTAR UN TERCER SERVIDOR QUE EJECUTE EL MISMO SCRIPT, PERO INCLUSO TAMBIEN TENGO LA POSIBILIDAD DE EJECUTARLO COMO CLUSTER//
        {
            name: 'ServidorTres',   //NOMBRE DEL SERVIDOR
            script: 'src/index.js', //SCRIPT QUE VOY A LEVANTAR
            exec_mode: 'cluster',   //INDICO EL MODO, EN ESTE CASO cluster
            instances: 20           //CREO INSTANCIAS, LA CUAL ME ESTAN INDICANDO QUE ESTE ServidorTres VA A TENER SOPORTE PARA 20 INSTANCIAS
        }
    ]
}
