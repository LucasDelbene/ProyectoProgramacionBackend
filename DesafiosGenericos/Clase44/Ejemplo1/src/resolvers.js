//EJEMPLO 1 IMPLEMENTANDO UNA API GRAPHQL (CLASE 44)// 
//EN ESTE ARCHIVO resolvers.js VOY A DARLE SENTIDO A LO QUE YO DEFINI EN EL ARCHIVO typeDefs.js//

//IMPORTO {videogamesService,usersService} PARA PODER UTILIZARLO//
import {videogamesService,usersService} from './dao/index.js';

//DEFINO UN OBJETO resolvers QUE CONTIENE FUNCIONES QUE RESUELVEN CONSULTAS y MUTACIONES ESPECIFICAS DE GraphQL//
const resolvers = {
    
    //DEFINO TRES FUNCIONES DENTRO DEL OBJETO Query en GraphQL//
    Query:{

        //DEVUELVE UNA CADENA DE TEXTO QUE DICE HOLA MUNDO//
        HolaMundo: ()=>{
            return "Hola Mundo";
        },

        //LLAMO A UNA FUNCION ASINCRÓNICA LLAMADA getVideogames DESDE UN MODULO EXTERNO LLAMADO videogamesService QUE DEVUELVE UNA LISTA DE VIDEOJUEGOS. LA FUNCION REGISTRA LOS VIDEOJUEGOS EN LA CONSOLA y DEVUELVE LA PROPIEDAD docs DE LA LISTA DE VIDEOJUEGOS//
        getVideogames: async()=>{
            const videogames = await videogamesService.getVideogames();
            console.log(videogames);
            return videogames.docs
        },

        //LLAMO A UNA FUNCION ASINCRÓNICA LLAMADA getUsers DESDE UN MODULO EXTERNO LLAMADO usersService QUE DEVUELVE UNA LISTA DE USUARIOS. LA FUNCION DEVUELVE DIRECTAMENTE LA LISTA DE USUARIOS//
        getUsers: async()=>{
            const users = await usersService.getUsers();
            return users;
        }
    },

    //DEFINO UNA FUNCION DENTRO DEL OBJETO Mutation en GraphQL//
    Mutation:{
        
        //DEFINO UNA FUNCION LLAMADA registerUser QUE SE UTILIZAR PARA CREAR UN NUEVO USUARIO. LA FUNCION TOMA ARGUMENTOS QUE INCLUYEN EL PRIMER NOMBRE, APELLIDO, EMAIL y CONTRASEÑA. ESTOS ARGUMENTOS SE UTILIZAN PARA CREAR UN OBJETO DE USUARIO, QUE SE PASA A UNA FUNCION ASINCRÓNICA createUser EN UN MODULO EXTERNO LLAMADO usersService. LA FUNCION ESPERA A QUE SE COMPLETE LA CREACION DEL USUARIO y LUEGO DEVUELVE EL RESULTADO DE LA OPERACION//
        registerUser: async(_, args)=>{
            const user = {
                first_name: args.first_name,
                last_name: args.last_name,
                email: args.email,
                password: args.password,
            }

            const resultado = await usersService.createUser(user);
            return resultado; 
        }
    }
}
export default resolvers;