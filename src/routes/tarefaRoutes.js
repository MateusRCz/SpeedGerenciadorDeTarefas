const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');
const { verificaToken } = require('../middlewares/authMiddleware');

// NÃO exige token
router.get('/', tarefaController.getAllTarefas);
router.get('/:id', tarefaController.getTarefaById);

// POST e PUT exige token
router.post('/', verificaToken, tarefaController.createTarefa);
router.put('/:id', verificaToken, tarefaController.updateTarefa);

// DELETE exige token
router.delete('/:id', verificaToken, tarefaController.deleteTarefa);

module.exports = router;