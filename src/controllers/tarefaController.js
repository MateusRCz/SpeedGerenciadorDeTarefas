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
    const tarefa = await Tarefa.findById(req.params.id);

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
      userId: req.usuario.id
    });

    res.status(201).json(nova);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
};

exports.updateTarefa = async (req, res) => {
  try {
    const tarefa = await Tarefa.findById(req.params.id);

    if (!tarefa) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    if (tarefa.userId !== req.usuario.id && req.usuario.role !== "admin") {
      return res.status(403).json({ message: "Sem permissão" });
    }

    await Tarefa.update(
      req.params.id,
      req.body.titulo ?? tarefa.titulo,
      req.body.descricao ?? tarefa.descricao,
      req.body.concluida ?? tarefa.concluida
    );

    res.status(200).json({ message: "Tarefa atualizada com sucesso" });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
};

exports.deleteTarefa = async (req, res) => {
  try {
    const tarefa = await Tarefa.findById(req.params.id);

    if (!tarefa) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    if (tarefa.userId !== req.usuario.id && req.usuario.role !== "admin") {
      return res.status(403).json({ message: "Sem permissão" });
    }

    await Tarefa.delete(req.params.id);

    return res.status(200).json({ message: "Tarefa deletada com sucesso" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao deletar tarefa" });
  }
};