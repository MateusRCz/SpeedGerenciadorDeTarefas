const express = require('express');
const router = express.Router();

const tarefaController = require('../controllers/tarefaController');
const { verificaToken } = require('../middlewares/authMiddleware');

router.post('/', verificaToken, tarefaController.createTarefa);
router.get('/', tarefaController.getAllTarefas);

module.exports = router;
