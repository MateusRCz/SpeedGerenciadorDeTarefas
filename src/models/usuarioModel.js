const { DataTypes } = require('sequelize');
const db = require('../database.js');

// Define o modelo Sequelize (vai ser criado apenas quando sync for executado)
const UsuarioModelDef = db.define('Usuario', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  senha: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'usuarios',
  timestamps: false
});

// Mantemos a API antiga (mesmos nomes de função) mas usando Sequelize por baixo
const usuarioModel = {
  findAll: async () => {
    const rows = await UsuarioModelDef.findAll({ raw: true });
    return rows;
  },

  findById: async (id) => {
    const row = await UsuarioModelDef.findByPk(id, { raw: true });
    return row;
  },

  findByEmail: async (email) => {
    const row = await UsuarioModelDef.findOne({ where: { email }, raw: true });
    return row;
  },

  create: async (nome, email, senha, role) => {
    const novo = await UsuarioModelDef.create({ nome, email, senha, role });
    return { id: novo.id, nome: novo.nome, email: novo.email, senha: novo.senha, role: novo.role };
  }
};

module.exports = usuarioModel;