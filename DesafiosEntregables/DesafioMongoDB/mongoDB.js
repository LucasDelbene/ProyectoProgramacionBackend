//DESAFIO MongoDB//

//EXPLICACION PASO A PASO DE TODO LO QUE HICE//
//INICIO MONGO//
mongosh

//CREO LA BASE DE DATOS LLAMADA ecommerce//
/* use ecommerce */

//VEO EN QUE BASE DE DATOS ESTOY POSICIONADO//
db

//IMPLEMENTO CRUD//
//CREO LAS COLECCIONES//
db.createCollection("mensajes")
db.createCollection("productos")

//CREO ITEMS PARA MENSAJES Y PRODUCTOS//
db.mensajes.insertMany([{email: "lucasdelbene@gmail.com", message: "Bienvenidos a mi Desafio MongoDB"}])

db.productos.insertMany([
    {
      nombre: "Botines Munich Continental",
      descripcion: "Botines Munich Continental Blancos",
      codigo: 1,
      precio: 1800,
      imagen: "https://res.cloudinary.com/proyectofutsal/image/upload/v1665765181/ProyectoReactJs/botinesMunichContinental_wctv7q.jpg"
    },
    {
      nombre: "Botines Munich G3",
      descripcion: "Botines Munich G3 Rojos",
      codigo: 2,
      precio: 3700,
      imagen: "https://res.cloudinary.com/proyectofutsal/image/upload/v1665765181/ProyectoReactJs/botinesMunichG3_whg5a8.jpg"
    },  
    {
      nombre: "Botines Munich Prisma",
      descripcion: "Botines Munich Prisma Blancos",
      codigo: 3,
      precio: 300,
      imagen: "https://res.cloudinary.com/proyectofutsal/image/upload/v1665765182/ProyectoReactJs/botinesMunichPrisma_lfipfb.jpg"
    },
    {
      nombre: "Botines Kelme Indoor Copa",
      descripcion: "Botines Kelme Indoor Copa Blancos",
      codigo: 4,
      precio: 4500,
      imagen: "https://res.cloudinary.com/proyectofutsal/image/upload/v1665765181/ProyectoReactJs/botinesKelmeIndoorCopa_j4f8at.jpg"
    },
    {
      nombre: "Botines Kelme Precision",
      descripcion: "Botines Kelme Precision Grises",
      codigo: 5,
      precio: 2370,
      imagen: "https://res.cloudinary.com/proyectofutsal/image/upload/v1665765181/ProyectoReactJs/botinesKelmePrecision_zgsh9h.jpg"
    },
    {
      nombre: "Botines Kelme Elite",
      descripcion: "Botines Kelme Elite Blancos con Grises",
      codigo: 6,
      precio: 3490,
      imagen: "https://res.cloudinary.com/proyectofutsal/image/upload/v1665765181/ProyectoReactJs/botinesKelmeElite_psvvlg.jpg"
    },
    {
      nombre: "Botines Nike React Gato",
      descripcion: "Botines Nike React Gato Azules",
      codigo: 7,
      precio: 2500,
      imagen: "https://res.cloudinary.com/proyectofutsal/image/upload/v1665765184/ProyectoReactJs/botinesNikeReactGato_exmepu.jpg"
    },
    {
      nombre: "Botines Nike Premier II",
      descripcion: "Botines Nike Premier II Negros",
      codigo: 8,
      precio: 700,
      imagen: "https://res.cloudinary.com/proyectofutsal/image/upload/v1665765182/ProyectoReactJs/botinesNikePremier2_zku69f.jpg"
    },
    {
      nombre: "Botines Nike Street Gato",
      descripcion: "Botines Nike Street Gato Blancos",
      codigo: 9,
      precio: 3770,
      imagen: "https://res.cloudinary.com/proyectofutsal/image/upload/v1665765180/ProyectoReactJs/botinesNikeStreetGato_aknvg1.jpg"
    },
    {
      nombre: "Botines Joma Top Flex",
      descripcion: "Botines Joma Top Flex Blancos con Celeste",
      codigo: 10,
      precio: 250,
      imagen: "https://res.cloudinary.com/proyectofutsal/image/upload/v1665765181/ProyectoReactJs/botinesJomaTopFlex_p943se.jpg"
    },
])

// 1) AGREGAR 10 DOCUMENTOS CON VALORES DISTINTOS A LAS COLECCIONES MENSAJES Y PRODUCTOS //

// 2) DEFINIR LAS CLAVES DE LOS DOCUMENTOS EN RELACION A LOS CAMPOS DE LAS TABLAS DE ESA BASE. EN EL CASO DE LOS PRODUCTOS, PONER VALORES AL CAMPO PRECIO ENTRE LOS 100 Y 5000 PESOS //

// 3) LISTAR TODOS LOS DOCUMENTOS EN CADA COLECCION //
db.mensajes.find().pretty()
db.productos.find().pretty()

// 4) MOSTRAR LA CANTIDAD DE DOCUMENTOS ALMACENADOS EN CADA UNA DE ELLAS //
ecommerce> db.productos.count()
10

