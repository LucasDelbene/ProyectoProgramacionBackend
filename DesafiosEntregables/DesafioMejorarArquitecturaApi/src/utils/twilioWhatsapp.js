//TWILIO WHATSAPP//

//IMPORTO twilio PARA PODER UTILIZARLO//
import twilio from 'twilio'

const TWILIO_SID = 'ACaf7195f4623fec06e70436ecf8b5dd2a';
const TWILIO_CONTRASEÑA = 'be408406126ad2cc49d253ce94b10c72';
const TWILIO_WHATSAPP = 'whatsapp:+14155238886';

const twilioCliente = twilio(TWILIO_SID,TWILIO_CONTRASEÑA);

//ENVIAR WHATSAPP//
const sendWhatsApp = async(body,from,to)=>{
    try{
        const mensaje = await twilioCliente.messages.create({
            body:body,
            from:from,
            to:to
        })
        console.log(mensaje);
    }catch(error){
        console.log(error.message);
    }

}
export default sendWhatsApp;