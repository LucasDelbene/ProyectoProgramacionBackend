//ARCHIVO DE CONFIGURACION GENERAL//
//ESTE ARCHIVO DE CONFIGURACION, NOS VA A PERMITIR NO TENER DISPERSAS NUESTRAS VARIABLES DE ENTORNO EN DIFERENTES PARTES DEL APLICATIVO, SINO QUE TODO LO VOY A TENER CONTROLADO EN UN UNICO OBJETO//

//IMPORTO dotenv PARA PODER UTILIZARLO//
import dotenv from 'dotenv';

//CON dotenv.config(), ESTAMOS YA LEYENDO NUESTRAS VARIABLES DE ENTORNO y CONFIGURANDO NUESTRO ENTORNO SEGUN EL ARCHIVO QUE TENGAMOS//
dotenv.config();

//CREO UN export default y ABRO UN OBJETO//
export default{
    //POR EJEMPLO, SI YO QUIERO TRABAJAR EL PUERTO, PODRIA TENERLO EN UN OBJETO QUE TENGA CONFIGURACION DEL APLICATIVO EN GENERAL//
    app:{
        PUERTO: process.env.PUERTO||8080 //ESTE process.env.PUERTO, VA A IR A BUSCARLO EN LAS VARIABLES DE ENTORNO DE process.env, PERO COMO YO YA EJECUTE dotenv.config() YA VA A SABER ENCONTRARLO DENTRO DE ESTAS VARIABLES
    }
}