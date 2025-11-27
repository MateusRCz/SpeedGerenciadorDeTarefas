const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController'); //Lógica de usuários

router.post('/criar', usuarioController.criarUsuario); //Rota para criar novo usuário

router.post('/login', usuarioController.login); //Rota para logar um usuário existente

module.exports = router;