//IMPORTO express PARA PODER UTILIZARLO//
import express from 'express';
const app = express();

//IMPORT rutaUsuario DESDE LA CARPETA routes//
import rutaUsuarios from './routes/rutaUsuarios.js'; 

//RUTA usuarios//
app.use('/api/usuarios', rutaUsuarios);

//CONEXION AL SERVIDOR//
app.listen(8080,()=>console.log(`Servidor escuchandose en http://localhost:${8080}`))

