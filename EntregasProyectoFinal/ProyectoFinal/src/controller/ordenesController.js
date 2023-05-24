//CONTROLLER DE PEDIDOS//

//REALIZO LAS IMPORTACIONES//
import storage from '../daos/index.js';
const ordenesStorage = storage.ordenes;
import sendEmail from '../utils/nodemailerGmail.js';

//FUNCION CONTROLLER DE CREAR ORDEN//
const createOrdenController = async (peticion,respuesta)=>{
    try{
        const userLog = peticion.user;
        const userID = peticion.body.idUser;
        const orden = await ordenesStorage.createOrden(userID);
        auxEmail(userLog, orden);
    
        return respuesta.render('compraFinalizada', { userLog: userLog });
    }catch(error){
        console.log('ERROR AL FINALIZAR COMPRA', error);
        return respuesta.status(404).json({
            error: `ERROR AL CREAR LA ORDEN ${error}`
        });
    }
};

//FUNCION CONTROLLER DE VER ORDENES//
const viewOrdenesController = (peticion,respuesta)=>{
    return respuesta.send('Estoy en viewOrdenes');
}

//FUNCION DE EMAIL//
const auxEmail = async (userLog,orden)=>{
    let detallePedido = ``;

    orden.products.forEach(element=>{
        detallePedido += `
        <li>UNIDADES: ${element.cantidad}. PRODUCTO: ${element.nombre}. CÓDIGO: ${element.codigo} </li>
    `;
    });

    const emailOpciones ={
        from: 'lucasdelbene14@gmail.com',
        to: 'lucasdelbene14@gmail.com',
        subject: `NUEVO PEDIDO DE: ${userLog.username}`,
        html: `
            <h3>NUEVO PEDIDO</h3>
            <p>DATOS DEL CLIENTE: </p>
            <ul>
            <li>Nombre: ${userLog.username}</li>
            <li>Email: ${userLog.email}</li>
            <li>Teléfono: ${userLog.telefono}</li>
            <li>Direccion: ${userLog.direccion}</li>
            </ul>
            <p>PEDIDO: </p>
            <ul>
            ${detallePedido}
            </ul>
        `
    };
    const email = await sendEmail(emailOpciones);
    console.log(email);
}
export {viewOrdenesController, createOrdenController};