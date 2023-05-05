//EJEMPLO DE SERVIDOR PROXY//

//IMPORTO express PARA PODER UTILIZARLO//
import express from 'express';
const app = express();

//CREO UNA RUTA PRINCIPAL//
app.get('/',(peticion,respuesta)=>{
    respuesta.send(`Peticion atendida por ${process.id} escuchandose en el servidor ${PUERTO}`)
})

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO,()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));