//IMPORTO DEPENDENCIAS//
import express from 'express';         //IMPORTO express PARA PODER UTILIZARLO
import {getTime} from './lib/utils'  //IMPORTO getTime() DESDE LA CARPETA './lib/utils' PARA PODER MOSTRAR EL TIEMPO
import Persona from './Persona';       //IMPORTO Persona DESDE LA CARPETA './Persona'

//INSTANCIAMOS NUESTRAS CONSTANTES//
const p: Persona = new Persona('Coder', 'House');
const app = express();

//CREO LA RUTA PRINCIPAL CON METODO get//
app.get('/', (peticion, respuesta)=>{
    respuesta.send({
        time: getTime(),
        name: p.getFullName()
    });
});

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO, ()=> console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));