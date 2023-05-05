//CONTROLLER DE VIEWS//

//IMPORTO videogamesService PARA PODER UTILIZARLO//
import {cartsService, videogamesService} from "../dao/index.js";

const home = async(req,res)=>{
    const page = req.query.page || 1;
    const pagination = await videogamesService.getVideogames({},page);

    const cartId = req.user.cart;
    const cart = await cartsService.getCartById(cartId);

    let videogames = pagination.docs;
    videogames = videogames.map(videogame =>{
        const exists = cart.games.some(v=>v._id.toString()===videogame._id.toString());
        return {...videogame,isValidToAdd: !exists};
    })
    console.log(videogames);

    const paginationData = {
        hasPrevPage:pagination.hasPrevPage,
        hasNextPage:pagination.hasNextPage,
        nextPage:pagination.nextPage,
        prevPage:pagination.prevPage,
        page:pagination.page
    }

    res.render('home',{videogames,paginationData});
}

const register = (req,res)=>{
    res.render('register')
}

const login = (req,res)=>{
    res.render('login')
}

const profile = (req,res)=>{
    res.render('profile',{user:req.user})
}
const createVideogame = (req,res)=>{
    res.render('videogameCreator');
}

const cart = async(req,res)=>{
    const cartId = req.user.cart;
    const cart = await cartsService.getCartById(cartId,{populate:true});
    const name = req.user.name;
    const games = cart.games.map(game=>game._id);
    console.log(cart.games);

    res.render('cart',{
        games:cart.games,
        name
    })
}

export default {cart, createVideogame, home, login, profile, register}
 
/*
EXPLICACION DEL CODIGO EN EL ARCHIVO views.controller.js:

Este codigo exporta cinco funciones utilizando la sintaxis de exportación por defecto de ES6: createVideogame, home, login, profile y 
register.

Primero la Funcion Home, es una funcion asincrona que utiliza las bibliotecas de servicio cartsService y videogamesService para obtener
una lista de videojuegos y un carrito de la compra para el usuario actual. Luego procesa la lista de videojuegos para marcar los videojuegos
que ya se encuentran en el carrito y finalmente renderiza una plantilla de Handlebars con la lista de videojuegos y la informacion de la paginacion.

Segundo las Funciones Register y Login, simplemente renderizan las plantillas de registro e inicio de sesion, respectivamente. La Funcion
Profile renderiza la plantilla de perfil del usuario con los datos del usuario actual.

Tercero la Funcion createVideogame renderiza la plantilla de creacion de videojuegos.

El archivo de origen "../dao/index.js" se utiliza para importar los servicios cartsService y videogamesService.
*/