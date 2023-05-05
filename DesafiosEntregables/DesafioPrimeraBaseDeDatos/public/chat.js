const socket = io();

//USO getElementById LA CUAL DEVUELVE UNA REFERENCIA AL ELEMENTO POR SU ID//
const notificacionServer = document.getElementById('notificacionServer');
const listaUsuarios = document.getElementById('listaUsuarios');
const enviarMensaje = document.getElementById('enviarMensaje');
const mensajeInput = document.getElementById('mensajeInput');
const mensajesContenedor = document.getElementById('mensajesContenedor');

//OBTENGO EL NOMBRE DE USUARIO DE LOS QUERY PARAMS: ?nombreUsuario=nombreIngresado//   
const {nombreUsuario} = Qs.parse(window.location.search, {
    ignoreQueryPrefix: true
});

//EL USUARIO LE ENVIA AL SERVIDOR EL NOMBRE DEL USUARIO//
socket.emit('unirseChat', {nombreUsuario});

//EL SERVIDOR ENVIA NOTIFICACION AL USUARIO//
socket.on('notificacion', data => {
    notificacionServer.innerHTML = data;
});

//EL SERVIDOR ENVIA TODOS LOS MENSAJES AL USUARIO QUE SE CONECTA//
socket.on('todosLosMensajes', data => {
    const mensaje = "";
    data.forEach(mensaje => {
        mensaje = `
            <li class="clearfix">
            <div class="message-data text-right">
                    <span class="message-data-time"> ${mensaje.tiempo}, ${mensaje.usuario.nombreUsuario}:</span>
                </div>
                <div class="message other-message float-right"> ${mensaje.texto} </div>
            </li>
        `;
        mensajesContenedor.innerHTML += mensaje;
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
                        <div class="status"> <i class="fa fa-circle online"></i> ONLINE </div>
                    </div>
                </li>
            `;
            return usuarioTemplate;
        })
        .join(``);

    listaUsuarios.innerHTML = usuarios;
});

//EJECUTO UN EVENTO QUE ENVIA EL MENSAJE ESCRITO POR EL USUARIO//
enviarMensaje.addEventListener('click', () => {
    socket.emit('mensajeInput', mensajeInput.value);
    mensajeInput.value = "";
});

//MENSAJE DESDE EL SERVIDOR AL USUARIO//
socket.on('mensaje', data => {
    const mensaje = `
        <li class="clearfix">
        <div class="message-data text-right">
                <span class="message-data-time"> ${data.tiempo}, ${data.usuario.nombreUsuario}:</span>
            </div>
            <div class="message other-message float-right"> ${data.texto} </div>
        </li>
    `
    mensajesContenedor.innerHTML += mensaje;
});