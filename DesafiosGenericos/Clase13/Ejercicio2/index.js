//DESAFIO GENERICO - COLOR ALEATORIO CON TSC//

//TENGO QUE REALIZAR UN PROYECTO TypeScript node.js QUE GENERE UN COLOR ALEATORIO EN FORMATO RGB y LO MUESTRE POR CONSOLA//
//LA FUNCIONALIDAD DEBE ESTAR IMPLEMENTADA DENTRO DE UNA CLASE EN UN ARCHIVO color.ts y DEBERA UTILIZAR SINTAXIS TypeScript TIPADA//
//EL PROYECTO DEBERA CONVERTIR ESTE CODIGO TS a JS5 EN FORMA AUTOMATICA CON TSC CLI//

//CREO UNA VARIABLE LLAMADA getNumeroAleatorio LA CUAL ME RETORNA MEDIANTE UN RETURN IMPLICITO Math.floor(Math.random() * maximoNumero) LA CUAL NOS TRAE UN NUMERO ALEATORIO//
var getNumeroAleatorio = function (maximoNumero) {return Math.floor(Math.random() * maximoNumero);};
//CREO UNA CLASE LLAMADA ColorTypeScript//
var ColorTypeScript = /** @class */ (function () {
    function ColorTypeScript() {
    }
    //CREO EL METODO get LA CUAL VA A OBTENER EL COLOR ALEATORIO EN RGB//
    ColorTypeScript.prototype.get = function () {
        return "RGB(".concat(getNumeroAleatorio(255), ", ").concat(getNumeroAleatorio(255), ", ").concat(getNumeroAleatorio(255), ", 1)");
    };
    return ColorTypeScript;
}());
//CREO LA INSTANCIA DE LA CLASE ColorTypeScript//
var colorTypeScript = new ColorTypeScript();
console.log("EL COLOR ALEATORIO ES ".concat(colorTypeScript.get()));
