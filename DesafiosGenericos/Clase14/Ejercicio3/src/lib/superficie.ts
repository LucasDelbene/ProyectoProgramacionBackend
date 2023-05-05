//IMPLEMENTO LA CLASE LLAMADA Superficie//
export default class Superficie{

    //DECLARO LOS 3 METODOS ESTATICOS PARA CALCULAR LA SUPERFICIE DE UN cuadrado, rectangulo y circulo//
    static cuadrado(lado:number){
        return lado ** 2;
    }

    static rectangulo(base:number, altura:number){
        return base * altura;
    }

    static circulo(radio:number){
        return Math.PI * radio ** 2;
    }
}