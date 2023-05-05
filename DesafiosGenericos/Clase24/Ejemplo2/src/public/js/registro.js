//UTILIZO getElementById PARA PODER USAR EL ID registroFormulario//
const formulario = document.getElementById('registroFormulario');

//INDICO UN addEventListener DE submit//
formulario.addEventListener('submit', event=>{
    event.preventDefault();                         //LLAMO A preventDefault() DURANTE LA EJECUCION, PARA CANCELAR EL EVENTO
    const data = new FormData(formulario);          //ARMO UN FormData() A PARTIR DEL FORMULARIO
    const objeto = {};                              //UNA VEZ CONSTRUIDO EL FormData() QUE VOY A ENVIAR, LO PASO A FORMATO OBJETO
    data.forEach((value,key) => objeto [key]=value) //PARA CADA UNO DE LOS value key QUE SE ENCUENTREN EN EL FORMULARIO, CONSTRUYO UN OBJETO VACIO, LUEGO LE DIGO QUE TOME EL name="" DEL FORMULARIO y ESE VA A SER LA key DEL OBJETO, EN DONDE A ESA key LE PONGO EL VALOR DEL INPUT  
    
    fetch('/api/sessions/registro', {               //HAGO UN fetch() e INDICO LO SIGUIENTE EN LA RUTA '/api/sessions/registro'
        method: 'POST',                             //QUIERO ENVIAR UNA PETICION CON METODO POST 
        body: JSON.stringify(objeto),               //EN EL CUERPO DE LA PETICION VOY A MANDAR EL FORMULARIO PERO YA STRINGUIFICADO
        headers:{                                   //INDICO EN LOS HEADERS, QUE EL TIPO DE CONTENIDO QUE VOY A ENVIARLE AL SERVIDOR ES UN application/json
            'Content-Type':'application/json'
        }
    }).then(resultado => resultado.json()).then(json => console.log(json)); //AL FINAL DE CUENTAS, fetch() VA A HACER UNA PROMESA, EN DONDE LA VOY A CONECTAR CON UN .then() y AL RESULTADO LO CONVIERTO EN JSON. LA CONVERSION DE JSON, AL FINAL DE CUENTAS LA VOY A DEVOLVER OTRA VEZ POR LO TANTO TENGO QUE CONECTAR CON UN SEGUNDO .then() y A DICHO JSON LO MUESTRO POR CONSOLA
})

 