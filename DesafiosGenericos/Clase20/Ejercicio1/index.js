//IMPORTO firebase-admin y credenciales.json PARA PODER UTILIZARLOS//
import admin from 'firebase-admin';
import firebaseConfiguracion from './credenciales.json' assert{type:'json'};

const firebaseCRUD = async() =>{
    admin.initializeApp({
        credential:admin.credential.cert(firebaseConfiguracion)
    })

    const db = admin.firestore();
    const usuarios = db.collection('usuarios');

    //CREAR UN USUARIO//
    const documento = usuarios.doc();
    await documento.create({nombre:"Messi", email: "lionelmessi@gmail.com", contraseña:"2010"})

    //LEER UN USUARIO//
    const snapShot = await usuarios.get();
    const documentos = snapShot.docs;
    const resultado = documentos.map(documento =>({
        id: documento.id,
        nombre: documento.data().nombre,
        email: documento.data().email
    }))
    console.log(resultado);
}
firebaseCRUD();


