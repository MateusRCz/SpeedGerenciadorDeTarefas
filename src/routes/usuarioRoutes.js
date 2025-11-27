const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.getAllUsuarios);
router.post('/criar', usuarioController.criarUsuario);
router.post('/login', usuarioController.login);

module.exports = router;