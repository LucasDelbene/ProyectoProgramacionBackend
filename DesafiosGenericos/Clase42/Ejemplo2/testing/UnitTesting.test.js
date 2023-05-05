//EJEMPLO 2 APLICANDO TESTING (CLASE 42)//

//IMPORTO UserDAO y mongoose PARA PODER UTILIZARLOS//
import UserDAO from '../src/dao/mongo/UserDAO.js';
import mongoose from 'mongoose';

//IMPORTO assert PARA PODER UTILIZARLO//
import {strict as assert} from 'assert';

mongoose.connect('mongodb+srv://LucasDelbene:776@clase24-programacionbackend.13mdabl.mongodb.net/AplicandoTesting(Clase42)?retryWrites=true&w=majority');
const usersService = new UserDAO();

describe('Test Generales del DAO de Usuarios',()=>{

    describe('Pruebas de Lectura',()=>{
        it('DAO debe obtener a los Usuarios en formato Array',async function(){
            const resultado = await usersService.getUsers();
            assert.ok(resultado);
            assert.strictEqual(Array.isArray(resultado), true);
        })
    })

    describe('Pruebas de Escritura',()=>{
        
        //BEFORE LO QUE HACE ES QUE ANTES DE EJECUTARSE EL ELEMENTO SE VACIE LA BASE DE DATOS//
        before(async function(){
            await usersService.drop();
        })

        it('DAO debe poder insertar un Usuario correctamente',async function(){
            const mockUsuario = {
                first_name:"TestingUsuario",
                last_name:"Usuario",
                email:"testingusuario@gmail.com",
                password:"123"
            }

            const resultado = await usersService.createUser(mockUsuario);
            assert.ok(resultado._id);
        })
    })
})

/* 

EXPLICACION DEL CODIGO EN EL ARCHIVO UnitTesting.test.js: Este codigo es un archivo de prueba que utiliza la biblioteca de aserciones
assert para probar un DAO de Usuario (UserDAO) en una aplicacion web con Node.js y MongoDB. 

Primero, importa el módulo UserDAO y Mongoose para establecer la conexión con la base de datos MongoDB. Luego, importa el método assert
de la biblioteca de aserciones.

Despues, se describe una serie de pruebas que dividirán en dos bloques: Pruebas de Lectura y Escritura. En la seccion de Pruebas de
Lectura, se espera que el método getUsers() de UserDAO devuelva un array de usuarios. En la seccion de Pruebas de Escritura, se utiliza
el método before() para vaciar la base de datos antes de ejecutar la prueba. Luego, se define un objeto de usuario ficticio y se utiliza
el método createUser() de UserDAO para insertarlo en la base de datos. Se espera que la inserción del usuario sea exitosa y que el objeto
de usuario devuelto tenga un ID asignado.

En general, este código es parte de un conjunto de pruebas automatizadas para garantizar que el DAO de Usuario funcione correctamente en
la aplicacion

*/