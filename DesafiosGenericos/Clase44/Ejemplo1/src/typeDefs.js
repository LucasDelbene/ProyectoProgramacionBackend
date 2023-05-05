//EJEMPLO 1 IMPLEMENTANDO UNA API GRAPHQL (CLASE 44)// 
//EN ESTE ARCHIVO typeDefs.js VOY A IR DEFINIENDO TODOS y CADA UNO DE LOS TIPOS DE DATOS QUE TENGA//

//DEFINO LOS TIPOS DE DATOS y LAS OPERACIONES QUE SE PUEDEN REALIZAR EN UN ESQUEMA GraphQL. EL ESQUEMA SE DEFINE EN UNA CADENA DE TEXTO y SE EXPORTA COMO UN MODULO PREDETERMINADO//
const typeDefs = `#graphql

    type Videogame{
        _id: ID
        title: String
        description: String
        price: Float
        code: String
    }

    type Query{
        HolaMundo: String
        getVideogames: [Videogame]
        getUsers: [User]
    }

    type User{
        _id: ID
        first_name: String
        last_name: String
        email: String
        password: String
        avatar: String
    }

    type Mutation{
        registerUser(first_name:String, last_name:String, email:String, password:String): User
    }
`;
export default typeDefs;
