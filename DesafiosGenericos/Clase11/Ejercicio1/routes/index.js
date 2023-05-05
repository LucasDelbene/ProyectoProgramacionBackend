module.exports = app=>{
    app.get('/', (peticion, respuesta, next)=>{
        respuesta.render('index', {respuesta:'Bienvenidos a mi primer Servidor con WebSocket'})
    })
}