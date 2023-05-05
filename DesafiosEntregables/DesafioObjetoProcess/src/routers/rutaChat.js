//IMPORTO Router DE express PARA PODER UTILIZARLO//
import {Router} from 'express';
import getChat from '../controller/chatController.js';

const rutaChat = Router();
rutaChat.get('/', getChat);

export default rutaChat;