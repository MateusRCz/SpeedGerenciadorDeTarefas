const express = require("express"); 
const router = express.Router();

const tarefaController = require("../controllers/tarefaController"); //Lógica das tarefas

const { verificaToken } = require('../middlewares/authMiddleware'); // Middleware de autenticação de token
const { authorizeRoles } = require("../middlewares/authorizeRoles"); //MiddleWare de autorização de tipo de usuário

// Rotas públicas
router.get("/", tarefaController.listarTodos); // Rota de visualizar todas as tarefas
router.get("/:id", tarefaController.buscarPorId); // Rota de visualizar apenas uma tarefa específica

//Rotas protegidas
router.post("/", verificaToken, authorizeRoles(["admin"]), tarefaController.criar); //Rota de criar nova tarefa
router.put("/:id", verificaToken, authorizeRoles(["admin"]), tarefaController.atualizar); //Rota de atualizar uma tarefa
router.delete("/:id", verificaToken, authorizeRoles(["admin"]), tarefaController.deletar); //Rota de deletar uma tarefa

module.exports = router;
