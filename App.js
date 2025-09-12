const express = require('express');
const app = express();
const PORT = 3000;

app.use(express .json());

let produtos = [
    {id: 1, nome: 'Teclado Mecânico', preco: 450.00},
    {id: 2, nome: 'MOuse razer', preco: 150.00},
    {id: 3, nome: 'Monitor 144hz', preco: 1200.00},
];
let nextId = 4;

app.get('/', (req,res) => {
    res.send('Bem-vindo à nossa primeira API Back-end com Express!');
});

app.get('/sobre', (req,res) => {
    res.send('Esta é a página "sobre" da nossa API');
});

app.get('/app/produtos', (req,res) =>{
    res.json(produtos);
});

app.post('/api/produtos', (req, res) => {

    const {nome, preco} = req.body;

    if (!nome || preco === undefined){
        return res.status(400).json({message:'Nome e preço são obrigatórios.'})
    }

    const novoProduto = {
        id: nextID++,
        nome,
        preco
    };

    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
})


app.listen(PORT, () => {

    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('Para parar o sevidor, pressione Crtl+C no terminal.');
});


