//DESAFIO GENERICO - OPERACIONES CON EL SERVIDOR//

//DESARROLLARE UN SERVIDOR QUE PERMITA REALIZAR LA SUMA ENTRE DOS NUMEROS UTILIZANDO TRES RUTAS//

//REQUIERO express PARA PODER UTILIZARLO//
let express = require('express');
let app = express();

//DECLARO ESTO PARA QUE NUESTRO SERVIDOR INTERPRETE DE FORMA AUTOMATICA MENSAJES DE TIPO JSON EN FORMATO urlencoded AL RECIBIRLOS//
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//CREO LA RUTA RAIZ//
app.get('/', (peticion, respuesta, next)=>{
    respuesta.send('Bienvenidos al Desafio Generico de Operaciones con el Servidor')
})

//CREO LAS RUTAS DE SUMAS//
app.get('/suma/:a/:b', (peticion, respuesta, next)=>{
    let {a,b} = peticion.params;
    let suma = Number(a) + Number(b);
    respuesta.json({suma});
})

app.get('/suma', (peticion, respuesta, next)=>{
    let {a,b} = peticion.query;
    let suma = Number(a) + Number(b);
    respuesta.json({suma});
})

//CREO LA RUTA DE OPERACION//
app.get('/operacion/:op', (peticion, respuesta, next)=>{
    let {op} = peticion.params;
    let numeros = op.split("+");
    let suma = Number(numeros[0]) + Number(numeros[1] );
    respuesta.json({suma});
})

//CREO LAS RUTAS PARA PROBAR get, post, put y delete//
app.get('/prueba', (peticion, respuesta, next)=>{respuesta.send(`Respuesta desde ${peticion.method}`)});
app.post('/prueba', (peticion, respuesta, next)=>{respuesta.send(`Respuesta desde ${peticion.method}`)});
app.put('/prueba', (peticion, respuesta, next)=>{respuesta.send(`Respuesta desde ${peticion.method}`)});
app.delete('/prueba', (peticion, respuesta, next)=>{respuesta.send(`Respuesta desde ${peticion.method}`)});

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO, ()=> console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));