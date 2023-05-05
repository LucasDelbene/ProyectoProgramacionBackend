//DESAFIO GENERICO - NUESTRA PRIMERA BASE DE DATOS EN MongoDB//

//TENGO QUE REALIZAR LAS SIGUIENTES ACCIONES UTILIZANDO UN SERVIDOR DE BASE DE DATOS MongoDB//

//(PUNTO 1)//
//CREAR UNA CARPETA LLAMADA 'base' PARA CONTENER LA ESTRUCTURA DE BASE DE DATOS//

//(PUNTO 2)//
//EJECUTAR EN UNA CONSOLA EL MOTOR DE BASE DE DATOS MongoDB, QUE DEBE SELECCIONAR LA CARPETA 'base' COMO ALMACENAMIENTO DE SU ESTRUCTURA//

//(PUNTO 3)//
//INICIAR Mongo Shell EN OTRA CONSOLA, VERIFICANDO LA CONEXION CON EL SERVIDOR//

//(PUNTO 4)//
//LISTAR LAS BASES DE DATOS DISPONIBLES//
//UTILICE 'show dbs'//

//(PUNTO 5)//
//CREAR UNA BASE DE DATOS EN MongoDB LLAMADA 'sistema' y SELECCIONARLA CON BASE DE TRABAJO//
//UTILICE 'use sistema'//

//(PUNTO 6)//
//INSERTAR UN DOCUMENTO EN LA COLECCION usuarios QUE CONTENGA LOS CAMPOS: nombre y edad//
//UTILICE 'db.usuarios.insert([{nombre: "Lucas", edad: "20"}])'//

//(PUNTO 7)//
//LISTAR LOS DOCUMENTOS DENTRO DE LA COLECCION usuarios//

//(PUNTO 8)//
//MOSTRAR LOS DOCUMENTOS DENTRO DE LA COLECCION usuarios//
//UTILICE 'db.usuarios.find()'//

//(PUNTO 9)//
//INSERTAR TRES DOCUMENTOS MAS CON EL MISMO FORMATO y VALORES DISTINTOS EN LA COLECCION usuarios//
db.usuarios.insert([{nombre: "Messi", edad: "35"}])
db.usuarios.insert([{nombre: "Neymar", edad: "31"}])
db.usuarios.insert([{nombre: "Mbappe", edad: "24"}])

//(PUNTO 10)//
//LISTARLOS NUEVAMENTE VERIFICANDO QUE HAYA 4 DOCUMENTOS DENTRO DE LA COLECCION usuarios//

//(PUNTO 11)//
//INSERTAR DENTRO DE UNA COLECCION LLAMADA 'productos' CUATRO DOCUMENTOS CON LOS SIGUIENTES CAMPOS: nombre, precio, stock//
db.productos.insert([{nombre: "Botines Munich Continental", precio: "120", stock: "10"}])
db.productos.insert([{nombre: "Botines Nike React Gato", precio: "200", stock: "10"}])
db.productos.insert([{nombre: "Botines Adidas Predator", precio: "80", stock: "10"}])
db.productos.insert([{nombre: "Botines Kelme Precision", precio: "110", stock: "10"}])

//(PUNTO 12)//
//MOSTRAR LAS COLECCIONES DE LA BASE 'sistema'//
//UTILICE 'show collections'//

//(PUNTO 13)//
//LISTAR TODOS LOS DOCUMENTOS DE LA COLECCION 'productos'//

