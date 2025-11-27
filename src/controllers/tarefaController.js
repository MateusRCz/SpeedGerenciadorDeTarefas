const Tarefa = require('../models/tarefaModel');

exports.getAllTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.findAll();
    res.status(200).json(tarefas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter tarefas" });
  }
};

exports.getTarefaById = async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);

    if (!tarefa) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    res.status(200).json(tarefa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefa" });
  }
};

exports.createTarefa = async (req, res) => {
  try {
    const { titulo, descricao, concluida } = req.body;

    if (!titulo || titulo.trim().length < 3) {
      return res.status(400).json({ message: "Título inválido" });
    }

    const nova = await Tarefa.create({
      titulo,
      descricao,
      concluida: concluida ?? false,
      usuarioId: req.usuario.id
    });

    res.status(201).json(nova);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
};

exports.updateTarefa = async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);

    if (!tarefa) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    if (tarefa.usuarioId !== req.usuario.id && req.usuario.role !== "admin") {
      return res.status(403).json({ message: "Sem permissão" });
    }

    await tarefa.update(req.body);

    res.status(200).json(tarefa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
};

exports.deleteTarefa = async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);

    if (!tarefa) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    if (tarefa.usuarioId !== req.usuario.id && req.usuario.role !== "admin") {
      return res.status(403).json({ message: "Sem permissão" });
    }

    await tarefa.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar tarefa" });
  }
};
