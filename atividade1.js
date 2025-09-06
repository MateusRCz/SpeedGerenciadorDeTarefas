const express = require('express');
const app = express();
const PORT = 8080

app.listen(PORT, () => {
    console.log('Server started on port: ' + PORT);
})

const tarefas = [
    {id: 1, nome: 'Lavar Louca', local: 'Cozinha'},
    {id: 2, nome: 'Aspirar o chao', local: 'Casa'},
    {id: 3, nome: 'Instalar a TV', local: 'Quarto'},
    {id: 4, nome: 'Limpar banheiros', local: 'Banheiro'}
]
app.get('api/tarefas', (req, res) => {
    res.json(tarefas);
})

app.post('api/tarefas', (req, res) => {
    const {nome, local} = req.body;

    if (!nome || !local === undefined) {
        return 'Erro! O nome e/ou local da tarefa nao foram definidos';
    }

    res.json(tarefas);
})