//REQUIERO faker PARA PODER UTILIZARLO//
const faker = require('@faker-js/faker')

//CONTROLADOR FAKER//
const getFaker = (peticion, respuesta) =>{
    const dataRandom = [];
    const data = {
        dataRandom: dataRandom
    };

    for(let i=0; i<5; i++){
        dataRandom.push({
            nombre: faker.commerce.productName(),
            precio: faker.commerce.price(),
            imagen: faker.image.image()
        });
    }
    respuesta.render('faker', data);
}

module.exports = {getFaker};
