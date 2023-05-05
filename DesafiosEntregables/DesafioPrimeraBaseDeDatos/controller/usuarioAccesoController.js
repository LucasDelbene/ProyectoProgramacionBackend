const usuarioAcceso = (peticion, respuesta) => {
    const {nombreUsuario} = peticion.body;

    return respuesta.redirect(`/chat?nombreUsuario=${nombreUsuario}`);
};

module.exports = {usuarioAcceso};