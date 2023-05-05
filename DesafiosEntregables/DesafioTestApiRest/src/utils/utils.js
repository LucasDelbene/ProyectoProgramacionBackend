//UTILIDADES//

//IMPORTO bcrypt PARA PODER UTILIZARLO//
import bcrypt from 'bcrypt';

//FUNCION CREAR HASHEO//
const createHash = contraseña=>{
    return bcrypt.hashSync(contraseña, bcrypt.genSaltSync(10), null);
};

//FUNCION VALIDAR CONTRASEÑA//
const isValidPassword = (usuarioContraseña, contraseña)=>{
    return bcrypt.compareSync(contraseña, usuarioContraseña);
};

export default {createHash, isValidPassword};

