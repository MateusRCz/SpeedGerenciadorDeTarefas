const { Sequelize } = require('sequelize');

// Mantemos o nome `db` para não precisar alterar os require existentes
const db = new Sequelize({
	dialect: 'sqlite',
	storage: process.env.DBSOURCE || 'meu_banco.db',
	logging: false
});

async function testConnection() {
	try {
		await db.authenticate();
		console.log('Conexão com o Sequelize (SQLite) estabelecida com sucesso.');
	} catch (error) {
		console.error('Não foi possível conectar ao banco de dados:', error);
	}
}

testConnection();

module.exports = db;


