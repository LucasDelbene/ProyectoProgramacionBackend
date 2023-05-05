//CONTROLLER DE VISTA GENERAL//

//FUNCION PARA EL INICIO//
const inicioController = (peticion,respuesta)=>{
    return respuesta.render('index');
}

//FUNCION PARA EL REGISTRO//
const registroController = (peticion,respuesta)=>{
    return respuesta.render('registro');
}

//FUNCION PARA LA BIENVENIDA//
const bienvenidaController = (peticion,respuesta)=>{
    usuarioLogueado = peticion.usuario;
    return respuesta.render('bienvenida', {usuarioLogueado});
}

//FUNCION PARA LA VISTA DEL FORMULARIO PARA AGREGAR PRODUCTO//
const formularioAgregarProductoController = (peticion,respuesta)=>{
    return respuesta.render('formularioProductosAdmin');
}

//FUNCION PARA VER LOS ERRORES//
const verErrorController = (peticion,respuesta)=>{
    mensajeError = peticion.params.msg;
    return respuesta.render('verError');
}

export default {inicioController, registroController, bienvenidaController, formularioAgregarProductoController, verErrorController};