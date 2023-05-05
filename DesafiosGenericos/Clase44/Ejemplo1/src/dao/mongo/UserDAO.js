//IMPORTO userModel PARA PODER UTILIZARLO//
import userModel from './models/user.js';

export default class UserDao {

    getUsers = (params) =>{
        return userModel.find(params).lean();
    }

    getUserBy = (params) =>{
        return userModel.findOne(params).lean();
    }

    createUser = (user) =>{
        return userModel.create(user);
    }

    //DROP LO QUE VA A HACER, ES QUE DEL MODELO DE USUARIO QUE YO TENGO LA IDEA ES QUE SE VACIE CUANDO YO LE DE LA DIRECTIVA
    drop = ()=>{
        return userModel.collection.drop();    
    }
}