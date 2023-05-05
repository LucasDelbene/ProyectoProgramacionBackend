//REQUIERO Router y multer PARA PODER UTILIZARLOS//
let {Router} = require('express');
let multer = require('multer');

//REQUIERO UNA LIBRERIA INTERNA LLAMADA path//
let path = require('path');

//CREO LA VARIABLE LLAMADA storage EN DONDE GUARDAREMOS TODA LA INFORMACION//
let storage = multer.diskStorage({
    destination: path.join(__dirname, '../../uploads'),  //DESTINO DEL ARCHIVO, EN ESTE CASO LA CARPETA 'uploads'
    filename: (peticion, file, cb)=>{                    //NOMBRE DEL ARCHIVO
        console.log(file);                
        cb(null, `${file.originalname}`);
    }                           
});

//UTILIZAREMOS multer LA CUAL ES USADO PARA LA SUBIDA DE ARCHIVOS//
let midMulter = multer({
    storage,                                             //MULTER ME RECIBE LA OPCION storage
    destination: path.join(__dirname, '../../uploads'),  //MULTER ME RECIBE LA OPCION destination
    limits:{fileSize: 100000000}                         //MULTER ME RECIBE LA OPCION DE limitaciones
});

//CREO LAS VARIABLES DE INFORMACION DE ARCHIVOS//
let informacionUno = (peticion, respuesta, next)=>{
    peticion.body.nacionalidad = "Argentina";
    next();
}

let informacionDos = (peticion, respuesta, next)=>{
    peticion.body.sangre = 'A+';
    next();
}

//CREO LA INSTANCIA DE LA RUTA ARCHIVOS//
let rutaArchivos = new Router();

//RUTA ARCHIVOS//
module.exports = app =>{ 
    let arrayArchivos = [];

    //CREO LAS RUTAS CON LOS METODOS use y get//
    app.use('/personas', rutaArchivos);
    rutaArchivos.use(midMulter.single("file"))
    rutaArchivos.use((peticion, respuesta, next)=>{
       peticion.body.rutaArchivos = true;
       next();
    })
    rutaArchivos.get('/', (peticion, respuesta, next)=>{
        respuesta.json({archivo: arrayArchivos});
    })

    //CREO LA RUTA CON EL METODO post LA CUAL ME PERMITIRA GUARDAR UN ARCHIVO EN ARRAYS PROPIOS EN MEMORIA//
    rutaArchivos.post('/', informacionUno,informacionDos,(peticion, respuesta, next)=>{
        let objeto = peticion.body;
        arrayArchivos.push(objeto);

        respuesta.json({archivo:arrayArchivos});
    })

    rutaArchivos.post('/archivo',(peticion, respuesta, next)=>{
        console.log("------------------------------------------");
        console.log(peticion.file);

        respuesta.json({resultado: "Excelente, archivo almacenado con exito."})
    })
} 