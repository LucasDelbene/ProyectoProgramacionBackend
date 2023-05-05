//REQUIERO socket.io PARA PODER UTILIZARLO//
const {Server: SocketIO} = require('socket.io');

class Socket{
    static instancia;
    constructor(http){
        if(Socket.instancia){
            return Socket.instancia;
        }
        Socket.instancia = this;
        this.io = new SocketIO(http);
        this.mensajes = "";
    }

    //EMPIEZO A CREAR EL INICIALIZADOR//
    init(){
        try{
            this.io.on('connection', socket =>{
                this.io.sockets.emit('llenarParrafo', this.mensajes); 
                console.log('Nuevo Cliente Conectado'); //CON CADA CONEXION DE CLIENTE, EL SERVIDOR EMITE POR CONSOLA ESTE MENSAJE//
                socket.emit('init', socket.id);

                socket.on('keyup', data =>{
                    this.mensajes = data;                  
                    this.io.sockets.emit('llenarParrafo', data); 
                });
            }) 
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = Socket;