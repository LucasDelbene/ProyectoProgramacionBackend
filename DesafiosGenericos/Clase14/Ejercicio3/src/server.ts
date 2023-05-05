//DESAFIO GENERICO - PERIMETRO y SUPERFICIE//

//TENGO QUE CREAR UN PROYECTO BASADO EN WebPack y TypeScript QUE IMPLEMENTE UN SERVIDOR node express CUYO PUNTO DE ENTRADA SERA server.ts//
//SE IMPLEMENTARA UNA CLASE LLAMADA Perimetro QUE CONTENGA TRES METODOS ESTATICOS PARA CALCULAR EL PERIMETRO DE UN CUADRADO, UN RECTANGULO y UN CIRCULO. ESTA CLASE SE GUARDARA EN UN ARCHIVO LLAMADO perimetro.js//
//EN OTRO ARCHIVO LLAMADO superficie.ts SE IMPLEMENTARA UNA CLASE LLAMADA Superficie QUE CONTENGA TRES METODOS ESTATICOS PARA CALCULAR LA SUPERFICIE DE LAS MISMAS TRES FIGURAS//
//LOS DOS MODULOS SE IMPORTARAN EN server.js//
//REALIZAR LOS endpoints get QUE PERMITAN RECIBIR LAS PETICIONES DE CALCULO CON LOS PARAMETROS CORRESPONDIENTES. LA RESPUESTA SERA EN FORMATO OBJETO y REPRESENTARA EL TIPO DE CALCULO, LA FIGURA, LOS PARAMETROS DE ENTRADA y EL RESULTADO//
//IMPLEMENTAR EL TIPADO EN TODAS LAS CLASES y FUNCIONES DEL SERVIDOR//
//PROBAR CON EL NAVEGADOR o CLIENTE http TODAS LAS POSIBLES VARIANTES//

//IMPORTO DEPENDENCIAS//
import express from 'express';               //IMPORTO express PARA PODER UTILIZARLO 
import Perimetro from './lib/perimetro';     //IMPORTO Perimetro DESDE LA CARPETA './lib/perimetro'
import Superficie from './lib/superficie';   //IMPORTO Superficie DESDE LA CARPETA './lib/superficie'

//INSTANCIO CONSTANTES//
const app = express();

//CREO LA RUTA '/perimetro' CON EL METODO get, EN LA CUAL CALCULO LOS PERIMETROS//
app.get('/perimetro', (peticion, respuesta)=>{
    const {figura, ladoUno, ladoDos, lado, radio} = peticion.query;
    let resultado:number;

    if(figura === 'cuadrado' && lado){
        resultado = Perimetro.cuadrado(Number(lado));                        //CUADRADO
    }else if(figura === 'rectangulo' && ladoUno && ladoDos){
        resultado = Perimetro.rectangulo(Number(ladoUno), Number(ladoDos));  //RECTANGULO
    }else if(figura === 'circulo' && radio){
        resultado = Perimetro.circulo(Number(radio));                        //CIRCULO
    }else{
        return respuesta.send('Parametros Invalidos')
    }

    respuesta.json({
        calculo: 'perimetro',
        figura,
        resultado,
    });
});

//CREO LA RUTA '/superficie' CON EL METODO get, EN LA CUAL CALCULO LAS SUPERFICIES//
app.get('/superficie', (peticion, respuesta)=>{
    const {figura, ladoUno, ladoDos, lado, radio} = peticion.query;
    let resultado:number;

    if(figura === 'cuadrado' && lado){
        resultado = Superficie.cuadrado(Number(lado));                        //CUADRADO
    }else if(figura === 'rectangulo' && ladoUno && ladoDos){
        resultado = Superficie.rectangulo(Number(ladoUno), Number(ladoDos));  //RECTANGULO
    }else if(figura === 'circulo' && radio){
        resultado = Superficie.circulo(Number(radio));                        //CIRCULO
    }else{
        return respuesta.send('Parametros Invalidos')
    }

    respuesta.json({
        calculo: 'superficie',
        figura,
        resultado,
    });
});

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO, ()=> console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));

