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
  console.log('Boton enviar presionado')
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
socket.on('connect', () => {
  console.warn('Conectado al servidor');
});
socket.on('update_products', products => {
  fetch('http://localhost:8080/views/products-render.hbs')
    .then(response => {
      return response.text()
    })
    .then(plantilla => {
      let template = Handlebars.compile(plantilla);
      let html = template({products})
      document.getElementById('productos').innerHTML = html;
    })
})
socket.on('update_messages', messages => {
  fetch('http://localhost:8080/views/messages-render.hbs')
    .then(response => {
      return response.text()
    })
    .then(plantilla => {
      let template = Handlebars.compile(plantilla);
      let html = template({messages});
      document.getElementById('messageDisplay').innerHTML = html;
    })
})