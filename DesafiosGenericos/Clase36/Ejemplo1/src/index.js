//EJEMPLO 1 ENVIANDO WHATSAPP DESDE NODE (CLASE 36)//

//IMPORTO twilio y express PARA PODER UTILIZARLOS//
import twilio from 'twilio';
import express from 'express';
const app = express();

//DATOS DE TWILIO//
const TWILIO_SID = 'ACaf7195f4623fec06e70436ecf8b5dd2a';
const TWILIO_CONTRASEÑA = "592bdc202046afd55bf1e672664e4059";
const TWILIO_WHATSAPP = 'whatsapp:+14155238886';

//INICIALIZO TWILIO//
const twilioCliente = twilio(TWILIO_SID, TWILIO_CONTRASEÑA);

//CREO UNA RUTA LLAMADA WHATSAPP//
app.get('/whatsapp', async (peticion,respuesta) => {
    let numero = 'whatsapp:+5493435233460';

    const resultado = await twilioCliente.messages.create({
        from: TWILIO_WHATSAPP,
        to: numero,
        body: "Bienvenidos al mensaje de prueba de Twilio en Whatsapp.",
    })
    console.log(resultado);
    respuesta.send({estado:'EXITOSO',mensaje:'MENSAJE DE WHATSAPP ENVIADO CON EXITO'})
})

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO,()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));
