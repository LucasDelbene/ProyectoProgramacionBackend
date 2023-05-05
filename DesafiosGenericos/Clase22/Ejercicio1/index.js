//DESAFIO GENERICO - NORMALIZAR JSON//

//(PUNTO 1)//
//NORMALIZAR LA ESTRUCTURA DEL OBJETO EN FORMATO JSON empresa.json QUE DESCRIBE EL ORGANIGRAMA DE UNA EMPRESA. EL GERENTE y EL ENCARGADO FIGURAN EN EL ARRAY DE EMPLEADOS DE LA EMPRESA//

//(PUNTO 2)//
//IMPRIMIR POR CONSOLA EL OBJETO NORMALIZADO y LA LONGITUD DEL OBJETO ORIGINAL y DEL NORMALIZADO. COMPARAR LOS RESULTADOS//

//IMPORTO normalizr PARA PODER UTILIZARLO//
import {normalize,schema} from 'normalizr';

//IMPORTO empresa.json PARA PODER UTILIZARLO EN FORMATO JSON//
import empresa from './empresa.json' assert {type:"json"};

const usuario = new schema.Entity('usuarios');
const compañia = new schema.Entity('compañias',{
    gerente: usuario,
    encargado: usuario,
    empleados: [usuario]
})

//LLAMO normalize() PARA PODER NORMALIZAR TODA LA DATA DE empresa//
const dataNormalizada = normalize(empresa,compañia);
console.log(JSON.stringify(dataNormalizada,null,'\t'))