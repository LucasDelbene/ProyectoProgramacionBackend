//DESAFIO GENERICO - CLASES//

//DEFINO LA CLASE Contador, IDENTIFICO CADA INSTANCIA DE CONTADOR, HAGO QUE CADA INSTANCIA INICIE SU CUENTA EN CERO y CREO UN VALOR ESTATICO LA CUAL LLEVA LA CUENTA DE TODO LO CONTADO POR SUS INSTANCIAS//
class Contador{
    static cuentaGeneral = 0;
    constructor(nombre){
        this.nombre = nombre;
        this.contador = 0;        
    }

    //DEFINO METODO obtenerResponsable QUE DEVUELVE EL NOMBRE DEL RESPONSABLE DE LA INSTANCIA//
    obtenerResponsable(){
        return `EL RESPONSABLE ES ${this.nombre}`;
    }

    //DEFINO METODO obtenerCuentaIndividual QUE DEVUELVE LA CANTIDAD CONTADA POR LA INSTANCIA//
    obtenerCuentaIndividual(){
        return `LA CUENTA DE ${this.nombre} ES ${this.contador}`; 
    }

    //DEFINO METODO obtenerCuentaGlobal QUE DEVUELVE LA CANTIDAD CONTADA POR TODOS LOS CONTADORES CREADOS HASTA EL MOMENTO//
    obtenerCuentaGlobal(){
        return `LA CUENTA GLOBAL ES ${Contador.cuentaGeneral}`; 
    }
    
    //DEFINO METODO contar QUE INCREMENTA EN 1, TANTO LA CUENTA INDIVIDUAL COMO LA CUENTA GENERAL//
    contar(){
        this.contador++;
        Contador.cuentaGeneral++;
    }
}

let lucas = new Contador('LUCAS');
let messi = new Contador('MESSI');

//HAGO QUE LUCAS CUENTE 2 VECES y MUESTRO SU CUENTA INDIVIDUAL//
lucas.contar();
lucas.contar();
console.log(lucas.obtenerCuentaIndividual());

//MUESTRO EL RESPONSABLE DE LUCAS//
console.log(lucas.obtenerResponsable());

//HAGO QUE MESSI CUENTE 2 VECES y DESPUES MUESTRO LA CUENTA GLOBAL ENTRE LUCAS y MESSI//
messi.contar();
messi.contar();
console.log(messi.obtenerCuentaGlobal());

