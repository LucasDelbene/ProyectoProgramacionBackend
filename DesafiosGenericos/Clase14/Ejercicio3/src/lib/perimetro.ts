//IMPLEMENTO LA CLASE LLAMADA Perimetro//
export default class Perimetro{

    //DECLARO LOS 3 METODOS ESTATICOS PARA CALCULAR EL PERIMETRO DE UN cuadrado, rectangulo y circulo//
    static cuadrado(lado:number){
        return lado * 4;
    }

    static rectangulo(base:number, altura:number){
        return base * 2 + altura * 2;
    }

    static circulo(radio:number){
        return 2 * Math.PI + radio;
    }
}