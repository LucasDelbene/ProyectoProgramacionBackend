//NODEMAILER GMAIL//

//REALIZO LAS IMPORTACIONES//
import {createTransport} from 'nodemailer';

//TRANSPORTADOR PARA EMAIL//
const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth:{
        user: 'karley72@ethereal.email',
        pass: 'CqCyVRgmH81jE4uEaK'
    }
});

//FUNCION PARA ENVIAR EMAIL//
const sendEmail = async (options)=>{
    try{
        const response = await transporter.sendMail(options);
        console.log(response);
    }catch(error){
        console.error(error);
    }
}
export default sendEmail;