//REQUIERO Router DE express PARA PODER UTILIZARLO//
let {Router} = require('express');

//CREO LA INSTANCIA DE LA RUTA PERSONAS//
let rutaPersonas = new Router();

//RUTA PERSONAS//
module.exports = app =>{ 
    let arrayPersonas = [
        {
            nombre: 'Lucas Delbene',
            edad: 20
        },
        {
            nombre: 'Lionel Messi',
            edad: 35
        }
    ];

    app.use('/personas', rutaPersonas);
    rutaPersonas.get('/', (peticion, respuesta, next)=>{
       respuesta.json({personas: arrayPersonas});
    })

    //CREO LA RUTA CON EL METODO post LA CUAL ME PERMITIRA GUARDAR UNA PERSONA EN ARRAYS PROPIOS EN MEMORIA//
    rutaPersonas.post('/', (peticion, respuesta, next)=>{
        let objeto = peticion.body;
        arrayPersonas.push(objeto);

        respuesta.json({personas: arrayPersonas});
    })
}