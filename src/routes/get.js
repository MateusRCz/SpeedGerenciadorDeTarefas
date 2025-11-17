const express = require('express');
const app = express();
const PORT = 8080

app.use(express.json());

const tarefas = [
    {id: 1, nome: 'Lavar Louca', descricao: 'Cozinha', feito: true},
    {id: 2, nome: 'Aspirar o chao', descricao: 'Casa', feito: false},
    {id: 3, nome: 'Instalar a TV', descricao: 'Quarto', feito: true},
    {id: 4, nome: 'Limpar banheiros', descricao: 'Banheiro', feito: true},
]
app.get('/api/tarefas', (req, res) => {
    try {
        res.status(200).json(tarefas);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({error: "Erro ao obter a(s) tarefa(s)"});
    }
})

/* app.post('/api/tarefas', (req, res) => {
    const {nome, descricao, feito} = req.body;

    if (!nome || !descricao) {
        return res.status(400).json({error: 'Erro! O nome e/ou descrição da tarefa não foram definidos'});
    }

    const novaTarefa = {
        id: tarefas.length + 1,
        nome,
        descricao,
        feito: feito || false
    };

    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});
}) */

app.listen(PORT, () => {
    console.log('Server started on port: ' + PORT);
})