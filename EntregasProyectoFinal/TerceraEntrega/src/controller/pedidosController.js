//CONTROLLER DE PEDIDOS//

//IMPORTO storage PARA PODER UTILIZARLO//
import storage from '../daos/index.js';
const pedidosStorage = storage().pedidos;

//REALIZO LAS IMPORTACIONES PARA PODER UTILIZARLAS//
import sendEmail from '../utils/nodemailerEmail.js';
import sendSMS from '../utils/twilioSMS.js';
import sendWhatsApp from '../utils/twilioWhatsapp.js';

//FUNCION PARA CREAR PEDIDO//
const crearPedido = async(peticion,respuesta)=>{
    try{
        const usuarioLogueado = peticion.usuario;
        const usuarioID = peticion.body.idUsuario;
        const pedido = await pedidosStorage.crearPedido(usuarioID);

        auxEmail(usuarioLogueado,pedido);
        return respuesta.render('Compra Finalizada con Exito');
    }catch(error){
        return respuesta.status(404).json({
            error: `ERROR AL CREAR EL PEDIDO ${error}`
        });
    }
};

//FUNCION PARA VER LOS PEDIDOS//
const verPedido = (peticion,respuesta)=>{
    return respuesta.send('Estoy en la Vista de Pedidos');
}

//FUNCION PARA ENVIAR EMAIL//
const envioEmail = async(usuarioLogueado,pedido)=>{
    let detalleDePedido = ``;

    pedido.productos.forEach(element=>{
        detalleDePedido += `
        <li>UNIDADES: ${element.cantidad}. PRODUCTO: ${element.nombre}. CODIGO: ${element.codigo} </li>
    `;
    });

    const opcionesEmail = {
        from: 'coderhouse@gmail.com',
        to: 'lucasdelbene14@gmail.com',
        subject: `Nuevo Pedido de ${usuarioLogueado.username}`,
        html: `
            <h3>NUEVO PEDIDO</h3>
            <p> DATOS DEL CLIENTE:</p>
            <ul>
            <li> NOMBRE: ${usuarioLogueado.username}</li>
            <li> EMAIL: ${usuarioLogueado.email}</li>
            <li> TELEFONO: ${usuarioLogueado.telefono}</li>
            <li> DIRECCION: ${usuarioLogueado.direccion}</li>
            </ul>
            <p> PEDIDO:</p>
            <ul>
            ${detalleDePedido}
            </ul>
        `
    };
    const email = await sendEmail(opcionesEmail);
    console.log(email);
}

//FUNCION PARA ENVIAR WHATSAPP//
const envioWhatsapp = async(usuarioLogueado,pedido)=>{
    let detalleDePedido = ``;

    pedido.productos.forEach(element=>{
        detalleDePedido +=
            `
            - UNIDADES: ${element.cantidad}. PRODUCTO: ${element.nombre}. CODIGO: ${element.codigo}
            `;
    });

    const body =
        `NUEVO PEDIDO
        DATOS DEL CLIENTE:
        NOMBRE: ${usuarioLogueado.username}
        ${usuarioLogueado.email}
        TELEFONO: ${usuarioLogueado.telefono}
        DIRECCION: ${usuarioLogueado.direccion}
        PEDIDO:
        ${detalleDePedido}
        `;
    await sendWhatsApp(body, `whatsapp:+14155238886`, `whatsapp:+543435233460`);
}

export default {crearPedido, verPedido};
