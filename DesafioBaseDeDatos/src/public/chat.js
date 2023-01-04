const socket = io();

const spanServerMensaje = document.getElementById('serverNotificacion');
const listaDeUsuarios = document.getElementById('listaDeUsuarios');
const enviarMensajes = document.getElementById('enviarMensaje');
const mensajesInput = document.getElementById('mensajeInput');
const mensajesContainer = document.getElementById('mensajesContainer');

//OBTENEMOS EL NOMBRE DE USUARIO DE LOS QUERY PARAMS//
const {nombreUsuario} = Qs.parse(window.location.search, {
    ignoreQueryPrefix: true
});

//EL CLIENTE LE ENVIA AL SERVIDOR EL NOMBRE DEL USUARIO//
socket.emit('unirseAlChat', {nombreUsuario});

//EL SERVIDOR ENVIA LA NOTIFICACION//
socket.on('notificacion', data => {
    spanServerMensaje.innerHTML = data;
});

//EL SERVIDOR ENVIA TODOS LOS MENSAJES AL USUARIO QUE SE CONECTO//
socket.on('todosLosMensajes', data => {
    const mensaje = "";
    data.forEach(mensaje => {
        mensaje = `
            <li class="clearfix">
            <div class="message-data text-right">
                    <span class="message-data-time"> ${mensaje.time}, ${mensaje.email}:</span>
                </div>
                <div class="message other-message float-right"> ${mensaje.text} </div>
            </li>
        `;
        mensajesContainer.innerHTML += mensaje;
    })
});

//EL SERVIDOR ENVIA LA LISTA ACTUALIZADA DE USUARIOS//
socket.on('usuarios', data => {

    const usuarios = data
        .map(usuario => {
            const usuarioTemplate = `
                <li class="clearfix">
                    <img src=${usuario.avatar} alt="avatar">
                    <div class="about">
                        <div class="name"> ${usuario.nombreUsuario}</div>
                        <div class="status"> <i class="fa fa-circle online"></i> Online </div>
                    </div>
                </li>
            `;
            return usuarioTemplate;
        })
        .join(``);

    listaDeUsuarios.innerHTML = usuarios;
});

//EJECUTO UN EVENTO QUE ENVIA EL MENSAJE ESCRITO POR EL USUARIO//
enviarMensajes.addEventListener('click', () => {
    socket.emit('mensajeInput', mensajesInput.value);
    mensajesInput.value = "";
});


//SERVIDOR --> CLIENTE//
socket.on('mensaje', data => {
    const mensaje = `
        <li class="clearfix">
        <div class="message-data text-right">
                <span class="message-data-time"> ${data.time}, ${data.email}:</span>
            </div>
            <div class="message other-message float-right"> ${data.text} </div>
        </li>
    `
    mensajesContainer.innerHTML += mensaje;
});