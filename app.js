//Importação do express
const express = require('express');

const app = express(); //Instância

const PORT = 3000;

// Nosso "banco de dados" em memória
//O nome não é tipo primitivo, matriz 
let produtos = [
    { id: 1, nome: 'Teclado Mecânico', preco: 450.00 },
    { id: 2, nome: 'Mouse Gamer', preco: 150.00 },
    { id: 3, nome: 'Monitor UltraWide', preco: 1200.00 },
];

let nextId = 4; // Começa com o próximo ID disponível

app.get('/', (req, res) =>{
    res.send('Bem vindo à nossa primeira API Back-End com Express!');
});

app.get('/sobre', (req, res) =>{
    res.send('Esta é a página "Sobre" da nossa aplicação.');
});

app.get('/api/produtos', (req, res) =>{
    res.json(produtos);
});

app.get('/api/produtos:id', (req, res) =>{
    res.json(produtos.id);
});


////////////////////////////////////////////////////

app.post('/api/produtos', (req, res) =>{

    //ARRAY atribuindo ao corpo da requisição
    const { nome, preco } = req.body; 

    //Validação simples: verifica se nome e preco foram fornecidos.
    if(!nome || preco === undefined){
        return res.status(400).json({ message: 'Nome e preco são obrigatórios'});
    }


    const novoProduto = {
        id: nextId++,
        nome,
        preco
    };

    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
});


// Inicia o servidor
app.listen(PORT, () => {
    
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log("Para parar o servidor, pressione Ctrl+C no terminal.");

});