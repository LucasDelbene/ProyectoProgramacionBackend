//UTILIZO document.getElementById() PARA LLAMAR AL ID DE 'loginFormulario'//
const formularioLogin  = document.getElementById('loginFormulario');

formularioLogin.addEventListener('submit',event=>{
    event.preventDefault();
    const data = new FormData(formularioLogin);
    const objeto = {};
    data.forEach((value,key)=>objeto[key]=value);

    fetch('/api/sessions/login',{
        method:'POST',
        body:JSON.stringify(objeto),
        headers: {
            'Content-Type':'application/json'
        }
    }).then(resultado=>resultado.json()).then(json=>console.log(json));
})