const tarefaModel = require('../models/tarefaModel');

// let tarefas = [
//   { id: 1, titulo: "Biologia", descricao: "", concluida: false },
//   { id: 2, titulo: "Química", descricao: "", concluida: false },
//   { id: 3, titulo: "Matemática", descricao: "", concluida: false },
// ];

// let nextId = 4;

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

  try {
    const { id } = req.params;
    const { titulo, descricao, concluida } = req.body;

    // Busca a tarefa pelo ID
    const tarefa = await tarefaModel.findById(id);
    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada." });
    }

    // Verifica se o usuário autenticado é o dono da tarefa
    if (tarefa.usuarioId !== req.usuario.id) {
      return res
        .status(403)
        .json({ erro: "Acesso negado. Você não pode editar esta tarefa." });
    }

    // Atualiza apenas os campos enviados
    if (titulo !== undefined) tarefa.titulo = titulo;
    if (descricao !== undefined) tarefa.descricao = descricao;
    if (concluida !== undefined) tarefa.concluida = concluida;

    const tarefaAtualizada = await tarefa.save();
    res.status(200).json(tarefaAtualizada);
  } catch (erro) {
    console.error(erro);
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
