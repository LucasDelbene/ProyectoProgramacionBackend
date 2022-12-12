//DESAFIO CLASES - PROGRAMACION BACKEND//

// CREE UNA CLASE USUARIO CON SU CONSTRUCTOR Y SUS RESPECTIVOS METODOS //
class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre, autor){
        this.libros.push({nombre: nombre, autor: autor});
    }

    getBookNames(){
        let array = [];
        this.libros.forEach(libro => array.push(libro.nombre));
        return array;
    }
}

// CREE UN OBJETO LLAMADO "usuarioUno" //
let usuarioUno = new Usuario("Lucas", "Delbene", [{nombre: "Harry Potter y la piedra filosofal", autor: "J. K. Rowling"}, {nombre: "El Secreto", autor: "Rhonda Byrne"}], ["Deysi", "Mora"]
);

// INVOQUE TODOS LOS METODOS //
// getFullName() //
console.log(usuarioUno.getFullName());
// addMascota() //
usuarioUno.addMascota("Deysi");
// countMascotas //
console.log(usuarioUno.countMascotas());
// addBook() //
usuarioUno.addBook("Harry Potter y la piedra filosofal", "J. K. Rowling")
// getBookNames //
console.log(usuarioUno.getBookNames());