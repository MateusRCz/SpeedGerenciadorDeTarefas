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
    return await UsuarioModelDef.findAll({ raw: true });
  },

  findById: async (id) => {
    return await UsuarioModelDef.findByPk(id, { raw: true });
  },

  findOne: async (filtro) => UsuarioModelDef.findOne(filtro),

  //findByEmail: async (email) => {
   // return await UsuarioModelDef.findOne({ where: { email }, raw: true });
  //},

  create: async (usuarioData) => {
  const novo = await UsuarioModelDef.create(usuarioData);
  return novo.get({ plain: true });
}

};

module.exports = usuarioModel;