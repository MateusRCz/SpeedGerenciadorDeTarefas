require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'minhasenhasecreta';

app.use(express.json());

/* ----------------------------------------
   DADOS EM MEMÓRIA
------------------------------------------- */
let usuarios = [
    { id: 1, email: 'abrahamlincoln@gmail.com', nome: 'Abraham', password: '123', role: 'user'},
    { id: 2, email: 'albertelnstein@gmail.com', nome: 'Albert', password: '123', role: 'user'},
    { id: 3, email: 'nikolatesla@gmail.com', nome: 'Nikola', password: '123', role: 'admin'},
];

let tarefas = [
    { id: 1, titulo: 'Biologia', descricao: '', concluida: false, usuarioId: 1 },
    { id: 2, titulo: 'Química', descricao: '', concluida: false, usuarioId: 2 },
    { id: 3, titulo: 'Matemática', descricao: '', concluida: false, usuarioId: 1 },
];

const nextTarefaId = () =>
    tarefas.length ? Math.max(...tarefas.map(t => t.id)) + 1 : 1;


/* ----------------------------------------
   FUNÇÃO DE LOGIN (POST /login)
------------------------------------------- */
const logar = (req, res) => {
    const { email, password } = req.body;

    // Validar entrada
    if (!email || !password) {
        return res.status(400).json({ message: "Email e password são obrigatórios." });
    }

    const usuario = usuarios.find(u => u.email === email);
    if (!usuario) {
        return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const senhaValida = usuario.password === password;
    if (!senhaValida) {
        return res.status(401).json({ message: "Credenciais inválidas." });
    }

    try {
        const token = jwt.sign(
            { id: usuario.id, nome: usuario.nome, role: usuario.role },
            JWT_SECRET,
            { expiresIn: '5m' }
        );

        res.status(200).json({
            message: "Login bem-sucedido!",
            token: token
        });
    } catch (err) {
        res.status(500).json({ message: "Erro ao gerar token.", erro: err.message });
    }
};


/* ----------------------------------------
   MIDDLEWARE: AUTENTICAR TOKEN
------------------------------------------- */
const autenticar = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
};


/* ----------------------------------------
   OPCIONAL: MIDDLEWARE PARA ADMIN
------------------------------------------- */
const authorizeRoles = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: 'Não autorizado. Apenas admins podem executar esta ação.' });
    }
    next();
};


/* ----------------------------------------
   ROTAS
------------------------------------------- */
app.post("/login", logar);

app.get("/api/tarefas", autenticar, (req, res) => {
    res.json(tarefas);
});

app.post("/api/tarefas", autenticar, (req, res) => {
    const { titulo, descricao } = req.body;

    // Validações
    if (!titulo) {
        return res.status(400).json({ message: 'Título é obrigatório.' });
    }

    if (titulo.trim().length < 3) {
        return res.status(400).json({ message: 'Título deve ter no mínimo 3 caracteres.' });
    }

    try {
        const nova = {
            id: nextTarefaId(),
            titulo: titulo.trim(),
            descricao: (descricao || "").trim(),
            concluida: false,
            usuarioId: req.user.id,
            dataCriacao: new Date().toISOString()
        };

        tarefas.push(nova);
        res.status(201).json({ message: "Tarefa criada com sucesso!", tarefa: nova });
    } catch (err) {
        res.status(500).json({ message: "Erro ao criar tarefa.", erro: err.message });
    }
});

// Rota de health check
app.get("/", (req, res) => {
    res.json({ mensagem: "API To-Do funcionando!", versao: "1.0.0" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log("Pressione Ctrl+C para parar.");
});

module.exports = { app, usuarios, tarefas };
