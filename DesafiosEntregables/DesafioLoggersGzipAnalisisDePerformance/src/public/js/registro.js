//UTILIZO document.getElementById() PARA LLAMAR AL ID DE 'registroFormulario'//
const formularioRegistro  = document.getElementById('registroFormulario');

formularioRegistro.addEventListener('submit',event=>{
    event.preventDefault();
    const data = new FormData(formularioRegistro);
    const objeto = {};
    data.forEach((value,key)=>objeto[key]=value);

    fetch('/api/sessions/registro',{
        method:'POST',
        body:JSON.stringify(objeto),
        headers: {
            'Content-Type':'application/json'
        }
    }).then(resultado=>resultado.json()).then(json=>console.log(json));
})