//CONTROLLER DE VISTA GENERAL//

//FUNCION DE HOME// 
const homeController = (peticion,respuesta)=>{
    return respuesta.render('index');
}

//FUNCION DE SIGNUP//
const signupController = (peticion,respuesta)=>{
    return respuesta.render('signup');
}

//FUNCION DE BIENVENIDA//
const bienvenidaController = (peticion,respuesta)=>{
    const userLog = peticion.user;
    return respuesta.render('bienvenida', {userLog});
}

//FUNCION DE FORMULARIO DE PRODUCTOS//
const viewFormAddProductController = (peticion,respuesta)=>{
    return respuesta.render('formProductosAdmin');
}

//FUNCION DE VER ERROR//
const viewErrorController = (peticion,respuesta)=>{
    msgError = peticion.params.msg;
    return respuesta.render('viewError');
}

export {homeController, signupController, bienvenidaController, viewFormAddProductController, viewErrorController};