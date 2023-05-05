//REQUIERO Router DE express PARA PODER UTILIZARLO//
let {Router} = require('express');

//CREO LA INSTANCIA DE LA RUTA MASCOTAS//
let rutaMascotas = new Router();

//RUTA MASCOTAS//
module.exports = app =>{ 
    let arrayMascotas = [
        {
            nombre: 'Deysi',
            raza: 'Caniche',
            edad: 10
        },
        {
            nombre: 'Mora',
            raza: 'Caniche',
            edad: 10
        }
    ];

    app.use('/mascotas', rutaMascotas);
    rutaMascotas.get('/', (peticion, respuesta, next)=>{
       respuesta.json({mascotas: arrayMascotas});
    })

    //CREO LA RUTA CON EL METODO post LA CUAL ME PERMITIRA GUARDAR UNA MASCOTA EN ARRAYS PROPIOS EN MEMORIA//
    rutaMascotas.post('/', (peticion, respuesta, next)=>{
        let objeto = peticion.body;
        arrayMascotas.push(objeto);

        respuesta.json({mascotas: arrayMascotas});
    })
}