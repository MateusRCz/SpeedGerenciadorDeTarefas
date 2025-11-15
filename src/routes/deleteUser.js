const express = require('express');
const router = express.Router();


// Apagar depois
const jwt = require('jsonwebtoken'); // Biblioteca para JWT
const bcrypt = require('bcryptjs');


const app = express(); //Instância
const PORT = 3000;
const JWT_SECRET = 'minhasenhasecreta'


let usuarios = [
    { id: 1, email: 'abrahamlincoln@gmail.com', nome: 'Abraham', password: '123', role: 'user'},
    { id: 2, email: 'albertelnstein@gmail.com', nome: 'Albert', password: '123', role: 'user'},
    { id: 3, email: 'nikolatesla@gmail.com', nome: 'Nikola', password: '123', role: 'admin'},
];



const logar = (req, res) => {
    const { email, password } = req.body;

    const usuario = usuarios.find(u => u.email === email);
    if(!usuario) {
        return res.status(401).json({ message: "Credenciais inválidas." })
    }

    const senhaValida = usuarios.find(u => u.password === password);
    if(!senhaValida){
        return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const token = jwt.sign(
        { id: usuario.id, nome: usuario.nome, role: usuario.role },
        JWT_SECRET,
        { expiresIn: '5m'}
    );

    res.status(200).json({
        message: "Login bem-sucedido!",
        token: token
    });
};


const autenticar = (req, res, next) => {
    // 1. Extrai o token do cabeçalho 'Authorization' (Esperado: Bearer <TOKEN>)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        // 2. Verifica e decodifica o token
        const decoded = jwt.verify(token, JWT_SECRET);

        // 3. Anexa os dados do usuário à requisição (req.user)
        req.user = decoded;

        // 4. Continua o processamento da requisição
        next();
    } catch (err) {
        // Token inválido (expirado, adulterado, etc.)
        return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
};


const authorizeRoles = (req, res, next) =>{
    if(req.user.role != "admin") {
        return res.status(403).json({ message: 'Não autorizado. Apenas admins podem executar esta ação.' });
    }
    next();
};



app.use(express.json());
// ///////////////////



let tarefas = [
    { id: 1, titulo: 'Biologia', descricao: '', concluida: false },
    { id: 2, titulo: 'Química', descricao: '', concluida: false },
    { id: 3, titulo: 'Matemática', descricao: '', concluida: false },
];

app.post('/login', logar);

app.get("/", (req, res) => {
    res.json(tarefas);
})


app.delete('/api/tarefas/:id', autenticar, authorizeRoles, (req, res) => { //authorizeRoles

    const id = parseInt(req.params.id);
    const initialLength = tarefas.length; //Uso somente com array

    tarefas = tarefas.filter(p => p.id !== id);

    //Filtra o array, removendo o produto com o ID especificado.
    if(tarefas.length < initialLength){
        //Se o produto foi removido, retorna status 204 (No Content).
        res.status(204).send(); // send() corpo para 204
    } else{
        //Se o produto não foi encontrado para exclusão, retorna 404.
        res.status(404).json({ message: 'Tarefa não encontrada para exclusão.'});
    }
});

app.listen(PORT, () =>{

    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log("Para parar o servidor, pressione Ctrl+C no terminal.");
});










