const {Router} = require("express");
const {getChat} = require('../controller/chatController');

const rutaChat = Router();
rutaChat.get('/', getChat);

module.exports = rutaChat;