//DESAFIO GENERICO - PROBANDO GZIP//

//BASICAMENTE, LA COMPRESION GZIP ES UN METODO POPULAR QUE SE UTILIZA PARA REDUCIR EL TAMAÑO DE LOS ARCHIVOS WEB. DE ESTE MODO, LA VELOCIDAD DE TU SITIO MEJORARA, YA QUE LOS VISITANTES DESCARGARAN LOS DATOS COMPRIMIDOS EN LUGAR DE LOS ARCHIVOS EN TAMAÑO COMPLETO//

//IMPORTO compression y express PARA PODER UTILIZARLO//
import compression from 'express-compression';
import express from 'express';
const app = express();

//INDICO QUE LAS RESPUESTAS A PARTIR DE AHORA PASEN POR UN PROCESO DE COMPRESION, LA CUAL NOS VA A AYUDAR A QUE LAS RESPUESTAS LLEGUEN UNAS MICRAS DE SEGUNDOS MAS RAPIDO y SEGUNDO QUE NO GENERE TANTO PROCESAMIENTO DEL LADO DEL FRONT AL MOMENTO DE TRAER LA INFORMACION//
app.use(compression());

//CREO UN ENDPOINT GET LLAMADO compresion//
app.get('/compresion', async (peticion,respuesta)=>{
    let string = 'Saludos';
    for(let i=0; i<5e5; i++){
        string+='Saludos';
    }
    respuesta.send(string);
})
 
//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO,()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));