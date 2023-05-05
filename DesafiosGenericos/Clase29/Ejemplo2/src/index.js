//EJEMPLO SOBRE MODULO PM2//

//BASICAMENTE PM2 ES UN PROCESS MANAGER, LA CUAL SIGNIFICA QUE SE VA A ENCARGAR DE LEVANTAR LOS PROCESOS QUE YO LE VAYA INDICANDO//

//IMPORTO express PARA PODER UTILIZARLO//
import express from 'express';
const app = express();

//CREO UNA RUTA PRINCIPAL//
app.get('/',(peticion,respuesta)=>{
    respuesta.send(`Solicitud atendida por ${process.pid}`)
})

//CONEXION AL SERVIDOR//
const PUERTO = process.env.PUERTO || 8080;
app.listen(PUERTO,()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));
