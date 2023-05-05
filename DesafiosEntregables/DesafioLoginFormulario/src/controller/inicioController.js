//CONTROLADOR INICIO//
const getDataInicio = (peticion, respuesta) => {
    const data = {
        title: "DESAFIO ENTREGABLE - LOGIN FORMULARIO",
        content: "EN ESTE SITIO WEB SE PODRA INGRESAR PRODUCTOS, LOGUEARSE y CHATEAR EN TIEMPO REAL"
    }
    return respuesta.render('index', data);
}

module.exports = {getDataInicio};
