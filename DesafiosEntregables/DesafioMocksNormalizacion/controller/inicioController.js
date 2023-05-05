//CONTROLADOR INICIO//
const getDataInicio = (peticion, respuesta) => {
    const data = {
        title: "DESAFIO ENTREGABLE - MOCKS y NORMALIZACION",
        content: "EN ESTE SITIO WEB SE PODRA INGRESAR PRODUCTOS y CHATEAR EN TIEMPO REAL"
    }
    return respuesta.render('index', data);
}

module.exports = {getDataInicio};
