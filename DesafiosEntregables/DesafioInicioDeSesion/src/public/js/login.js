//UTILIZO document.getElementById() PARA LLAMAR AL ID DE 'loginFormulario'//
const formularioLogin  = document.getElementById('loginFormulario');

formularioLogin.addEventListener('submit',event=>{
    event.preventDefault();
    const data = new FormData(formularioLogin);
    const objeto = {};
    data.forEach((value,key)=>objeto[key]=value);

    fetch('/api/sessions/logintoken',{
        method:'POST',
        body:JSON.stringify(objeto),
        headers: {
            'Content-Type':'application/json'
        }
    }).then(resultado=>resultado.json()).then(json=>{
        //SI EL ESTADO DEL JSON ES EXITOSO, PRIMERO LO CONSOLOGUEO, LUEGO COLOCO localStorage.setItem() y DENTRO PONGO EL 'authToken' LA CUAL VA A SER EL json.token//
        if(json.status === 'EXITOSO'){
            console.log(json);
            localStorage.setItem('authToken', json.token)
        } 
    });
})