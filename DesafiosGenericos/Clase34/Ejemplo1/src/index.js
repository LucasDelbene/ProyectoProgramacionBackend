//EJEMPLO 1 UTILIZANDO RAILWAY (CLASE 34)//

//IMPORTO express PARA PODER UTILIZARLO//
import express from 'express';
const app = express();

//CREO UNA RUTA PRINCIPAL//
app.get('/',(peticion,respuesta)=>{
    respuesta.send('EJEMPLO 1 UTILIZANDO RAILWAY (CLASE 34)')
})

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO,()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));