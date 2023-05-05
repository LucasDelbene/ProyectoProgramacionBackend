//TWILIO SMS//

//IMPORTO twilio y dotenv PARA PODER UTILIZARLOS//
import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const TWILIO_SID = 'ACaf7195f4623fec06e70436ecf8b5dd2a';
const TWILIO_CONTRASEÑA = 'be408406126ad2cc49d253ce94b10c72';

const clienteTwilio = twilio(TWILIO_SID,TWILIO_CONTRASEÑA);

//ENVIAR SMS//
const sendSMS = async (body,from,to)=>{
    try{
        const mensaje = await clienteTwilio.messages.create({
            body:body,
            from:from,
            to:to
        })
        console.log(mensaje);
    }catch(error){
        console.log(error);
    }
}
export default sendSMS;