//REQUIERO express y getChat PARA PODER UTILIZARLOS//
const {Router} = require('express');
const {getChat} = require('../controller/chatController.js');

const rutaChat = Router();
rutaChat.get('/', getChat);

module.exports = rutaChat;