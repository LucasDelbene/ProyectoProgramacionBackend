import usuarioModel from '../../models/Usuario.js';

export default class Usuarios {

    get = () =>{
        return usuarioModel.find();
    }

    getBy = (params) =>{
        return usuarioModel.findOne(params);
    }

    save = (user) =>{
        return usuarioModel.create(user);
    }
}