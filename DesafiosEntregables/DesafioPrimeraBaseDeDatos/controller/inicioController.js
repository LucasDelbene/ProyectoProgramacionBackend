const getDataInicio = (peticion, respuesta) => {
    const data = {
        title: "DESAFIO ENTREGABLE - NUESTRA PRIMERA BASE DE DATOS",
        content: "EN ESTE SITIO WEB SE PODRA INGRESAR PRODUCTOS y CHATEAR EN TIEMPO REAL"
    }
    return respuesta.render('index', data);
}

module.exports = {getDataInicio};
