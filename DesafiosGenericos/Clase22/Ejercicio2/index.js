//DESAFIO GENERICO - DESNORMALIZAR JSON//

//TENGO QUE DESNORMALIZAR EL OBJETO DEL EJERCICIO ANTERIOR, IMRPIMIENDOLO POR CONSOLA JUNTO A SU LONGITUD. COMPARAR EL OBJETO ORIGINAL CON EL DESNORMALIZADO//

//IMPORTO normalizr PARA PODER UTILIZARLO//
import {denormalize,normalize,schema} from 'normalizr'

//IMPORTO holding.json PARA PODER UTILIZARLO EN FORMATO JSON//
import holding from './holding.json' assert {type: "json"}


const usuario = new schema.Entity('usuarios');
const compañia = new schema.Entity('compañias',{
    gerente: usuario,
    encargado: usuario,
    empleados: [usuario]
})
const afip = new schema.Entity('afips',{
    empresas: [ compañia ]
})

const dataNormalizada = normalize(holding,afip)
const dataDesnormalizada = denormalize(dataNormalizada.result,afip,dataNormalizada.entities)

//MUESTRO POR CONSOLA LA DATA NORMALIZADA//
console.log(JSON.stringify(dataNormalizada,null,'\t'))

//MUESTRO POR CONSOLA LA DATA DESNORMALIZADA//
console.log(JSON.stringify(dataDesnormalizada,null,'\t'))