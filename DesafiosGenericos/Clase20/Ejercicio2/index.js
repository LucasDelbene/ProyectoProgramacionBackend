//CONEXION A MongoDB ATLAS//

//IMPORTO mongoose y usuarios.js PARA PODER UTILIZARLOS//
import mongoose from "mongoose";
import usuarioModel from "./models/usuarios.js";

const conexion = mongoose.connect('mongodb+srv://LucasDelbene:Lucas44211776@clase20-programacionbac.kbx1zkq.mongodb.net/?retryWrites=true&w=majority', error =>{
    if(error) console.log(error);
    else console.log('BASE CONECTADA CON EXITO');
})

//EJECUTO UNA OPERACION//
const CRUD = async() =>{
    usuarioModel.create({nombre:"Neymar", email:"neymar@gmail.com", contraseña:"2019"})
}
CRUD();