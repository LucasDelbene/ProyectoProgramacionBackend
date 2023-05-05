//CONTROLADOR INICIO//
const getDataInicio = (peticion, respuesta) => {
    const data = {
        title: "DESAFIO ENTREGABLE - INICIO DE SESION",
        content: "EN ESTE SITIO WEB SE PODRA INGRESAR PRODUCTOS, LOGUEARSE y CHATEAR EN TIEMPO REAL"
    }
    return respuesta.render('index', data);
}

module.exports = {getDataInicio};
