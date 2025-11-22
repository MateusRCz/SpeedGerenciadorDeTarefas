const tarefaModel = require('../models/tarefaModel');

exports.listarTodos = async (req, res) => {
  try {
    //Chama o Model para buscar os dados
    const tarefas = await tarefaModel.findAll();
    res.status(200).json(tarefas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao obter a(s) tarefa(s)" });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const tarefa = await tarefaModel.findById(id);

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada." });
    }

    res.status(200).json(tarefa);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao buscar a tarefa." });
  }
};

exports.criar = async (req, res) => {
  const { titulo, descricao, concluida } = req.body;

    // Validações
    if (!titulo) {
        return res.status(400).json({ message: 'Título é obrigatório.' });
    }

    if (titulo.trim().length < 3) {
        return res.status(400).json({ message: 'Título deve ter no mínimo 3 caracteres.' });
    }

    try {
        const novaTarefa = await tarefaModel.create(titulo, descricao, concluida);

        res.status(201).json({ message: "Tarefa criada com sucesso!", novaTarefa });
    } catch (err) {
        res.status(500).json({ message: "Erro ao criar tarefa.", erro: err.message });
    }
};

exports.atualizar = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, concluida } = req.body;

  if(!titulo || !descricao || concluida === undefined){
    return res.status(400).json({ message: 'Os campos: título, descricao e concluido são obrigatórios.' });
  }

  try {
    const result = await tarefaModel.update(id, titulo, descricao, concluida);

    if (result.changes > 0) {
      res.json({ id, titulo, descricao, concluida});
    } else {
      res.status(404).json({ message: 'Tarefa não encontrado para atualização. '});
    }

  } catch (err) {
    res.status(500).json({ erro: "Erro ao atualizar a tarefa." });
  }
};

exports.deletar = async(req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await tarefaModel.delete(id);
    if(result.changes > 0){
      res.status(204).send(); // Sucesso, sem conteúdo
    } else {
      res.status(404).json({ message: 'Tarefa não encontrado para exclusão.' });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor ao deletar tarefa." })
  }
};
