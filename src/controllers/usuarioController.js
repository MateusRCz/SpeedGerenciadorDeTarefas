const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'seu-segredo-super-secreto';

let usuarios = [

];




exports.criarUsuario = (req, res) => {
    const { nome, email, senha, role } = req.body;

    if(usuarios.find(u => u.email === email)) {
        return res.status(400).json({ message: "Email já cadastrado."});
    }

    const senhaCriptografada = bcrypt.hashSync(senha, 10);

    const novoUsuario = {
        id: usuarios.length + 1,
        nome,
        email,
        senha: senhaCriptografada,
        role,
    };

    usuarios.push(novoUsuario);

    const { senha: _, ...usuarioSemSenha } = novoUsuario;
    res.status(201).json(usuarioSemSenha);
    console.log(usuarios);

};

exports.login = (req, res) =>{
    const { email, senha } = req.body;

    const usuario = usuarios.find(u => u.email === email);
    console.log(usuario);
    if(!usuario){
        return res.status(401).json({ message: "Credenciais inválidas email."});
        
    }

    // const senhaValida = usuarios.find(u => u.password === senha);
    const senhaValida = bcrypt.compareSync(senha, usuario.senha);
    if(!senhaValida){
        return res.status(401).json({ message: "Credenciais inválidas senha."});
    }

    const token = jwt.sign(
        { id: usuario.id, nome: usuario.nome },
        JWT_SECRET,
        { expiresIn: '15m'}
    );

    res.status(200).json({
        message: "Login bem-sucedido!",
        token: token
    });
};