// ARCHIVO TEST PARA IMPORTAR //

const Contenedor = require("./desafioManejoDeArchivos.js");
let productos = new Contenedor("productos.txt");

const test = async () =>{
    let save = await productos.save({
        title: "Botines Munich Continental",
        price: "€120",
        thumbnail: "https://chemasport.es/8044-thickbox_default/zapatillas-munich-continental-blanco.jpg"
    });
    
    let getAll = await productos.getAll();
    let getById = await productos.getById(3);
    let deleteById = await productos.deleteById(2);
    let deleteAll = await productos.deleteAll();
    console.log(save);
    console.log(getAll);
    console.log(getById);
    console.log(deleteById);
    console.log(deleteAll);
};
test();


