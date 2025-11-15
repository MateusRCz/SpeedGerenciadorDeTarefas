app.get("/api/tarefas/:id", autenticar, async (req, res) => {
  try {
    const { id } = req.params;
    const tarefa = tarefas.find(t => t.id === parseInt(id));

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada." });
    }  
     
    res.status(200).json(tarefa);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao buscar a tarefa." });
  }
});