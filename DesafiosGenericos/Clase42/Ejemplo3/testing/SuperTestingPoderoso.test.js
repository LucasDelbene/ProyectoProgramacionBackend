//EJEMPLO 3 APLICANDO CHAI y SUPERTEST PARA TESTING (CLASE 42)//

//IMPORTO chai y supertest PARA PODER UTILIZARLOS// 
import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Pruebas de Integración con Servidor Completo',()=>{

    before(async function(){
        await requester.get('/testing/init')
    })

    it('ENDPOINT POST /api/sessions/register debe registrar correctamente un Usuario',async function(){
        const testingUsuario = {
            first_name:"Lionel",
            last_name:"Messi",
            email:"lionelmessi@gmail.com",
            password:"2022"
        }
    
        const respuesta = await requester.post('/api/sessions/register')
        .field('first_name', testingUsuario.first_name)
        .field('last_name', testingUsuario.last_name)
        .field('email', testingUsuario.email)
        .field('password', testingUsuario.password)
        .attach('avatar', './testing/LionelMessiTesting.jpg')

        expect(respuesta.status).to.be.equal(200);
        const {_body} = respuesta;
        expect (_body.message).to.be.equal("Registrado");
    })

    it('ENDPOINT GET /api/videogames/ debe traer a los VideoJuegos paginados',async function(){
        const respuesta = await requester.get('/api/videogames');

        expect(respuesta.status).to.be.ok();
        const {_body} = respuesta;
        console.log(_body);
        expect (_body.payload).to.be.ok();
    })
})

/* 

EXPLICACION DEL CODIGO EN EL ARCHIVO SuperTestingPoderoso.test.js: Este código es una prueba de integración utilizando el framework de
pruebas Mocha y dos librerías adicionales: Chai y Supertest.

La prueba tiene dos casos de prueba, uno para probar que el endpoint POST /api/session/register registre correctamente a un usuario y 
otro para probar que el endpoint GET /api/videogames/ traiga correctamente los videojuegos paginados.

El código importa las librerías Chai y Supertest, define expect como una constante y requester como el servidor en localhost:8080. Luego,
define una función describe() para agrupar las dos pruebas de integración. La función before() se encarga de realizar una peticion HTTP 
GET a '/testing/init' antes de ejecutar los casos de prueba.

La primera prueba utiliza el método POST de Supertest para enviar una solicitud con los datos del usuario a registrar y un archivo 
adjunto de imagen. Luego, comprueba que la respuesta tenga un estado HTTP 200 y que el mensaje de respuesta sea "Registrado".

La segunda prueba utiliza el método GET de Supertest para hacer una solicitud a '/api/videogames'. Luego, comprueba que la respuesta 
tenga un estado HTTP válido y que la carga útil (_body.payload) no esté vacía. Finalmente, el código utiliza console.log() para imprimir
la carga útil en la consola.

*/