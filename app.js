const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let produtos = [
  { id: 1, nome: 'Teclado Mecânico', preco: 450.00 },
  { id: 2, nome: 'Mouse Gamer', preco: 150.00 },
  { id: 3, nome: 'Monitor UltraWide', preco: 1200.00 }
];
let nextId = 4;

//GET

app.get('/', (req, res) => {
  res.send('Bem-vindo à nossa primeira API Back-End com Express!');
});

app.get('/sobre', (req, res) => {
  res.send('Esta é a página "Sobre" da nossa aplicação.');
});

app.get('/api/produtos', (req, res) => {
  res.json(produtos);
});

app.get('/api/produtos/:id', (req, res) => {
  const idProduto = parseInt(req.params.id);
  const produtoEncontrado = produtos.find(p => p.id === idProduto);

  if (produtoEncontrado) {
    res.json(produtoEncontrado);
  } else {
    res.status(404).send('Produto não encontrado.');
  }
});

//POST

app.post('/api/produtos', (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || preco === undefined) {
    return res.status(400).json({ message: 'Nome e preço são obrigatórios.' });
  }

  const novoProduto = {
    id: nextId++,
    nome,
    preco
  };

  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

//PUT

app.put('/api/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produtoIndex = produtos.findIndex(p => p.id === id);

  if (produtoIndex !== -1) {
    const { nome, preco } = req.body;

    if (!nome && preco === undefined) {
      return res.status(400).json({ message: 'Pelo menos um campo (nome ou preco) deve ser fornecido.' });
    }

    produtos[produtoIndex] = {
      ...produtos[produtoIndex],
      nome: nome !== undefined ? nome : produtos[produtoIndex].nome,
      preco: preco !== undefined ? preco : produtos[produtoIndex].preco
    };

    res.json(produtos[produtoIndex]);
  } else {
    res.status(404).json({ message: 'Produto não encontrado para atualização.' });
  }
});

//DELETE

app.delete('/api/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = produtos.length;

  produtos = produtos.filter(p => p.id !== id);

  if (produtos.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Produto não encontrado para exclusão.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Para parar o servidor, pressione Ctrl+C no terminal.');
});


