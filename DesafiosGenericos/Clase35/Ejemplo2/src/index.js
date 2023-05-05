//EJEMPLO 2 ENVIANDO MAILS USANDO GMAIL (CLASE 35)//

//IMPORTO nodemailer y express PARA PODER UTILIZARLOS//
import nodemailer from 'nodemailer';
import express from 'express';
const app = express();

//DATOS GMAIL//
const GMAIL_CONTRASEÑA = 'gwtuoqqlvobvcupb'
const GMAIL_USUARIO = 'lucasdelbene14@gmail.com'

const transportador = nodemailer.createTransport({
    service:'gmail',          //NOS PIDE UN SERVICE. ES EL SERVICIO QUE VAMOS A UTILIZAR y EN ESTE CASO UTILIZAREMOS GMAIL
    port: 587,                //NOS PIDE UN PUERTO. EN ESTE CASO EL PUERTO 587 ES BASTANTE HABITUAL PARA LO QUE ES EL ENVIO DE CORREOS
    
    auth:{                    //NOS PIDE AUTENTICACION                                    
        user:GMAIL_USUARIO,   //USUARIO CON EL QUE VAMOS A ENVIAR EL CORREO
        pass:GMAIL_CONTRASEÑA //CONTRASEÑA DEL USUARIO QUE ENVIA EL CORREO
    }
});

//CREO UNA RUTA LLAMADA EMAIL//
app.get('/email',async(peticion,respuesta)=>{
    const email = peticion.body || 'lucasdelbene14@gmail.com';
    const resultado = await transportador.sendMail({
        from:'Curso Programacion Backend CoderHouse <coderhouse@gmail.com>',                                    //DESDE DONDE SE ENVIA ESTE EMAIL
        to:email,                                                                                               //A QUIEN SE LE ENVIA ESTE EMAIL
        subject:'Probando Nodemailer',                                                                          //ASUNTO o MOTIVO DEL ENVIO DEL CORREO
        html:`<div><h1>Este es un Correo de Prueba del Curso de Programacion Backend en CoderHouse</h1></div>`, //CONTENIDO HTML DEL CORREO ENVIADO
        attachments:[                                                                                           //LOS ATTACHMENTS, CORRESPONDEN A UN ARREGLO DONDE SE PUEDEN METER TODOS LOS ARCHIVOS QUE QUISIERAS
            {
                filename:'MessiCopaDelMundo.jpg',            //NOMBRE DEL ARCHIVO
                path:'./img/MessiCopaDelMundo.jpg'  //RUTA INTERNA DESDE LA CUAL YO TENGO INTENCION DE HACER ESTE ENVIO
            }
        ]
    })
    console.log(resultado);
    respuesta.send({estado:'EXITOSO',mensaje:'CORREO ENVIADO EXITOSAMENTE'})
})

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO,()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));