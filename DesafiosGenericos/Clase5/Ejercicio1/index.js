//DESAFIO GENERICO - PROYECTO EN NODE//

//PUNTO 1//
//CREO UN OBJETO//
let numeros = {};

//CREO UN PROYECTO EN node.js QUE GENERE 10000 NUMEROS ALEATORIOS EN EL RANGO DE 1 a 20//
for(let i = 0; i < 10000; i++){
    let numeroRandom = Math.round((Math.random() * (20-1)));
    numeros[numeroRandom] = numeros[numeroRandom] ? numeros[numeroRandom] + 1 : 1; 
}
console.log(numeros); //MUESTRO RESULTADO POR CONSOLA//


//PUNTO 2//
//DESARROLLO UN PROYECTO EN node.js QUE DECLARE UN ARRAY DE OBJETOS DE ESTE TIPO//
const productos = [
    {id:1, nombre:'Botines Munich Continental', precio: 120},
    {id:1, nombre:'Botines Munich G3', precio: 140},
    {id:1, nombre:'Botines Munich Prisma',precio: 90},
    {id:1, nombre:'Botines Kelme Indoor Copa', precio: 105},
    {id:1, nombre:'Botines Kelme Precision', precio: 90},
    {id:1, nombre:'Botines Kelme Elite', precio: 70}
]

//DE DICHO ARRAY, OBTENGO INFORMACION DEL NOMBRE DE LOS PRODUCTOS, SU PRECIO TOTAL, SU PRECIO PROMEDIO, PRECIO MENOR y PRECIO MAYOR//
let respuesta = productos.reduce((prev, objeto, i) =>{
    if(i == 0){
        return{
            nombres: objeto.nombre,  //NOMBRE DE LOS PRODUCTOS
            total: objeto.precio,    //PRECIO TOTAL DE PRODUCTOS
            menor: objeto,           //PRODUCTO CON MENOR PRECIO
            mayor: objeto            //PRODUCTO CON MAYOR PRECIO
        }
    }else{
        let menor = prev.menor.precio < objeto.precio ? prev.menor : objeto;
        let mayor = prev.mayor.precio > objeto.precio ? prev.mayor : objeto;
        return{
            nombres: `${prev.nombres}, ${objeto.nombre}`,
            total: prev.total + objeto.precio,
            menor,
            mayor 
        }
    }
}, {}) 
respuesta.promedio = respuesta.total / productos.length; //PRECIO PROMEDIO DE LOS PRODUCTOS

console.log(respuesta); //MUESTRO RESULTADO POR CONSOLA//