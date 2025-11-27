const app = require('./app');
const db = require('./src/database');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await db.sync();
    console.log('Modelos sincronizados com o banco de dados.');

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log("Para parar o servidor, pressione Ctrl+C.");
    });

  } catch (err) {
    console.error('Erro ao sincronizar o banco de dados:', err);
  }
}

start();
