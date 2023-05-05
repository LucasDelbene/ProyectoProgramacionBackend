//IMPORTO MongoClient DESDE mongodb PARA PODER UTILIZARLO//
import {MongoClient} from 'mongodb';

const filter = {
  'apellido': 'Jobs'
};

const client = await MongoClient.connect(
  'mongodb://127.0.0.1:27017/',
  {useNewUrlParser: true, useUnifiedTopology: true}
);
console.log("CONECTADO A MONGO CON EXITO")

const coll = client.db('colegio').collection('estudiantes');
const cursor = coll.find(filter).limit(1).skip(3);
const result = await cursor.toArray();
console.log(result);

await client.close();