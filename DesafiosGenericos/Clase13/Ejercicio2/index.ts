//DESAFIO GENERICO - COLOR ALEATORIO CON TSC//

//TENGO QUE REALIZAR UN PROYECTO TypeScript node.js QUE GENERE UN COLOR ALEATORIO EN FORMATO RGB y LO MUESTRE POR CONSOLA//
//LA FUNCIONALIDAD DEBE ESTAR IMPLEMENTADA DENTRO DE UNA CLASE EN UN ARCHIVO color.ts y DEBERA UTILIZAR SINTAXIS TypeScript TIPADA//
//EL PROYECTO DEBERA CONVERTIR ESTE CODIGO TS a JS5 EN FORMA AUTOMATICA CON TSC CLI//

//CREO UNA VARIABLE LLAMADA getNumeroAleatorio LA CUAL ME RETORNA MEDIANTE UN RETURN IMPLICITO Math.floor(Math.random() * maximoNumero) LA CUAL NOS TRAE UN NUMERO ALEATORIO//
let getNumeroAleatorio = (maximoNumero:number):number=> Math.floor(Math.random() * maximoNumero);

//CREO UNA CLASE LLAMADA ColorTypeScript//
class ColorTypeScript{

    //CREO EL METODO get LA CUAL VA A OBTENER EL COLOR ALEATORIO EN RGB//
    get():string{
        return `RGB(${getNumeroAleatorio(255)}, ${getNumeroAleatorio(255)}, ${getNumeroAleatorio(255)}, 1)`;
    }
}

//CREO LA INSTANCIA DE LA CLASE ColorTypeScript//
const colorTypeScript:ColorTypeScript = new ColorTypeScript()
console.log(`EL COLOR ALEATORIO ES ${colorTypeScript.get()}`);