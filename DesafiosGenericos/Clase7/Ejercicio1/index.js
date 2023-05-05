//DESAFIO GENERICO - GET ENDPOINTS//

//DADA UNA FRASE, TENGO QUE REALIZAR UN SERVIDOR CON API Rest USANDO node.js y express QUE CONTENGA LOS SIGUIENTES ENDPOINTS GET//

//REQUIERO express PARA PODER UTILIZARLO//
let express = require('express');
let app = express();

//CREO LA VARIABLE let CON UNA FRASE//
let frase = 'Gran parte del éxito esta en la mente. Debes creer que eres el mejor y asegurarte de que lo eres' 

//CREO LA RUTA RAIZ//
app.get('/', (peticion, respuesta, next)=>{
    respuesta.send('Bienvenidos al Desafio Generico de GET EndPoints')
})

//CREO LA RUTA FRASE, LA CUAL DEVUELVE LA FRASE EN FORMA COMPLETA EN UN CAMPO 'frase'//
app.get('/frase', (peticion, respuesta, next)=>{
    respuesta.json({frase});
})

//CREO LA RUTA LETRAS y NUM, LA CUAL DEVUELVE POR NUMERO DE ORDEN LA LETRA DENTRO DE ESA FRASE EN UN CAMPO 'letra'//
app.get("/letras/:num", (peticion, respuesta, next)=>{
    let {num} = peticion.params;
    if(!isNaN(num)){
        let fraseRuta = frase.split("");;
        let resultado = Number(num) > fraseRuta.length ? 'El numero excede el limite' : fraseRuta[Number(num) - 1];
        respuesta.send(`${resultado}`);
    }else{
        respuesta.send('Envie un numero, gracias')
    }
})

//CREO LA RUTA PALABRAS y NUM, LA CUAL DEVUELVE POR NUMERO DE ORDEN LA PALABRA DENTRO DE ESA FRASE EN UN CAMPO 'palabra'//
app.get('/palabras/:num', (peticion, respuesta, next)=>{
    let {num} = peticion.params;
    if(!isNaN(num)){
        let palabraRuta = frase.split(" ");;
        let resultado = Number(num) > palabraRuta.length ? 'El numero excede el limite' : palabraRuta[Number(num) - 1];
        respuesta.send(`${resultado}`);
    }else{
        respuesta.send('Envia un numero, gracias')
    }
})

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO, ()=> console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));