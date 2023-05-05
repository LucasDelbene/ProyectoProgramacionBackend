//CONTROLLER DE CARRITO//

//IMPORTO cartsService PARA PODER UTILIZARLO//
import {cartsService} from '../dao/index.js';

const insertGameToCart = async(req,res)=>{
    const user = req.user;
    const videogameId = req.params.vid;
    const cart = await cartsService.getCartById(user.cart);
    
    //CORROBORO SI EL VIDEOJUEGO YA EXISTIA EN EL CARRITO//
    const exists = cart.games.find(game => game._id.toString()===videogameId);
    if(exists) return res.status(400).send({status:"ERROR",error:"EL VIDEOJUEGO YA EXISTE"})
    cart.games.push({_id:videogameId});
    console.log(cart.games);

    await cartsService.updateCart(cart._id, {games:cart.games});
    res.redirect('/cart ')
}
export default {insertGameToCart}

/*
EXPLICACION DEL CODIGO DEL ARCHIVO carts.controller.js:

Este es un codigo que define una funcion llamada "insertGameToCart" que se utiliza para agregar un videojuego al carrito de compras de
un usuario en una aplicacion web. Primero, se obtiene el usuario y el ID del videojuego a través de la solicitud HTTP entrante. Luego,
se obtiene el carrito del usuario utilizando el servicio de "cartsService" importado desde "../dao/index.js". A continuacion, se verifica
si el videojuego ya existe en el carrito, y si es asi se devuelve un error al cliente. Si el videojuego no esta en el carrito, se agrega 
y se actualiza el carrito utilizando el servicio de "cartsService". Por ultimo, se envia una respuesta al cliente confirmando que el videojuego
ha sido agregado con exito.
*/