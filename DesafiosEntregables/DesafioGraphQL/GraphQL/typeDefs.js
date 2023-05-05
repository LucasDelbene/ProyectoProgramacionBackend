//EN ESTE ARCHIVO typeDefs.js VOY A IR DEFINIENDO TODOS y CADA UNO DE LOS TIPOS DE DATOS QUE TENGA//

//DEFINO LOS TIPOS DE DATOS y LAS OPERACIONES QUE SE PUEDEN REALIZAR EN UN ESQUEMA GraphQL. DEFINO TRES TIPOS DE OBJETOS: Pelicula (DOS CAMPOS), Query (DOS CAMPOS) y Mutation (UN CAMPO)//
const typeDefs = `
    type Pelicula{
        id: Int!
        nombre: String!
    }

    type Query{
        peliculas: [Pelicula]
        pelicula(id: Int!): Pelicula
    }

    type Mutation{
        crearPelicula(nombre: String!): Boolean
    }
`;
export default typeDefs;