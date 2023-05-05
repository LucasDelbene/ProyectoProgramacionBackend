/*
EXPLICACION DEL CODIGO EN EL ARCHIVO CartsDAO.js:
Este codigo exporta una clase llamada "CartsDao" que tiene tres metodos:

1) El metodo "getCartById", la cual acepta un parametro id y devuelve el documento de carrito correspondiente de la base de datos, utilizando
el modelo de carrito importado desde el archivo "cart.js".

2) El metodo "createCart", la cual no acepta parametros y devuelve un nuevo documento de carrito vacio.

3) El metodo "updateCart", la cual acepta dos parametros "id" (para identificar el carrito a actualizar) y "cart" (contiene las actualizaciones
para aplicar al carrito). Este metodo utiliza el metodo "findByIdAndUpdate" del modelo de carrito para actualizar el documento correspondiente
en la base de datos con las actualizaciones proporcionadas.
*/

//IMPORTO cartModel PARA PODER UTILIZARLO//
import cartModel from './models/cart.js';

export default class CartsDao {

    getCartById = (id, options={})=>{
        if(options.populate)
        return cartModel.findOne({_id:id}).populate('games._id').lean();
        return cartModel.findOne({_id:id}).lean();
    }

    createCart = ()=>{
        return cartModel.create({games:[]});
    }

    updateCart = (id,cart)=>{
        return cartModel.findByIdAndUpdate(id,{$set:cart});
    }
}