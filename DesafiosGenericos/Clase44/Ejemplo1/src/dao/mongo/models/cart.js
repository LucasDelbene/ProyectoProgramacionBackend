/*
EXPLICACION DEL CODIGO EN EL ARCHIVO cart.js:
Este codigo, define un esquema de datos para una coleccion de "Carts" (carritos de compras) utilizando Mongoose, una biblioteca de JavaScript
que permite interactuar con bases de datos MongoDB. El esquema consiste en un objeto que tiene un arreglo llamado "games", que a su vez
contiene objetos que tienen un campo "_id" que es un identificador de objeto de MongoDB y que se refiere a la coleccion "Videogames".
El modelo resultante se exporta como una funcion para que pueda ser utilizada en otros archivos.
*/

//IMPORTO mongoose PARA PODER UTILIZARLO//
import mongoose from 'mongoose';

const collection = 'Carts';

const schema = new mongoose.Schema({
    games:[
        {
            _id:{
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Videogames'
            }
        }
    ]
})

const cartModel = mongoose.model(collection,schema);
export default cartModel;