// 5) REALIZAR UN CRUD SOBRE LA COLECCION DE PRODUCTOS //
    // a) AGREGAR UN PRODUCTO MAS EN LA COLECCION DE PRODUCTOS //
    db.productos.insertOne({
        nombre: "Botines Joma Top Flex Rebound",
        descripcion: "Botines Joma Top Flex Rebound Naranjas con Azul",
        codigo: 11,
        precio: 2200,
        imagen: "https://res.cloudinary.com/proyectofutsal/image/upload/v1665765180/ProyectoReactJs/botinesJomaTopFlexRebound_qtrxio.jpg"
    })

    // b) REALIZAR UNA CONSULTA POR NOMBRE DE PRODUCTO ESPECIFICO //
        // I) LISTAR LOS PRODUCTOS CON PRECIO MENOR A 1000 PESOS //
        ecommerce> db.productos.find({precio: {$lt: 1000}}, {"nombre": 1});
        [
          {
            _id: ObjectId("63c6f0455236f55c0113f75d"),
            nombre: 'Botines Munich Prisma'
          },
          {
            _id: ObjectId("63c6f0455236f55c0113f762"),
            nombre: 'Botines Nike Premier II'
          },
          {
            _id: ObjectId("63c6f0455236f55c0113f764"),
            nombre: 'Botines Joma Top Flex'
          }
        ]

        // II) LISTAR LOS PRODUCTOS CON PRECIO ENTRE LOS 1000 A 3000 PESOS //
        ecommerce> db.productos.find({$and: [{precio: {$gt:1000}}, {precio: {$lt:3000}} ]} , {"nombre": 1})
        [
          {
            _id: ObjectId("63c6f0455236f55c0113f75b"),
            nombre: 'Botines Munich Continental'
          },
          {
            _id: ObjectId("63c6f0455236f55c0113f75f"),
            nombre: 'Botines Kelme Precision'
          },
          {
            _id: ObjectId("63c6f0455236f55c0113f761"),
            nombre: 'Botines Nike React Gato'
          },
          {
            _id: ObjectId("63c6f1295236f55c0113f765"),
            nombre: 'Botines Joma Top Flex Rebound'
          }
        ]

        // III) LISTAR LOS PRODUCTOS CON PRECIO MAYOR A 3000 PESOS //
        ecommerce> db.productos.find({precio: {$gt: 3000}}, {"nombre": 1});
        [
          {
            _id: ObjectId("63c6f0455236f55c0113f75c"),
            nombre: 'Botines Munich G3'
          },
          {
            _id: ObjectId("63c6f0455236f55c0113f75e"),
            nombre: 'Botines Kelme Indoor Copa'
          },
          {
            _id: ObjectId("63c6f0455236f55c0113f760"),
            nombre: 'Botines Kelme Elite'
          },
          {
            _id: ObjectId("63c6f0455236f55c0113f763"),
            nombre: 'Botines Nike Street Gato'
          }
        ] 
        
        // IV) REALIZAR UNA CONSULTA QUE TRAIGA SOLO EL NOMBRE DEL TERCER PRODUCTO MAS BARATO //
        ecommerce> db.productos.find({}).sort({"precio":1}).skip(2).limit(1);
        [
          {
            _id: ObjectId("63c6f0455236f55c0113f762"),
            nombre: 'Botines Nike Premier II',
            descripcion: 'Botines Nike Premier II Negros',
            codigo: 8,
            precio: 700,
            imagen: 'https://res.cloudinary.com/proyectofutsal/image/upload/v1665765182/ProyectoReactJs/botinesNikePremier2_zku69f.jpg'
          }
        ] 

    // c) HACER UNA ACTUALIZACION SOBRE TODOS LOS PRODUCTOS, AGREGANDO EL CAMPO STOCK A TODOS ELLOS CON UN VALOR DE 100 //
    ecommerce> db.productos.updateMany({}, {$set: {"stock": 100}}, {upsert: true});
    {
      acknowledged: true;
      insertedId: null;
      matchedCount: 11;
      modifiedCount: 11;
      upsertedCount: 0
    }
    
    // d) CAMBIAR EL STOCK A CERO DE LOS PRODUCTOS CON PRECIOS MAYORES A 4000 PESOS //
    db.productos.update({precio: {$gt: 4000}}, {$set: {"stock": 0}}, {multi: true})
    {
      acknowledged: true;
      insertedId: null;
      matchedCount: 1;
      modifiedCount: 0;
      upsertedCount: 0
    }

    // e) BORRAR LOS PRODUCTOS CON PRECIO MENOR A 1000 PESOS //
    ecommerce> db.productos.deleteMany({precio: {$lt: 1000}});
    { acknowledged: true; deletedCount: 3 }


// 6) CREAR UN USUARIO 'pepe' CLAVE: 'asd456' QUE SOLO PUEDA LEER LA BASE DE DATOS ECOMMERCE. VERIFICAR QUE pepe NO PUEDA CAMBIAR LA INFORMACION //
ecommerce> db.createUser(
   {
    user: "pepe",
    pwd: "asd456",
    roles: [
       {role: "read", db: "ecommerce"}
    ]
   }
 )
{ ok: 1 }    