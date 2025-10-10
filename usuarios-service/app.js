const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

let usuarios = [
    {id: 1, nome: 'João Silva', email: 'joao@gmail.com'},
    {id: 2, nome: 'Maria Souza', email: 'maria@gmail.com'},
    {id: 3, nome: 'Pedro Santos', email: 'pedro@gmail.com'},
];
let nextId = 4;

app.get('/', (req,res) => {
    res.send('api de usuarios');
});

app.get('/api/usuarios/id:', (req, res) => {
    const idUsuario = parseInt(req.params.id);
    const usuarioEncontrado = usuarios.find(u => u.id === idUsuario);

    if (usuarioEncontrado) {
        res.json(usuarioEncontrado);
    } else {
        res.status(404).send('Usuário não encontrado.');
    }
});

app.post('/api/usuarios', (req, res) => {

    const {nome, email} = req.body;

    if (!nome || !email){
        return res.status(400).json({message:'Nome e email são obrigatórios.'});
    }

    const novousuario = {
        id: nextId++,
        nome,
        email
    };
    usuarios.push(novousuario);

    res.status(201).json(novousuario);
});