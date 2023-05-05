//REQUIERO LAS RUTA archivos DE LA CARPETA components//
let archivosApi = require('../components/archivos');

module.exports = app =>{
    //RUTA PRINCIPAL//
    app.get('/', (peticion, respuesta, next)=>{
        respuesta.send('Bienvenidos a la ruta principal del Desafio Generico Express y Multer');
    })

    //RUTA PERSONAS//
    archivosApi(app);
} 