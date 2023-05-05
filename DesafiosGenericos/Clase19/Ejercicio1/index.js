//DESAFIO GENERICO - MongoDB con mongoose//

//(PUNTO 1)//
//REALIZAR UN PROYECTO en Node.js QUE SE CONECTE A UNA BASE DE DATOS MongoDB LOCAL LLAMADA COLEGIO. UTILIZAR mongoose IMPORTANDOLO EN MODULO (import) y GESTIONAR SUS ACCIONES A TRAVES DE PROMESAS//

//(PUNTO 2)//
//CREAR UNA COLECCION LLAMADA 'estudiantes' QUE INCORPORARA 10 DOCUMENTOS CON LA ESTRUCTURA y DATOS DADOS//

//(PUNTO 3)//
//TOMAR LOS VALORES DEL ARRAY DE OBJETOS DADO//

//(PUNTO 4)//
//VERIFICAR CON EL CLIENTE Mongo Shell (CLI) QUE LOS DATOS ESTEN ALMACENADOS EN LA BASE y COLECCION QUE CORRESPONDA//

//IMPORTO DEPENDENCIAS//
import mongoose from 'mongoose';

//CREO LA COLECCION LLAMADA 'estudiantes' e INCORPORO 10 DOCUMENTOS CON LA ESTRUCTURA y DATOS DADOS//
const estudiantes = [
    {nombre: 'Lucas', apellido: 'Delbene', edad: 20, dni: '44211776', curso: '1A', nota: 10},
    {nombre: 'Pedro', apellido: 'Gonzales', edad: 32, dni: '75425437', curso: '1A', nota: 8},
    {nombre: 'Ana', apellido: 'Picos', edad: 29, dni: '32754327', curso: '2A', nota: 6},
    {nombre: 'Jose', apellido: 'Blanco', edad: 22, dni: '69897624', curso: '3A', nota: 10},
    {nombre: 'Maria', apellido: 'Garcia', edad: 36, dni: '75421575', curso: '1A', nota: 9},
    {nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '56754257', curso: '2A', nota: 5},
    {nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '57842353', curso: '2B', nota: 4},
    {nombre: 'Carlos', apellido: 'Fernandez', edad: 33, dni: '46785432', curso: '3B', nota: 2},
    {nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '43754215', curso: '1B', nota: 9},
    {nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '75456385', curso: '3B', nota: 2}
]

//DEFINIR ESQUEMA DE LOS DATOS Y DEL MODELO PARA INTERACTUAR CON LA BASE DE DATOS (LEER, ESCRIBIR, ETC)//
const estudiantesSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    edad: {type: Number, required: true},
    dni: {type: String, required: true, unique: true},
    curso: {type: String, required: true},
    nota: {type: Number, required: true}
})

//ASÍ DE SIMPLE, CREAMOS EL MODELO//
const EstudiantesDAO = mongoose.model('estudiantes', estudiantesSchema); 

//CONEXIÓN A LA BASE DE DATOS: COLEGIO//
await mongoose.connect('mongodb://localhost:27017',{
    serverSelectionTimeoutMS: 5000,
})
console.log('BASE DE DATOS CONECTADA CON EXITO')

//ESCRITURA A LA BASE DE DATOS//
const inserciones = []

for (const estudiante of estudiantes){
    inserciones.push(EstudiantesDAO.create(estudiante))
}

const result = await Promise.allSettled(inserciones);
const rejected = result.filter(r => r.status == 'rejected')
if(rejected.length > 0){
    console.log('CANTIDAD DE FALLOS: ' + rejected.length)
}else{
    console.log('TODO PERFECTO')
}

await mongoose.disconnect()