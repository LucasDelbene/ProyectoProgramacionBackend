//ANALISIS COMPLETO DE PERFORMANCE//

//IMPORTO crypto y express PARA PODER UTILIZARLOS//
import crypto from 'crypto';
import express from 'express';
const app = express();

const usuarios = {}
app.use(express.static('public'));

//RUTAS DE EJEMPLO PARA EL DESAFIO DE LA CLASE 32//
app.get('/TraerUsuarios',(peticion,respuesta)=>{
    respuesta.json({usuarios});
})
app.get('/NuevoUsuario',(peticion,respuesta)=>{
    let nombreUsuario = peticion.query.nombreUsuario || "";
    const contraseña = peticion.query.contraseña || "";
    nombreUsuario = nombreUsuario.replace("");

    if(!nombreUsuario || !contraseña || usuarios[nombreUsuario]){
        return respuesta.sendStatus(400);
    }

    const salt = crypto.randomBytes(128).toString("base64");
    const hash = crypto.pbkdf2Sync(contraseña,salt,10000,512,"sha512");

    usuarios[nombreUsuario] = {salt,hash};
    respuesta.sendStatus(200);
})
app.get('/ConConsoleLog',(peticion,respuesta)=>{
    let nombreUsuario = peticion.query.nombreUsuario || "";
    const contraseña = peticion.query.contraseña || "";
    nombreUsuario = nombreUsuario.replace("");

    if(!nombreUsuario || !contraseña || !usuarios[nombreUsuario]){
        process.exit(1)
        // return respuesta.sendStatus(400) //
    }

    const {salt,hash} = usuarios[nombreUsuario];
    const encryptHash = crypto.pbkdf2Sync(contraseña,salt,10000,512,"sha512");

    if(crypto.timingSafeEqual(hash,encryptHash)){
        respuesta.sendStatus(200);
    }else{
        process.exit(1);
        // return respuesta.sendStatus(401) //
    }
})
app.get('/SinConsoleLog',(peticion,respuesta)=>{
    let nombreUsuario = peticion.query.nombreUsuario || "";
    const contraseña = peticion.query.contraseña || "";
    nombreUsuario = nombreUsuario.replace("");

    if(!nombreUsuario || !contraseña || !usuarios[nombreUsuario]){
        process.exit(1)
        // return respuesta.sendStatus(400) //
    }
    
    crypto.pbkdf2(contraseña, usuarios[nombreUsuario].salt, 10000, 512, "sha512", (error,hash)=>{
        if(usuarios[nombreUsuario].hash.toString() === hash.toString()){
            respuesta.sendStatus(200);
        }else{
            process.exit(1);
            // return respuesta.sendStatus(401) //
        }
    });
})

//CONEXION AL SERVIDOR//
const PUERTO = parseInt(process.argv[2]) || 8080;
const servidor = app.listen(PUERTO,()=>{console.log(`Servidor escuchandose en http://localhost:${PUERTO}`)});
servidor.on('error',(error)=>console.log(`Error en el Servidor: ${error}`));

