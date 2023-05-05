//EJEMPLO 1 UTILIZANDO NODEMAILER (CLASE 35)//

//BASICAMENTE, NODEMAILER ES UN MODULO PARA APLICACIONES NODE QUE PERMITE EL ENVIO DE CORREOS ELECTRONICOS DE FORMA SENCILLA. EL PROYECTO COMENZO EN 2010 CUANDO NO HABIA UNA OPCION SENSATA PARA ENVIAR MENSAJES DE CORREO ELECTRONICO. HOY ES LA SOLUCION A LA QUE LA MAYORIA DE LOS USUARIOS DE NODE RECURREN POR DEFECTO//

//CARACTERISTICAS DE NODEMAILER//
/*
- Implementacion en un solo modulo con cero dependencias.
- Gran foco en la seguridad.
- Proxies para conexiones SMTP.
- Compatibilidad con Windows: se instala con NPM como cualquier modulo.
- Compatibilidad con contenido HTML y la alternativa de texto sin formato.
- Posibilidad de agregar archivos adjuntos a los mensajes.
- Entrega segura de correo electronico utilizando TLS/STARTTLS.
- Diferentes metodos de transporte ademas del soporte SMTP incorporado.
- Autenticacion Sane OAuth2.
*/

//IMPORTO nodemailer y express PARA PODER UTILIZARLOS//
import nodemailer from 'nodemailer';
import express from 'express';
const app = express();

//CONFIGURACION RECOMENDADA DE ETHEREAL//
//A PARTIR DE nodemailer QUIERO QUE CREES UN TRANSPORTE, QUE ES EL MEDIO POR EL CUAL HACEMOS EL ENVIO DE ALGO EN PARTICULAR y EN ESTE CASO NUESTRO TRANSPORTE ES EL SERVIDOR DE SMTP//
const transportador = nodemailer.createTransport({
    host: 'smtp.ethereal.email',                  //NOS PIDE UN HOST. ESTAMOS CONECTANDO CON EL EMAIL DE ETHEREAL QUE ES EL QUE VAMOS A UTILIZAR PARA PODER HACER EL ENVIO y RECIBO DE CORREOS
    port: 587,                                    //NOS PIDE UN PUERTO. EN ESTE CASO EL PUERTO 587 ES BASTANTE HABITUAL PARA LO QUE ES EL ENVIO DE CORREOS
    
    auth:{                                        //NOS PIDE AUTENTICACION                                    
        user: 'alvis.lueilwitz45@ethereal.email', //CUENTA CON LA QUE VAMOS A ENVIAR EL CORREO
        pass: '2r7yuVwdpm7xUtRrt4'                //CONTRASEÑA DE LA CUENTA QUE ENVIA EL CORREO
    }
});

//CREO UNA RUTA LLAMADA EMAIL//
app.get('/email',async(peticion,respuesta)=>{
    //LE PIDO A transportador QUE ME AYUDE A ENVIAR UN EMAIL MEDIANTE sendMail()//
    const resultado = await transportador.sendMail({
        from:'Argentina',               //DESDE DONDE SE ENVIA ESTE EMAIL
        to:'lucasdelbene14@gmail.com',  //A QUIEN SE LE ENVIA ESTE EMAIL
        subject:'Probando Nodemailer',  //ASUNTO o MOTIVO DEL ENVIO DEL CORREO
        html:`<div><h1>Este es un Correo de Prueba del Curso de Programacion Backend en CoderHouse</h1></div>` //CONTENIDO HTML DEL CORREO ENVIADO
    })
    console.log(resultado);
    respuesta.send({estado:'EXITOSO',mensaje:'CORREO ENVIADO EXITOSAMENTE'})
})

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO,()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));