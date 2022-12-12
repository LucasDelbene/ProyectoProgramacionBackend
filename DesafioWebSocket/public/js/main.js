const socket = io();

const newProduct = document.getElementById('newProduct')
newProduct.addEventListener('submit', event => {
  event.preventDefault()
  let id = document.getElementById('id').value
  let nombre = document.getElementById('nombre').value
  let precio = document.getElementById('precio').value
  let imagen = document.getElementById('imagen').value
  console.log(`${nombre}, #${id}, $${precio}, ${imagen}`)
  socket.emit('new_product', {
    id : id,
    nombre : nombre,
    precio : precio,
    imagen : imagen
  })
  newProduct.reset();
})

const messageForm = document.getElementById('messageForm');
messageForm.addEventListener('submit', event => {
  event.preventDefault()
  console.log('BOTON DE ENVIAR PRESIONADO')
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+"  "+today.getHours() + ":" + today.getMinutes()
  let mail = document.getElementById('email').value
  let text = document.getElementById('text').value
  socket.emit('new_message', {
    date : date,
    mail : mail,
    text : text
  })
  messageForm.reset();
})

//CONEXION DE UN USUARIO//
socket.on('connect', () => {
  console.warn('USUARIO CONECTADO');
});

//ACTUALIZACION DE PRODUCTOS//
socket.on('update_products', productos => {
  fetch('http://localhost:8080/views/productos.hbs')
    .then(response => {
      return response.text()
    })
    .then(plantilla => {
      let template = Handlebars.compile(plantilla);
      let html = template({productos})
      document.getElementById('productos').innerHTML = html;
    })
})

//ACTUALIZACION DE MENSAJES//
socket.on('update_messages', messages => {
  fetch('http://localhost:8080/views/mensajes.hbs')
    .then(response => {
      return response.text()
    })
    .then(plantilla => {
      let template = Handlebars.compile(plantilla);
      let html = template({messages});
      document.getElementById('messageDisplay').innerHTML = html;
    })
})