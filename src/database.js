const { Sequelize, DataTypes } = require("sequelize");

const DBSOURCE = process.env.DBSOURCE || "./database.sqlite";

// Cria instância do Sequelize
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: DBSOURCE,
  logging: false,
});

// Define modelo de tarefas
const Tarefa = sequelize.define("Tarefa", {
  titulo: { type: DataTypes.STRING(100), allowNull: false },
  descricao: { type: DataTypes.TEXT },
  concluida: { type: DataTypes.BOOLEAN, defaultValue: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

// Define modelo de usuários
const Usuario = sequelize.define("Usuario", {
  nome: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  senha: { type: DataTypes.STRING(100), allowNull: false },
  role: { type: DataTypes.STRING(20), allowNull: false },
});

module.exports = { sequelize, Tarefa, Usuario };
