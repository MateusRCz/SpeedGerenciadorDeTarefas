const { sequelize } = require('./src/database');
const app = require('./app');
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.sync({ force: false }); // force:true recria tabelas
    console.log("Modelos sincronizados com o banco de dados.");

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao sincronizar modelos:", error);
  }
}

startServer();