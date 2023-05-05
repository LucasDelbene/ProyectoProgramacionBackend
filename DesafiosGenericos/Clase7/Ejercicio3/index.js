//DESAFIO GENERICO - SERVIDOR CON get, post, put y delete//

//CONSIDERANDO LA FRASE 'Frase inicial', REALICE UNA APLICACION DE SERVIDOR node.js CON express QUE INCORPORA LAS RUTAS post y put//

//REQUIERO express PARA PODER UTILIZARLO//
let express = require('express');
let app = express();

//DECLARO ESTO PARA QUE NUESTRO SERVIDOR INTERPRETE DE FORMA AUTOMATICA MENSAJES DE TIPO JSON EN FORMATO urlencoded AL RECIBIRLOS//
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//CREO LA VARIABLE let CON LA FRASE//
let frase = 'Frase inicial';

//CREO LA RUTA RAIZ//
app.get('/', (peticion, respuesta, next)=>{
    respuesta.send('Bienvenidos al Desafio Generico de Servidor con get, post, put y delete')
})

//CREO LA RUTA FRASE, LA CUAL DEVUELVE LA FRASE EN FORMA COMPLETA EN UN CAMPO 'frase'//
app.get('/frase', (peticion, respuesta, next)=>{
    respuesta.json({frase});
})

//CREO LA RUTA CON post, LA CUAL RECIBE UN OBJETO CON UNA PALABRA BAJO EL CAMPO 'palabra' Y LA AGREGA AL FINAL DE LA FRASE. TAMBIEN DEVUELVE UN OBJETO QUE COMO CAMPO 'agregada' CONTENGA LA PALABRA AGREGADA y EN EL CAMPO 'pos' LA POSICION EN QUE SE AGREGO DICHA PALABRA//
app.post('/api/palabras', (peticion, respuesta, next)=>{
    let {palabra} = peticion.body;
    let fraseRuta = frase.split(" ");
    fraseRuta.push(palabra);

    respuesta.json({
        posicion: fraseRuta.length,  //CAMPO 'posicion'
        agregada: palabra,           //CAMPO 'agregada'
        array: fraseRuta             //CAMPO 'array'
    });
})

//CREO LA RUTA CON put, LA CUAL RECIBE UN OBJETO CON UNA PALABRA BAJO EL CAMPO 'palabra' Y REEMPLAZA EN LA FRASE AQUELLA HALLADA EN LA POSICION DADA. TAMBIEN DEVUELVE UN OBJETO QUE COMO CAMPO 'actualizada' CONTENGA LA NUEVA PALABRA y EN EL CAMPO 'anterior' LA ANTERIOR//
app.put('/api/palabras/:pos', (peticion, respuesta, next)=>{
    let {palabra} = peticion.body;
    let {pos} = peticion.params;

    let posicionArray = Number(pos) - 1
    let fraseRuta = frase.split(" ");
    let anterior = fraseRuta[posicionArray];
    fraseRuta = fraseRuta.splice(posicionArray, 1, palabra);

    respuesta.json({
        anterior,                     //CAMPO 'anterior'
        actualizada: palabra,         //CAMPO 'actualizada'
        array: fraseRuta              //CAMPO 'array'
    });
})

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO, ()=> console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));