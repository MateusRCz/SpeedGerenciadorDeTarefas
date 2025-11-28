require('dotenv').config();

const app = require('./app');
const db = require('./src/database');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log("Sincronizando banco de dados...");
    await db.sync();

    console.log("Banco de dados sincronizado.");

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Erro ao inicializar o servidor:");
    console.error(error);
    process.exit(1);
  }
}

startServer();