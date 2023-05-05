//IMPORTO faker PARA PODER UTILIZARLO//
import {faker} from '@faker-js/faker';

faker.locale = 'es';
//GENERO UN USUARIO CON DATOS ALEATORIOS CON faker//
export const generarUsuario = ()=>{
    //UNO A UNO SE VAN A IR CREANDO PRODUCTOS CON DATOS ALEATORIOS UTILIZANDO faker//
    const numeroDeProductos = parseInt(faker.random.numeric(1, {bannedDigits:['0']} ));
    let productos = [];
    for(let i=0; i<numeroDeProductos; i++){
        productos.push(generarProducto());
    }

    const usuario ={
        id: faker.database.mongodbObjectId(),
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        sexo: faker.name.sex(),
        nacimiento: faker.date.birthdate(),
        email: faker.internet.email(),
        emoji: faker.internet.emoji(),
        color: faker.commerce.color(),
        imagen: faker.internet.avatar(),
        
        carrito: productos //AGREGO carrito:productos EN LA CUAL SE AGREGA EL PRODUCTO CON DATOS ALEATORIOS CREADO EN LA FUNCION generarProducto() UTILIZANDO faker//
    }
    return usuario;
}

//GENERO UN PRODUCTO CON DATOS ALEATORIOS CON faker//
export const generarProducto = ()=>{
    return{
        id: faker.database.mongodbObjectId(),
        nombre: faker.commerce.productName(),
        descripcion: faker.commerce.productDescription(),
        precio: faker.commerce.price(),
        stock: faker.random.numeric(2),
        codigo: faker.random.alphaNumeric(7),
        imagen: faker.image.image()
    }
}