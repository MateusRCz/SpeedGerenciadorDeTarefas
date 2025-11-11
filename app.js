// Atualizar uma tarefa existente (requer autenticação)
app.put("/api/tarefas/:id", autenticar, async (req, res) => {
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
      return res.status(403).json({ erro: "Acesso negado. Você não pode editar esta tarefa." });
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
});
