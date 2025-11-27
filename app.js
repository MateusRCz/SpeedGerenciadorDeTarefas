require('dotenv').config() //Carrega as variáveis de ambiente
const express = require("express"); //Importação do express
const app = express(); //Instância
const PORT = 3000;

console.log(process.env.JWT_SECRET);
console.log(process.env.DBSOURCE);

app.use(express.json());
const db = require('./src/database');
// Requer os modelos para que o Sequelize os registre antes da sincronização
require('./src/models/usuarioModel');
require('./src/models/tarefaModel');

const tarefaRoutes = require("./src/routes/tarefaRoutes"); //importação Rota de tarefas
const usuarioRoutes = require('./src/routes/usuarioRoutes'); //importação Rota de usuários

app.use("/api/tarefas", tarefaRoutes);  //Rota de tarefas
app.use("/api/usuarios", usuarioRoutes); //Rota de usuários

//Rota de teste
app.get("/", (req, res) => {
  res.send("Bem vindo à nossa API de Gerenciar Tarefas!");
});

app.get("/sobre", (req, res) => {
  res.send('Esta é a página "Sobre" da nossa aplicação.');
});

async function startServer() {
  try {
    await db.sync(); // sincroniza modelos com o banco (cria/atualiza tabelas se necessário)
    console.log('Modelos sincronizados com o banco de dados.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log("Para parar o servidor, pressione Ctrl+C no terminal.");
    });
  } catch (err) {
    console.error('Erro ao sincronizar o banco de dados:', err);
  }
}

startServer();
