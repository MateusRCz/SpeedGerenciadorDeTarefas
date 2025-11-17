require("dotenv").config(); //Carrega as variáveis de ambiente
const express = require("express"); //Importação do express
// const jwt = require('jsonwebtoken'); //Biblioteca para JWT
// const bcrypt = require('bcryptjs'); //Biblioteca para Hash de Senhas
const app = express(); //Instância
const PORT = 3000;

app.use(express.json());

const tarefaRoutes = require("./routes/tarefaRoutes");
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use("/api/tarefas", tarefaRoutes);
app.use("/api/usuarios", usuarioRoutes);

//Rota de teste
app.get("/", (req, res) => {
  res.send("Bem vindo à nossa primeira API Back-End com Express!");
});

app.get("/sobre", (req, res) => {
  res.send('Esta é a página "Sobre" da nossa aplicação.');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log("Para parar o servidor, pressione Ctrl+C no terminal.");
});
