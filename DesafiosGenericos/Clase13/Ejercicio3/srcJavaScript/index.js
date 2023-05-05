"use strict";
//DESAFIO GENERICO - OPERACIONES CON TYPESCRIPT//
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//IMPORTO TODAS LAS FUNCIONES DE operaciones.ts//
const operaciones = __importStar(require("./operaciones/operaciones"));
//CREO UNA VARIABLE const LLAMADA hola CON TIPO string//
const hola = 'HOLA A TODOS';
console.log(hola);
//CREO UNA VARIABLE CON DOS NUMEROS DE TIPO number//
let a = 5;
let b = 10;
//MUESTRO LOS RESULTADOS DE LAS OPERACIONES POR CONSOLA//
console.log(`EL RESULTADO DE LA SUMA ES ${operaciones.sumar(a, b)}`); //SUMA
console.log(`EL RESULTADO DE LA RESTA ES ${operaciones.restar(a, b)}`); //RESTA
console.log(`EL RESULTADO DE LA MULTIPLICACION ES ${operaciones.multiplicar(a, b)}`); //MULTIPLICACION
console.log(`EL RESULTADO DE LA DIVISION ES ${operaciones.dividir(a, b)}`); //DIVISION
