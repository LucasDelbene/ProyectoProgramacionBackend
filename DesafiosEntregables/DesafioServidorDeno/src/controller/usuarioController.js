//CONTROLLER DE USUARIO//

const formularioRegistroController = (peticion,respuesta)=> respuesta.render('registro');
const formularioLoginController = (peticion,respuesta)=> respuesta.render('loginSession');

//FUNCION PARA CERRAR SESION//
const cerrarSesion = (peticion,respuesta)=>{
    if(peticion.usuario){
        usuarioCerrarSesion = peticion.usuario.username;
        respuesta.render('cerrarSesion', {usuarioCerrarSesion});
        peticion.session.destroy(error=>{
            if(!error){
                console.log('TODO PERFECTO');
            }else{
                console.log('ERROR');
            }
        });
    }
}

//FUNCION PARA EL PERFIL DEL USUARIO//
const perfilUsuario = (peticion,respuesta)=>{
    usuarioLogueado = peticion.usuario;
    respuesta.render('perfilUsuario', {usuarioLogueado})
};

export default {formularioRegistroController, formularioLoginController, cerrarSesion, perfilUsuario};

