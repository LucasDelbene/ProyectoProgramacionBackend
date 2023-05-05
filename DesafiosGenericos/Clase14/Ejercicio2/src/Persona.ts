export default class Persona{
    private firstName = string;
    private lastName = string;

    constructor(firstName: string, lastName: string){
        this.firstName = firstName;
        this.lastName = lastName;
    }

    //CREO getFullName() LA CUAL ME RETORNA EL NOMBRE COMPLETO//
    getFullName():string{
        return `${this.firstName} ${this.lastName}`
    };
};
