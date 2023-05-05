//DESAFIO ENTREGABLE - CLASES//

//DECLARO UNA CLASE Usuario CON SU CONSTRUCTOR Y SUS RESPECTIVOS ATRIBUTOS//
class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    //CREO LOS SIGUIENTES METODOS//
    //DEFINO getFullName() LA CUAL RETORNA EL NOMBRE Y APELLIDO DEL USUARIO//
    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }

    //DEFINO addMascota(String) LA CUAL RECIBE UN NOMBRE DE MASCOTA Y LO AGREGA AL ARRAY DE MASCOTAS//
    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    //DEFINO countMascotas() LA CUAL RETORNA LA CANTIDAD DE MASCOTAS QUE TIENE EL USUARIO//
    countMascotas(){
        return this.mascotas.length;
    }

    //DEFINO addBook(String, String) LA CUAL RECIBE UN STRING 'NOMBRE' Y 'AUTOR' Y AGREGO UN OBJETO AL ARRAY DE LIBROS//
    addBook(nombre, autor){
        this.libros.push({nombre: nombre, autor: autor});
    }

    //DEFINO getBookNames() LA CUAL RETORNA UN ARRAY CON SOLO LOS NOMBRES DEL ARRAY DE LIBROS DEL USUARIO//
    getBookNames(){
        let array = [];
        this.libros.forEach(libro => array.push(libro.nombre))
        return array;
    }
}

//CREO UN OBJETO LLAMADO usuario CON VALORES ARBITRARIOS//
let usuarioUno = new Usuario('Lucas', 'Delbene', [{nombre:'Harry Potter y la pieda filosofal', autor:'J.K.Rowling'}], ['Deysi', 'Mora']);

//INVOCO TODOS LOS METODOS//
console.log(usuarioUno.getFullName());                                   // getFullName()   
usuarioUno.addMascota('Deysimora');                                      // addMascota()    
console.log(usuarioUno.countMascotas());                                 // countMascotas() 
usuarioUno.addBook('El Señor de los Anillos')                            // addBook()       
console.log(usuarioUno.getBookNames());                                  // getBookNames()



