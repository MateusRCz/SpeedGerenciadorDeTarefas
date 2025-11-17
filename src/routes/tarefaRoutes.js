const express = require("express");
const router = express.Router();

const tarefaController = require("../controllers/tarefaController");

const { verificaToken } = require('../middlewares/authMiddleware');

// Rotas públicas
router.get("/", tarefaController.listarTodos);
router.get("/:id", tarefaController.buscarPorId);

//Rotas protegidas
router.post("/", verificaToken, tarefaController.criar);
router.put("/:id", verificaToken, tarefaController.atualizar);
router.delete("/:id", verificaToken, tarefaController.deletar);

module.exports = router;
