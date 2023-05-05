//IMPORTO express-session y express PARA PODER UTILIZARLOS//
import session from 'express-session';
import express from 'express';
const app = express();

//DECLARO ESTO PARA QUE NUESTRO SERVIDOR INTERPRETE DE FORMA AUTOMATICA MENSAJES DE TIPO JSON EN FORMATO urlencoded AL RECIBIRLOS//
app.use(express.json());

//COLOCO A session COMO MIDDLEWARE//
app.use(session({
    secret:'CodigoSecretoQueSoloLoPuedoVerYo', //SIRVE PARA FIRMAR LAS Cookies ENVIADAS y PARA ANALIZAR LAS RECIBIDAS
    resave: true,                              //CON CADA CONSULTA QUE SE VAYA REALIZANDO, SE VA REACTUALIZANDO LA SESION
    saveUninitialized: true,                   //AUNQUE EL USUARIO NO HAYA PROPORCIONADO NADA DE INFO, LO GUARDA COMO REFERENCIA PARA QUE EN ALGUN MOMENTO YO PUEDA LLENARLO DE INFO, SIEMPRE y CUANDO EL USUARIO QUIERA BRINDAR ESA INFO
}));

//CREO LA RUTA DE acceso//
app.get('/acceso', (peticion, respuesta)=>{
    //ESTAS DOS VARIABLES SON LAS QUE NOS ENVIO EL USUARIO//
    const email = "lucasdelbene@gmail.com";
    const contraseña = "123";

    //VALIDANDO AL USUARIO//
    if(email=="lucasdelbene@gmail.com" && contraseña=="123"){
        //LO LOGRO, AHORA VAMOS A GENERARLE UNA SESION//
        //SUPONGAMOS QUE OBTUVE AL USUARIO DE LA BASE DE DATOS//
        const usuarioDB = { 
            nombre: "Lucas",
            email: "lucasdelbene@gmail.com",
            contraseña: "123",
            rol: "estudiante",
        }

        //NUNCA DEBEMOS AGREGAR DATOS SENSIBLES (COMO POR EJEMPLO LA CONTRASEÑA)//
        peticion.session.usuario = {
            nombreUsuario: usuarioDB.nombre,
            email: usuarioDB.email,
            rol: usuarioDB.rol,
        };
        respuesta.send({estado:'Exitoso', mensaje:'Te has Logueado con Exito!'})
    }else{
        return respuesta.status(400).send({estado:'ERROR', mensaje:'Credenciales Incorrectas'})
    }
});

//CREO LA RUTA current LA CUAL NOS TRAE SIEMPRE AL USUARIO QUE LOGUEADO ACTUALMENTE//
app.get('/current', (peticion, respuesta)=>{
    console.log(peticion.session);
    respuesta.send(peticion.session.usuario)
})

//CREO UN MIDDLEWARE PARA VALIDAR UN ESTUDIANTE//
const validacionEstudiante = (peticion,respuesta,next)=>{
    //VALIDO SI LA SESION DEL USUARIO EXISTE o NO//
    if(!peticion.session.usuario) return respuesta.status(401).send({estado:'ERROR', mensaje:'Usuario no Logueado'})

    //VALIDO SI TIENE EL ROL DE ESTUDIANTE o NO//
    if(!peticion.session.usuario.rol!=="estudiante") return respuesta.status(403).send({estado:'ERROR', mensaje:'No Cumples con los Permisos Solicitados'})
    next();
}

//CREO LA RUTA panelEstudiantes//
app.get('/panelEstudiante', validacionEstudiante, (peticion, respuesta)=>{
    respuesta.send({estado:'ERROR', mensaje:`Bienvenido ${peticion.session.usuario.nombreUsuario}`})
})

//CREO LA RUTA PARA CERRAR LA SESION//
app.get('/cerrarSesion',(peticion,respuesta)=>{
    peticion.session.destroy(error=>{
        if(error) return res.status(500).send({estado:"ERROR",mansaje:"No se ha podido Cerrar la Sesion"})
    })
    respuesta.send({estado:"Exitoso",mensaje:"Sesion cerrada con Exito"})
})

//CONEXION AL SERVIDOR//
const PUERTO = process.env.PUERTO || 8080;
app.listen(PUERTO, ()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));