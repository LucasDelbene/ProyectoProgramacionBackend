//IMPORTO DEPENDENCIAS//
import mongoose from 'mongoose';

//DEFINO UNA CONSTANTE//
const estudiantes = [
    {nombre: 'Lucas', apellido: 'Delbene', edad: 20, dni: '44211776', curso: 'Programacion Backend', nota: 10},
    {nombre: 'Lionel', apellido: 'Messi', edad: 35, dni: '10000000', curso: 'Fútbol', nota: 10},
    {nombre: 'Pep', apellido: 'Guardiola', edad: 51, dni: '20000000', curso: 'Director Técnico', nota: 10},
    {nombre: 'Steve', apellido: 'Jobs', edad: 56, dni: '30000000', curso: 'Apple', nota: 10},
    {nombre: 'Albert', apellido: 'Einstein', edad: 76, dni: '40000000', curso: 'Físico Matemático', nota: 10}
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
await mongoose.connect('mongodb://localhost:27017/colegio',{
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