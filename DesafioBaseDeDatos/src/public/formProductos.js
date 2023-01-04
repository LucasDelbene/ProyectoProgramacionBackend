const socket = io();

const bodyProductos = document.getElementById('bodyProductos');
const nombreFormulario = document.getElementById('nombreFormulario');
const precioFormulario = document.getElementById('precioFormulario');
const imagenFormulario = document.getElementById('imagenFormulario');
const agregarProducto = document.getElementById('enviarMensaje');

//PEDIDO DE PRODUCTOS DESDE EL CLIENTE//
socket.emit('enviarProducto');

//EL CLIENTE ENVIA UN NUEVO PRODUCTO//
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

//EL SERVIDOR ENVIA LOS DATOS PARA AGREGAR A LA TABLA//
socket.on('actualizarTabla', data => {
    producto = `
        <tr>
            <th scope="row">
                ${data[0].id}
            </th>
            <td>
                ${data[0].title}
            </td>
            <td>
                ${data[0].precio} 
            </td>
            <td>
                <img src="${data[0].imagen}" width="60" height="60">
            </td>
        </tr>
    `;
    bodyProductos.innerHTML += producto;
});

//EL SERVIDOR ENVIA TODOS LOS PRODUCTOS//
socket.on('todosLosProductos', data => {

    data.forEach(producto => {
        producto = `
            <tr>
                <th scope="row">
                    ${producto.id}
                </th>
                <td>
                    ${producto.title}
                </td>
                <td>
                    ${producto.precio} 
                </td>
                <td>
                    <img src="${producto.imagen}" width="60" height="60">
                </td>
            </tr>
        `;
        bodyProductos.innerHTML += producto;
    });
});
