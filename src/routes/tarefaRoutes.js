const express = require("express");
const router = express.Router();

const tarefaController = require("../controllers/tarefaController");

const { verificaToken } = require('../middlewares/authMiddleware');

// Rotas públicas
router.get("/", tarefaController.listarTodos); //ok
router.get("/:id", tarefaController.buscarPorId); //ok

//Rotas protegidas
router.post("/", verificaToken, tarefaController.criar); //ok
router.put("/:id", verificaToken, tarefaController.atualizar);
router.delete("/:id", verificaToken, tarefaController.deletar); //ok

module.exports = router;
