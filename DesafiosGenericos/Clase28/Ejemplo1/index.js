//EJEMPLO 1 (CLASE 28)//
//TIPOS DE OBJETOS PROCESS//

//DIRECTORIO ACTUAL DE TRABAJO//
console.log('---------------------------------------------')
console.log('DIRECTORIO ACTUAL DE TRABAJO')
console.log(process.cwd());
console.log('---------------------------------------------')

//ID DEL PROCESO//
console.log('ID DEL PROCESO')
console.log(process.pid);
console.log('---------------------------------------------')

//VERSION DE NODE//
console.log('VERSION DE NODE')
console.log(process.version);
console.log('---------------------------------------------')

//TITULO DEL PROCESO//
console.log('TITULO DEL PROCESO')
console.log(process.title);
console.log('---------------------------------------------')

//SISTEMA OPERATIVO//
console.log('SISTEMA OPERATIVO')
console.log(process.platform);
console.log('---------------------------------------------')

//USO DE LA MEMORIA//
console.log('USO DE LA MEMORIA')
console.log(process.memoryUsage());
console.log('---------------------------------------------')