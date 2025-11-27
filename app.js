require('dotenv').config();
const express = require("express");
const { sequelize } = require('./src/database'); // importa a instância correta
const app = express();

app.use(express.json());

const tarefaRoutes = require("./src/routes/tarefaRoutes");
const usuarioRoutes = require("./src/routes/usuarioRoutes");

app.use("/api/tarefas", tarefaRoutes);
app.use("/api/usuarios", usuarioRoutes);

//Rota de teste
app.get("/", (req, res) => {
  res.send("Bem vindo à nossa API de Gerenciar Tarefas!");
});

app.get("/sobre", (req, res) => {
  res.send('Esta é a página "Sobre" da nossa aplicação.');
});

// Health check
app.get('/api/health-check', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = app;