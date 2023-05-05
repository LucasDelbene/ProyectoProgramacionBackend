//DESAFIO GENERICO - COLOR ALEATORIO CON BABEL//

//TENGO QUE REALIZAR UN PROGRAMA QUE GENERE UN COLOR ALEATORIO EN FORMATO RGB y LO MUESTRE POR CONSOLA. ESTE ESTARA IMPLEMENTADO EN UN ARCHIVO LLAMADO color.js//
//LA FUNCIONALIDAD DEBE ESTAR IMPLEMENTADA DENTRO DE UNA CLASE y DEBERA UTILIZAR SINTAXIS ES6 (const, let, arrow functions y template string)
//CONVERTIR ESTE CODIGO ES6 a JS5 CON BABEL ONLINE. REALIZAR ESTA CONVERSION EN FORMA AUTOMATICA DENTRO DE UN PROYECTO node.js QUE UTILICE BABEL CLI//

//TODO ESTO ES LO QUE GENERO LA TRANSPILACION CON BABEL//
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

//CREO UNA VARIABLE LLAMADA getNumeroAleatorio LA CUAL ME RETORNA MEDIANTE UN RETURN IMPLICITO Math.floor(Math.random() * maximoNumero) LA CUAL NOS TRAE UN NUMERO ALEATORIO//
var getNumeroAleatorio = function getNumeroAleatorio(maximoNumero) {
  return Math.floor(Math.random() * maximoNumero);
};

//CREO UNA CLASE LLAMADA Color//
var Color = /*#__PURE__*/function () {
  function Color() {
    _classCallCheck(this, Color);
  }
  _createClass(Color, [{
    key: "get",
    value:
    //CREO EL METODO get LA CUAL VA A OBTENER EL COLOR ALEATORIO EN RGB//
    function get() {
      return "RGB(".concat(getNumeroAleatorio(255), ", ").concat(getNumeroAleatorio(255), ", ").concat(getNumeroAleatorio(255), ", 1)");
    }
  }]);
  return Color;
}(); //CREO LA INSTANCIA DE LA CLASE Color//
var color = new Color();
console.log("EL COLOR ALEATORIO ES ".concat(color.get()));
