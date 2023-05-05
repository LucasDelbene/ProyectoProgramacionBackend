//EJEMPLO 1 - NORMALIZACION DE DATOS//

//IMPORTO normalizr PARA PODER UTILIZARLO//
import {normalize, denormalize, schema} from "normalizr"; //{Normalizar, Desnormalizar y Esquema}//

//CREO UNA VARIABLE const LLAMADA blogPost//
const blogPost = {
    id: 1,
    nombre: 'Ejemplo Uno (Clase 22)',
    descripcion: 'Explicacion de Normalizacion de Datos',
    contenido: '',
    autor:{
        id: 1,
        nombre: 'Lucas Delbene'
    },
    comentarios:[
        {
            id: 1,
            autor:{
                id: 2,
                nombre: 'Lionel Messi'
            },
            contenido: 'Este ejemplo esta muy bien explicado Lucas'
        },
        {
            id: 2,
            autor:{
                id: 3,
                nombre: 'Neymar JR'
            },
            contenido: 'Este exemplo esta muito bem explicado Lucas'
        },
        {
            id: 3,
            autor:{
                id: 1,
                nombre: 'Lucas Delbene'
            },
            contenido: 'Muchas gracias a los dos, espero que les haya servido'
        },
        {
            id: 4,
            autor:{
                id: 3,
                nombre: 'Neymar JR'
            },
            contenido: 'Graças a você, com Messi convidamos você a assistir a um jogo do PSG, tudo pago'
        },
         {
            id: 5,
            autor:{
                id: 2,
                nombre: 'Lionel Messi'
            },
            contenido: 'Despues del partido, te invitamo a come un asado en casa y jugamo fulbo si queres'
        },
    ]
}

//DEFINO LA PRIMERA ENTIDAD MAS PROFUNDA CON normalizr, EN ESTE CASO usuarios//
const usuario = new schema.Entity('usuarios');

//DEFINO LA SEGUNDA ENTIDAD MAS PROFUNDA CON normalizr, EN ESTE CASO comentarios//
const comentario = new schema.Entity('comentarios',{
    autor: usuario //LA PROPIEDAD autor ESTA RELACIONADA CON EL ESQUEMA usuario DECLARADA ANTERIORMENTE//
});

//DEFINO LA TERCER y ULTIMA ENTIDAD MAS PROFUNDA CON normalizr, EN ESTE CASO blogPost//
const blog = new schema.Entity('posts',{
    autor: usuario,         //LA PROPIEDAD autor ESTA RELACIONADA CON EL ESQUEMA usuario DECLARADA ANTERIORMENTE//
    comentarios: [comentario] //LA PROPIEDAD comentarios ESTA RELACIONADA CON EL ESQUEMA comentario DECLARADA ANTERIORMENTE//
})

//LLAMO A normalize() PARA PODER NORMALIZAR TODA LA DATA DE blogPost//
const dataNormalizada = normalize(blogPost, blog)
console.log(JSON.stringify(dataNormalizada, null, '\t'));

//LLAMO A denormalize() PARA PODER DESNORMALIZAR TODA LA DATA NORMALIZADA, PARTIENDO DESDE result y entities//
const dataOriginal = denormalize(dataNormalizada.result, blog,dataNormalizada.entities);
console.log(JSON.stringify(dataOriginal, null, '\t'));