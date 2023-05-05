const socket = io();

//USO getElementById LA CUAL DEVUELVE UNA REFERENCIA AL ELEMENTO POR SU ID//
const tbodyProductos = document.getElementById('tbodyProductos');
const nombreFormulario = document.getElementById('nombreFormulario');
const precioFormulario = document.getElementById('precioFormulario');
const imagenFormulario = document.getElementById('imagenFormulario');
const agregarProducto = document.getElementById('enviarMensaje');

//PEDIDO DE PRODUCTOS DESDE EL USUARIO//
socket.emit('enviarProducto');

//ENVIO NUEVO PRODUCTO DESDE EL USUARIO AL SERVIDOR//
agregarProducto.addEventListener('click', () => {
    const producto = {
        nombre: nombreFormulario.value,
        precio: precioFormulario.value,
        imagen: imagenFormulario.value
    }

    nombreFormulario.value = "";
    precioFormulario.value = "";
    imagenFormulario.value = "";

    socket.emit('agregarProductos', producto);
});


//ENVIO LOS DATOS PARA AGREGAR A LA TABLA DESDE EL SERVIDOR AL USUARIO//
socket.on('actualizarTabla', data => {
    producto = `
        <tr>
            <th scope="row">
                ${data[0].id}
            </th>
            <td>
                ${data[0].nombre}
            </td>
            <td>
                ${data[0].precio} 
            </td>
            <td>
                <img src="${data[0].imagen}" width="60" height="60">
            </td>
        </tr>
    `;
    tbodyProductos.innerHTML += producto;
});

//ENVIA TODOS LOS PRODUCTOS DESDE EL SERVIDOR AL USUARIO//
socket.on('todosLosProductos', data => {

    data.forEach(producto => {
        producto = `
            <tr>
                <th scope="row">
                    ${producto.id}
                </th>
                <td>
                    ${producto.nombre}
                </td>
                <td>
                    ${producto.precio} 
                </td>
                <td>
                    <img src="${producto.imagen}" width="60" height="60">
                </td>
            </tr>
        `;
        tbodyProductos.innerHTML += producto;
    });
});
