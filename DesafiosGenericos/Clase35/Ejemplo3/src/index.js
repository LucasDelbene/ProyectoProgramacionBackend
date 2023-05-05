//EJEMPLO 3 UTILIZANDO TWILIO (CLASE 35)//

//BASICAMENTE, TWILIO ES SERVICIO DE COMUNICACION EN LA NUBE QUE PERMITE UN SIN FIN DE PROCESOS COMO LO SON: ENVIAR y RECIBIR SMS, ENVIAR y RECIBIR LLAMADAS DE VOZ, ENVIAR y RECIBIR LLAMADAS DE VIDEO y MUCHO MAS//
//ACTUA COMO INTERMEDIARIO, OFRECIENDO UN WebHook HTTPS PARA QUE SE ENVIE UNA SOLICITUD POST A LA URL QUE QUERAMOS CADA VEZ QUE SE RECIBA UN MENSAJE y RESPONDER EN ESA MISMA SOLICITUD//
//EL MODULO DE NODE TWILIO AYUDA A ESCRIBIR EL CODIGO DE LOS REQUEST HTTP A LA API DE TWILIO//
//CON EL REGISTRO EN LA PAGINA, TWILIO NOS REGALA 15USD PARA COMENZAR A PROBAR SUS SERVICIOS//

//IMPORTO twilio y express PARA PODER UTILIZARLOS//
import twilio from 'twilio';
import express from 'express';
const app = express();
 
//DATOS TWILIO//
const SID = 'ACaf7195f4623fec06e70436ecf8b5dd2a';
const TOKEN_AUTENTICACION = 'c47e0065858921ad253ac5ed3e13f93b';
const TWILIO_NUMERO = '+15856393748';

//INICIALIZO TWILIO//
const twilioCliente = twilio(SID,TOKEN_AUTENTICACION); //PRIMERO MANDO EL SID y DESPUES EL TOKEN_AUTENTICACION

//CREO UNA RUTA LLAMADA SMS//
app.get('/sms',async(peticion,respuesta)=>{
    const resultado = await twilioCliente.messages.create({
        body:'Esto es un Mensaje de Prueba utilizando Twilio para el Curso de Programacion Backend en CoderHouse',
        from:TWILIO_NUMERO,
        to:'+543435233460'
    })
    console.log(resultado);
    respuesta.send({estado:'EXITOSO',mensaje:'SMS ENVIADO EXITOSAMENTE'})
})

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO,()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));