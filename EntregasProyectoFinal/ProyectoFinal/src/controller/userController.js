//CONTROLLER DE USUARIO//

//FUNCION CONTROLLER DEL FORMULARIO DE SIGNUP//
const signupFormController = (peticion,respuesta) => respuesta.render('signup');

//FUNCION CONTROLLER DEL FORMULARIO DE LOGIN//
const loginFormController = (peticion,respuesta) => respuesta.render('loginSession');

//FUNCION CONTROLLER DE LOGOUT//
const logoutController = (peticion,respuesta)=>{
    if(peticion.user){
        const userLogout = peticion.user.username;
        respuesta.render('logout', {userLogout});
        peticion.session.destroy(error=>{
            if(!error){
                console.log('TODO PERFECTO');
            }else{
                console.log('ERROR');
            }
        });
    }
}

//FUNCION CONTROLLER DE PERFIL//
const profileController = (peticion,respuesta)=>{
    const userLog = peticion.user;
    respuesta.render('profile', {userLog})
};

export {signupFormController, loginFormController, logoutController, profileController};