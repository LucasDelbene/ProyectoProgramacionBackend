//EJEMPLO 2 PROFILING (CLASE 32)//

//BASICAMENTE, PROFILING (EN ESPAÑOL ANALISIS DE RENDIMIENTO) ES LA INVESTIGACION DEL COMPORTAMIENTO DE UN PROGRAMA USANDO INFORMACION REUNIDA DESDE EL ANALISIS DINAMICO DEL MISMO. EL OBJETIVO ES AVERIGUAR EL TIEMPO DEDICADO A LA EJECUCION DE DIFERENTES PARTES DEL PROGRAMA PARA DETECTAR LOS PUNTOS PROBLEMATICOS y LAS AREAS DONDE SEA POSIBLE LLEVAR A CABO UNA OPTIMIZACION DEL RENDIMIENTO//

//IMPORTO crypto y express PARA PODER UTILIZARLOS//
import crypto from 'crypto';
import express from 'express';
const app = express();

const usuarios = {}
app.use(express.static('public'))

//CON LA RUTA '/traerUsuarios' SE MUESTRA EL LISTADO DE USUARIOS REGISTRADOS//
app.get('/traerUsuarios',(peticion,respuesta)=>{
    respuesta.json({usuarios})
})

//CON LA RUTA '/nuevoUsuario' SE REGISTRA UN NUEVO USUARIO//
app.get('/nuevoUsuario',(peticion,respuesta)=>{
    let nombreUsuario = peticion.query.nombreUsuario || '';
    const contraseña = peticion.query.contraseña || '';
    nombreUsuario = nombreUsuario.replace('');
    
    if(!nombreUsuario || !contraseña || usuarios[nombreUsuario]){
        return respuesta.sendStatus(400);
    }

    //UTILIZO EL MODULO crypto PARA ENCRIPTAR LAS CONTRASEÑAS//
    const salt = crypto.randomBytes(128).toString('base64');
    const hash = crypto.pbkdf2Sync(contraseña,salt,10000,512,'sha512');

    usuarios[nombreUsuario] = {salt,hash};
    respuesta.sendStatus(200);
})

//CON LA RUTA '/auth-bloq' SE REALIZA EL LOGIN DEL USUARIO. EN ESTE CASO, EL PROCESO POR EL CUAL SE REALIZA EL LOGIN ES SINCRONICO, POR LO TANTO ES UN PROCESO BLOQUEANTE//
app.get('/auth-bloq',(peticion,respuesta)=>{
    let nombreUsuario = peticion.query.nombreUsuario || '';
    const contraseña = peticion.query.contraseña || '';
    nombreUsuario = nombreUsuario.replace('');

    if(!nombreUsuario || !contraseña || !usuarios[nombreUsuario]){
        process.exit(1)
        // return respuesta.sendStatus(400); //
    }

    const {salt,hash} = usuarios[nombreUsuario];
    const encryptHash = crypto.pbkdf2Sync(contraseña,salt,10000,512,'sha512');

    if(crypto.timingSafeEqual(hash,encryptHash)){
        respuesta.sendStatus(200);
    }else{
        process.exit(1)
        // respuesta.sendStatus(401); //
    }
});

//CON LA RUTA '/auth-nobloq' TAMBIEN SE REALIZA EL LOGIN DEL USUARIO. EN ESTE CASO, EL PROCESO POR EL CUAL SE REALIZA EL LOGIN ES ASINCRONICO, POR LO TANTO ES UN PROCESO NO BLOQUEANTE//
app.get('/auth-nobloq',(peticion,respuesta)=>{
    let nombreUsuario = peticion.query.nombreUsuario || '';
    const contraseña = peticion.query.contraseña || '';
    nombreUsuario = nombreUsuario.replace('');

    if(!nombreUsuario || !contraseña || !usuarios[nombreUsuario]){
        process.exit(1)
        // return respuesta.sendStatus(400); //
    }

    crypto.pbkdf2(contraseña, usuarios[nombreUsuario].salt, 10000, 512, 'sha512', (error,hash)=>{
        if(usuarios[nombreUsuario].hash.toString() === hash.toString()){
            respuesta.sendStatus(200);
        }else{
            process.exit(1)
            // respuesta.sendStatus(401); //
        }
    })
})

//CONEXION AL SERVIDOR//
const PUERTO = parseInt(process.argv[2]) || 8080;
const servidor = app.listen(PUERTO,()=>{console.log(`Servidor escuchandose en http://localhost:${PUERTO}`)});
servidor.on('error',(error) => console.log(`Error en el Servidor ${error}`));