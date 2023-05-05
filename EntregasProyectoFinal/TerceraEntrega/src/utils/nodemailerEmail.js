//NODEMAILER EMAIL//

//IMPORTO nodemailer y dotenv PARA PODER UTILIZARLOS//
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transportador = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'karley72@ethereal.email',
        pass: 'CqCyVRgmH81jE4uEaK'
    }
});

//ENVIAR EMAIL//
const sendEmail = async(options)=>{
    try{
        const respuesta = await transportador.sendEmail(options);
        console.log(respuesta);

    }catch(error){
        console.log(error);
    }
}
export default sendEmail;