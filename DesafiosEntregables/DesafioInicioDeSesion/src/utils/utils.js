//IMPORTO fileURLToPath, dirname y bcrypt PARA PODER UTILIZARLOS//
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const crearHash = async(password) =>{
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts)
}
export const validarContraseña = async(password,usuarioContraseña) =>{
    return bcrypt.compare(password,usuarioContraseña);
}

export default __dirname;
