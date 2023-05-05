//LOS RESOLVERS EN GraphQL, SON RESPONSABLES DE RECUPERAR LOS DATOS SOLICITADOS EN UNA CONSULTA GraphQL y PUEDEN REALIZAR TRANSFORMACIONES EN LOS DATOS ANTES DE DEVOLVERLOS AL CLIENTE. SON IMPORTANTES PORQUE PERMITEN CONSTRUIR CONSULTAS COMPLEJAS QUE RECUPERAN DATOS DE VARIAS FUENTES y LOS COMBINAN EN UNA SOLA RESPUESTA//

//IMPORTO LA DATA DE LAS PELICULAS PARA PODER UTILIZARLAS//
import peliculas from './dataPeliculas.js';

//DEFINO UN OBJETO LLAMADO resolvers, LA CUAL CONTIENE TRES FUNCIONES (DOS PARA Query y UNA PARA Mutation)//
const resolvers = {

    //DEFINO DOS FUNCIONES DENTRO DEL OBJETO Query en GraphQL//
    Query:{
        //DEVUELVE UNA LISTA DE TODAS LAS PELICULAS//
        async peliculas(_, args){
            return await peliculas; 
        },
        
        //DEVUELVE UNA PELICULA SEGUN EL ID//
        async peliculas(_, {id}){
            return await peliculas.find((pelicula) => pelicula.id === id);
        },
    },
    
    //DEFINO UNA FUNCION DENTRO DEL OBJETO Mutation en GraphQL//
    Mutation:{

        //FUNCION PARA CREAR UNA NUEVA PELICULA//
        async crearPelicula(_, {nombre}){

            let nuevaPelicula = {
                id: peliculas.length,
                nombre,
            };
            return await peliculas.push(nuevaPelicula);
        }
    }
};
export default resolvers;