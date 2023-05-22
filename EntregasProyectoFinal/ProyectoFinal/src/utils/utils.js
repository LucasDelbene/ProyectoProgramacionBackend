//UTILIDADES//

//IMPORTO bCrypt PARA PODER UTILIZARLO//
import bCrypt from 'bcrypt';

//FUNCION PARA CREAR HASHEO DE CONTRASEÑA//
const createHash = password =>{
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

//FUNCION PARA VALIDAR CONTRASEÑA//
const isValidPassword = (userPassword, password)=>{
    return bCrypt.compareSync(password, userPassword);
};

export {createHash, isValidPassword};