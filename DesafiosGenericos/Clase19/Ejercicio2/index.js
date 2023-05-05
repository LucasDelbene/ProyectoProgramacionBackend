//DESAFIO GENERICO - MongoDB: CRUD//

//REALIZAR UN PROYECTO EN Node.js QUE SOBRE LA BASE colegio REALICE LAS SIGUIENTES ACCIONES//

//(PUNTO 1)//
//ACTUALIZAR EL DNI DEL ESTUDIANTE Lucas Delbene a 20355875//

//(PUNTO 2)//
//AGREGAR UN CAMPO 'ingreso' A TODOS LOS DOCUMENTOS CON EL VALOR FALSE//

//(PUNTO 3)//
//MODIFICAR EL VALOR DE 'ingreso' A TRUE PARA TODOS LOS ESTUDIANTES QUE PERTENEZCAN AL CURSO 1A//

//(PUNTO 4)//
//LISTAR LOS ESTUDIANTES QUE APROBARON (DE 4 PARA ARRIBA) SIN LOS CAMPOS DE _id y __v//

//(PUNTO 5)//
//LISTAR LOS ESTUDIANTES QUE POSEAN EL CAMPO 'ingreso' EN TRUE SIN LOS CAMPOS DE _id y __v//

//(PUNTO 6)//
//BORRAR DE LA COLECCION DE ESTUDIANTES LOS DOCUMENTOS CUYO CAMPO 'ingreso' ESTE EN TRUE//

//(PUNTO 7)//
//LISTAR EL CONTENIDO DE LA COLECCION ESTUDIANTES UTILIZANDO LA CONSOLA, IMPRIMIENDO EN CADA CASO LOS DATOS ALMACENADOS (SIN EL CAMPO __v) JUNTO A SU FECHA DE CREACION OBTENIDA DEL ObjetcID//

//(PUNTO 8)//
//IMPLEMENTAR ESTAS FUNCIONES UTILIZANDO Promises EN Mongoose CON SINTAXIS async/await, UTILIZANDO LA IMPORTACION EN FORMATO ES Modules (import)//

//(PUNTO 9)//
//VERIFICAR LA INFORMACION DE LA BASE 'colegio' A TRAVES DE ALGUN CLIENTE//

//IMPORTO mongoose PARA PODER UTILIZARLO//
import mongoose from 'mongoose';

//INSTANCIO Schema//
const schema = mongoose.Schema

//DEFINO EL ESQUEMA DE DOCUMENTO y DEL MODELO PARA INTERACTUAR CON LA BASE DE DATOS: Leer, Escribir, Listar, Actualizar//
const estudiantesSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    edad: {type: Number, required: true},
    dni: {type: String, required: true, unique: true},
    curso: {type: String, required: true},
    nota: {type: Number, required: true},
    //AGREGO ingreso AL Schema ACTUAL//
    ingreso: {type: Boolean, default: false}
})

const estudiantesDAO = mongoose.model('estudiantes', estudiantesSchema)

//CONEXION A LA BASE DE DATOS//
await mongoose.connect('mongodb://127.0.0.1/colegio',{
    serverSelectionTimeoutMS: 5000,
})
console.log('BASE DE DATOS CONECTADA CON EXITO')


try{
    //(PUNTO 1) ACTUALIZACION DNI DE Lucas Delbene a 20355875//
    console.log('Actualizacion DNI de Lucas Delbene')
    let respuesta = await estudiantesDAO.updateOne({
        nombre: 'Lucas',
        apellido: 'Delbene'
    }, {$set: {dni: 20355875}})
    console.log(respuesta);

    //(PUNTO 2) AGREGO UN CAMPO INGRESO A TODOS LOS DOCUMENTOS CON EL VALOR FALSE//
    console.log('Agregar un Campo de Ingreso a Documentos con Valor False')
    respuesta = await estudiantesDAO.updateMany({}, {$set: {ingreso: false}})
    console.log(respuesta);
    
    //(PUNTO 3) MODIFICAR EL VALOR INGRESO A TRUE PARA TODOS LOS ESTUDIANTES DEL CURSO 1A//
    respuesta = await estudiantesDAO.updateMany({curso: '1A'}, {$set: {ingreso: true }})
    console.log(respuesta);

    //(PUNTO 4) LISTAR LOS ESTUDIANTES QUE APROBARON (4 PARA ARRIBA) SIN LOS CAMPOS id y v//
    const estudiantesAprobados = await estudiantesDAO.find({nota: {$gte:4}}, {_id:0, __v:0})
    estudiantesAprobados.forEach(aprobados =>{
        console.log(JSON.stringify(aprobados))
    })
    
    //(PUNTO 5) LISTAR LOS ESTUDIANTES QUE POSEAN EL CAMPO INGRESO EN TRUE SIN LOS CAMPOS DE id y v//
    const estudiantesIngresantes = await estudiantesDAO.find({ingreso: true}, {_id:0, __v:0})
    estudiantesIngresantes.forEach(ingresantes =>{
        console.log(JSON.stringify(ingresantes))
    })

    //(PUNTO 6) BORRAR DE LA COLECCION DE ESTUDIANTES LOS QUE POSEAN INGRESO TRUE//
    respuesta = await estudiantesDAO.deleteMany({ingreso: true})
    console.log(respuesta);

    //(PUNTO 7) LISTAR EL CONTENIDO DE LA COLECCION ESTUDIANTES CON EL CAMPO __v:0//
    let estudiantes = await estudiantesDAO.find({}, {__v: 0})
    estudiantes.forEach(estudiante => {
        console.log(JSON.stringify(estudiante),'FECHA DE CREACION:', new Date(estudiante._id.getTimestamp()).toLocaleString())
    })

}catch(error){
    console.log(error);
}finally{
    await mongoose.disconnect()
}
