//EJEMPLO 1 GIT y GITHUB (CLASE 33)//

//GIT, ES UNA HERRAMIENTA PARA LLEVAR A CABO EL CONTROL DE VERSIONES. ES UNO DE LOS SISTEMAS DE CONTROL DE VERSIONES MAS UTILIZADO//

//CONCEPTOS DE GIT//
/*
- REPOSITORIO REMOTO: Es el lugar centralizado donde se guardan los archivos.
- REPOSITORIO LOCAL: Es el lugar dentro de la computadora donde se guardan los archivos.
- WORKING DIRECTORY: Copia del repositorio local (donde voy a empezar a trabajar)
- VERSION: Captura del repositorio en un determinado momento.
- COMMIT: Modificaciones que le hacemos a los archivos del repositorio en nuestra computadora.
- TAG: Es una version a la que le damos cierta importancia, Ejemplo: 1.0.2
- PUSH: Registrar los commits en el repositorio remoto.
- PULL: Obtener los cambios en el repositorio remoto.
- CONFLICTOS: Cuando dos o mas personas modifican la misma linea de un archivo.
- RESOLUCION DE CONFLICTO: Decidir cual es la mejor version que queremos del archivo modificado.
- BRANCH: Secuencia de commit sucesivos, que conforman una ramificacion en la linea temporal de un proyecto. Por convencion tenemos una llamada 'master', aunque actualmente se esta reemplazando por 'main' y puede haber otras mas.
- MERGE: Realizar una fusion entre dos branches. 
*/


//IMPORTO express PARA PODER UTILIZARLO//
import express from 'express';
const app = express();

//CREO UNA RUTA PRINCIPAL//
app.get('/',(peticion,respuesta)=>{
    respuesta.send('EJEMPLO GIT y GITHUB (CLASE 33)')
})

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO,()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));