// src/controllers/produtoController.js

// Por enquanto, nossos dados continuarão em memória aqui.
let produtos = [
  { id: 1, nome: 'Teclado Mecânico', preco: 450.00 },
  { id: 2, nome: 'Mouse Gamer', preco: 150.00 },
  { id: 3, nome: 'Monitor UltraWide', preco: 1200.00 }
];
let nextId = 4;

// Função para listar todos os produtos
exports.listarTodos = (req, res) => {
  res.json(produtos);
};

// Função para buscar um produto por ID
exports.buscarPorId = (req, res) => {
  const idProduto = parseInt(req.params.id);
  const produtoEncontrado = produtos.find(p => p.id === idProduto);
  if (produtoEncontrado) {
    res.json(produtoEncontrado);
  } else {
    res.status(404).send('Produto não encontrado.');
  }
};

// Função para criar um novo produto
exports.criar = (req, res) => {
  const { nome, preco } = req.body;
  if (!nome || preco === undefined) {
    return res.status(400).json({ message: 'Nome e preço são obrigatórios.' });
  }
  const novoProduto = { id: nextId++, nome, preco };
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
};

// Função para atualizar um produto
exports.atualizar = (req, res) => {
  const id = parseInt(req.params.id);
  const produtoIndex = produtos.findIndex(p => p.id === id);
  if (produtoIndex !== -1) {
    const { nome, preco } = req.body;
    produtos[produtoIndex] = { ...produtos[produtoIndex], nome: nome || produtos[produtoIndex].nome, preco: preco !== undefined ? preco : produtos[produtoIndex].preco };
    res.json(produtos[produtoIndex]);
  } else {
    res.status(404).json({ message: 'Produto não encontrado para atualização.' });
  }
};

// Função para deletar um produto
exports.deletar = (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = produtos.length;
  produtos = produtos.filter(p => p.id !== id);
  if (produtos.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Produto não encontrado para exclusão.' });
  }
};