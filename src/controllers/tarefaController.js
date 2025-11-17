let tarefas = [
  { id: 1, titulo: "Biologia", descricao: "", concluida: false },
  { id: 2, titulo: "Química", descricao: "", concluida: false },
  { id: 3, titulo: "Matemática", descricao: "", concluida: false },
];

let nextId = 4;

exports.listarTodos = (req, res) => {
  try {
    res.status(200).json(tarefas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao obter a(s) tarefa(s)" });
  }
};

exports.buscarPorId = (req, res) => {
  try {
    const { id } = req.params;
    const tarefa = tarefas.find((t) => t.id === parseInt(id));

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada." });
    }

    res.status(200).json(tarefa);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao buscar a tarefa." });
  }
};

exports.criar = (req, res) => {};

exports.atualizar = (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, concluida } = req.body;

    // Busca a tarefa pelo ID
    const tarefa = await Tarefa.findById(id);
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

exports.deletar = (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = tarefas.length; //Uso somente com array

  tarefas = tarefas.filter((p) => p.id !== id);

  //Filtra o array, removendo o produto com o ID especificado.
  if (tarefas.length < initialLength) {
    //Se o produto foi removido, retorna status 204 (No Content).
    res.status(204).send(); // send() corpo para 204
  } else {
    //Se o produto não foi encontrado para exclusão, retorna 404.
    res.status(404).json({ message: "Tarefa não encontrada para exclusão." });
  }
};
