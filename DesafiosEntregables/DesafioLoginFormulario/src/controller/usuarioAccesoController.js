//CONTROLADOR USUARIO LOGIN//
const usuarioAcceso = (peticion, respuesta) => {
    const {nombreUsuario} = respuesta.body;

    return respuesta.redirect(`/chat?nombreUsuario=${nombreUsuario}`);
};

module.exports = {usuarioAcceso};