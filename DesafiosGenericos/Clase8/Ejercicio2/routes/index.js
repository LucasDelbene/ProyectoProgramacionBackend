//REQUIERO LAS RUTAS mascotas y personas DE LA CARPETA components//
let mascotasApi = require('../components/mascotas');
let personasApi = require('../components/personas');

module.exports = app =>{
    //RUTA PRINCIPAL//
    app.get('/', (peticion, respuesta, next)=>{
        respuesta.send('Bienvenidos a la ruta principal del Desafio Generico Express Router');
    })

    //RUTA MASCOTAS//
    mascotasApi(app);

    //RUTA PERSONAS//
    personasApi(app);
} 