export default class UserDTO {

    static getTokenDTO = (user) =>{
        //SOLO DEVUELVA LO QUE INTERESA PARA UN TOKEN//
        return  {
            cart: user.cart,
            name:`${user.first_name} ${user.last_name}`,
            role:user.role,
            id:user._id,
            avatar:user.avatar || 'url genérica'
        }
    }
}

/*
EXPLICACION DEL CODIGO EN EL ARCHIVO UserDTO.js:

Este codigo define una clase llamada "UserDTO" que tiene un metodo estatico llamado "getTokenDTO". Este metodo toma un objeto "user" como
argumento y devuelve un objeto que contiene informacion especifica del usuario que se utiliza para crear un token de autenticacion, como 
su carrito de compras, nombre completo, rol, ID y avatar. Si el usuario no tiene un avatar se utiliza una URL generica en su lugar.
*/
