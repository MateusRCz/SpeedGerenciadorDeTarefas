

let produtos = [
    {id: 1, nome: 'Teclado Mecânico', preco: 450.00},
    {id: 2, nome: 'Mouse razer', preco: 150.00},
    {id: 3, nome: 'Monitor 144hz', preco: 1200.00},
];
let nextId = 4;

// CRUD PRODUTOS

app.get('/api/produtos/:id', (req, res) => {
  const idProduto = parseInt(req.params.id);
  const produtoEncontrado = produtos.find(p => p.id === idProduto);

  if (produtoEncontrado) {
    res.json(produtoEncontrado);
  } else {
    res.status(404).send('Produto não encontrado.');
  }
});

app.post('/api/produtos', (req, res) => {

    const {nome, preco} = req.body;

    if (!nome || preco === undefined){
        return res.status(400).json({message:'Nome e preço são obrigatórios.'})
    }

    const novoProduto = {
        id: nextId++,
        nome,
        preco
    };

    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
})

app.put('/api/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const produtoIndex = produtos.findIndex(p => p.id === id);

    if (produtoIndex !== -1){
        const {nome, preco} = req.body;

        if (!nome && preco === undefined){
            return res.status(400).json({ message: 'Pelo menos um campo (nome ou preco) deve ser fornecido para atualização.'});
        }
    

        produtos[produtoIndex] = {
            ...produtos[produtoIndex],
            nome: nome !== undefined ? nome : produtos[produtoIndex].nome,
            preco: preco !== undefined ? preco : produtos[produtoIndex].preco,
        };

        res.json(produtos[produtoIndex]);
    } else {
        res.status(404).json({message: 'Produto não encontrado para atualização.'});
    }

});

app.delete('/api/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = produtos.length;

    produtos = produtos.filter(p => p.id !== id);

    if (produtos.length < initialLength){
        res.status(204).send();
    } else {
        res.status(404).json({message: 'Produto não encontrado para exclusão.'});
    }
});


app.listen(PORT, () => {

    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('Para parar o sevidor, pressione Crtl+C no terminal.');
});

// FIM CRUD PRODUTOS