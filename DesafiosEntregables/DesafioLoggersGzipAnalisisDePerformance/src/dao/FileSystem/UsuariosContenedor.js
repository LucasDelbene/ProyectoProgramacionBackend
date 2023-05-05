//IMPORTO fs y __dirname PARA PODER UTILIZARLOS//
import fs from 'fs';
import __dirname from '../../utils.js';

export default class Usuarios {
    constructor() {
        this.path = `${__dirname}/files/usuarios.json`;
        this.init();
    }

    init = async () => {
        if (!fs.existsSync(this.path)) await fs.promises.writeFile(this.path, JSON.stringify([]));
    }

    readFile = async () => {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(data);
    }

    get = () => {
        return this.readFile();
    }

    getBy = async(params) => {
        const users = await this.readFile();
        const paramKeys =  Object.keys(params);
        const user = users.find(u=>{
            let flag = true;
            paramKeys.forEach(param=>{
                if(params[param]!==u[param]){
                    flag = false;
                }
            })
            return flag;
        })
        return user;
    }

    save = async (user) => {
        const users = await this.readFile();
        user.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        users.push(user);
        await fs.promises.writeFile(this.path,JSON.stringify(users,null,'\t'));
        return user;
    }

}