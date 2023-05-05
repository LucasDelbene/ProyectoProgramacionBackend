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

        this.mensajes = []; //Array MENSAJES
        this.usuarios = []; //Array USUARIOS
    }

    //EMPIEZO A CREAR EL INICIALIZADOR//
    init(){
        try{
            //CONEXION DE UN SOCKET//
            this.io.on('connection', socket =>{
                console.log('Nuevo Usuario Conectado'); //CON CADA CONEXION DEL USUARIO, EL SERVIDOR EMITE POR CONSOLA ESTE MENSAJE//
                this.io.sockets.emit('init', this.mensajes); 

                //ESCUCHAMOS EL MENSAJE DE UN USUARIO y LO EMITIMOS A TODOS LOS CONECTADOS//
                socket.on('mensaje', data =>{
                    this.mensajes.push(data);                  
                    this.io.sockets.emit('escuchandoServidor', this.mensajes); 
                });

                socket.on('agregarUsuario', data =>{
                    console.log(data);
                    if(this.usuarios.length){
                        this.usuarios = this.usuarios.map(usuario =>{
                            if(usuario.email == data.email){
                                verificacionUsuario = true;
                                return{
                                    id: socket.id,
                                    ...data,
                                    active: true
                                }
                            }else{
                                return usuario;
                            }
                        })

                        let verificacionUsuario = false;
                        if(!verificacionUsuario){
                            this.usuarios.push({
                                id: socket.id,
                                ...data,
                                active: true
                            }) 
                        }

                    }else{
                        this.usuarios.push({
                            id: socket.id,
                            ...data,
                            active: true
                        })
                    }
                    this.io.sockets.emit('cargarUsuarios', this.usuarios); 
                });

                //DESCONEXION DE UN SOCKET//
                socket.on("disconnect", data =>{
                    console.log('Usuario Desconectado', socket.id); //CON CADA DESCONEXION DEL USUARIO, EL SERVIDOR EMITE POR CONSOLA ESTE MENSAJE//

                    //DETECTO QUE UN USUARIO SE DESCONECTO, BUSCO ESE USUARIO MEDIANTE EL ARRAY DE USUARIOS CON EL METODO .map()//
                    this.usuarios = this.usuarios.map(usuario =>{
                        if(usuario.id == socket.id){
                            delete usuario.active; //ELIMINO LA PROPIEDAD active
                            return{
                                ...usuario,
                                active: false //LUEGO SE LA VUELVO A PASAR COMO false
                            }
                        }else{
                            return usuario;
                        }
                    });
                    this.io.sockets.emit('cargarUsuarios', this.usuarios); //LUEGO SE LO VUELVO A EMITIR AL FRONT-END
                });
            }) 
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = Socket;