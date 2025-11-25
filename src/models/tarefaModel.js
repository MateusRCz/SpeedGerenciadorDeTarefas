const { DataTypes } = require('sequelize');
const db = require('../database.js');

// Definição do modelo Sequelize para `tarefas`
const TarefaModelDef = db.define('Tarefa', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titulo: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: true },
  concluida: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  userId: { type: DataTypes.INTEGER, allowNull: true }
}, {
  tableName: 'tarefas',
  timestamps: false
});

// Mantemos a API antiga (mesmos nomes de função) mas usando Sequelize
const tarefaModel = {
  findAll: async () => {
    const rows = await TarefaModelDef.findAll({ raw: true });
    return rows;
  },

  findById: async (id) => {
    const row = await TarefaModelDef.findByPk(id, { raw: true });
    return row;
  },

  create: async (titulo, descricao, concluida, userId) => {
    const novo = await TarefaModelDef.create({ titulo, descricao, concluida, userId });
    return { id: novo.id, titulo: novo.titulo, descricao: novo.descricao, concluida: novo.concluida, userId: novo.userId };
  },

  update: async (id, titulo, descricao, concluida) => {
    const [affectedCount] = await TarefaModelDef.update({ titulo, descricao, concluida }, { where: { id } });
    return { changes: affectedCount };
  },

  delete: async (id) => {
    const deleted = await TarefaModelDef.destroy({ where: { id } });
    return { changes: deleted };
  }
};

module.exports = tarefaModel;