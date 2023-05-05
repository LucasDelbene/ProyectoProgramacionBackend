//IMPORTO cookie-parser y express PARA PODER UTILIZARLOS//
import cookieParser from 'cookie-parser';  
import express from 'express';
const app = express();

//DECLARO ESTO PARA QUE NUESTRO SERVIDOR INTERPRETE DE FORMA AUTOMATICA MENSAJES DE TIPO JSON EN FORMATO urlencoded AL RECIBIRLOS//
app.use(express.json());

//COLOCO A cookie-parser COMO MIDDLEWARE//
app.use(cookieParser('Cookie Secreta'));

//SETEO UN ENDPOINT QUE PERMITA COLOCAR DICHA COOKIE//
app.get('/acceso', (peticion,respuesta)=>{
    respuesta.cookie('Bienvenidos a mi primer Cookie', {nombre:'Lucas', role:'usuario'},{
        maxAge: 100000
    }).send({estado:'Exitoso', mensaje:'Primer Cookie Seteada'})
})

//SETEO OTRO ENDPOINT DE accesoEspia//
app.get('/accesoEspia', (peticion,respuesta)=>{
    respuesta.cookie('Cookie Espia', {nombre:'Lucas', role:'usuario'},{
        signed: true,  //AGARRA EL VALOR DE LA Cookie y LO CIFRA DE MANERA INTERNA//
        maxAge: 100000
    }).send({estado:'Exitoso', mensaje:'Cookie Espia Seteada'})
})  

//SETEO OTRO ENDPOINT DE visita//
app.get('/visita', (peticion,respuesta)=>{
    const cookie = peticion.signedCookies['Cookie Espia'];
    if(!cookie){
        //Si no existe esa Cookie, significa que no esta logueado//
        return respuesta.status(401).send({estado:'ERROR', mensaje:'Primero debes loguearte para poder acceder'})
    }
    console.log(cookie);
    respuesta.send('Test de Visita a Cookie')
}) 

//SETEO OTRO ENDPOINT QUE ME PERMITA BORRAR LA Cookie //
app.get('/cerrarSesion', (peticion,respuesta)=>{
    //clearCookie() LIMPIA LA Cookie DEL NAVEGADOR//
    respuesta.clearCookie('Cookie Espia').send({estado:'Exitoso', mensaje:'Sesion Cerrada con Exito'})
}) 

//CONEXION AL SERVIDOR//
const PUERTO = process.env.PUERTO || 8080;
app.listen(PUERTO, ()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));