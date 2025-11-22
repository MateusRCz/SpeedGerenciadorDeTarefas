const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usuarioModel = require("../models/usuarioModel");


exports.criarUsuario = async (req, res) => {
  const { nome, email, senha, role } = req.body;

  if (!nome) {
    return res.status(400).json({ message: "Nome é obrigatório." });
  }

  if (nome.trim().length < 3) {
    return res
      .status(400)
      .json({ message: "Nome deve ter no mínimo 3 caracteres." });
  }

  if (!email) return res.status(400).json({ message: "Email é obrigatório." });
  if (!senha) return res.status(400).json({ message: "Senha é obrigatória." });

  try {
    const verificaEmail = await usuarioModel.findByEmail(email);
    if (verificaEmail) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    

    const novoUsuario = await usuarioModel.create(
      nome,
      email,
      senhaCriptografada,
      role
    );

    res.status(201).json({
        message: "Usuário criado com sucesso!",
        novoUsuario });

  } catch (err) {
    res.status(500).json({ message: "Erro ao criar usuário.", erro: err.message });
  }
};

exports.login = async (req, res) => {
  
  try{

    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: "Email e senha são obrigatórios." });
    }

    
    const usuario = await usuarioModel.findByEmail(email);
    if (!usuario) {
        return res.status(401).json({ message: "Credenciais inválidas email." });
    }

    console.log("Usuário retornado:", usuario);
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
        // console.log(senhaValida);
        return res.status(401).json({ message: "Credenciais inválidas senha." });
    }

    const token = jwt.sign(
        { id: usuario.id, nome: usuario.nome, role: usuario.role },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );

    res.status(200).json({
        message: "Login bem-sucedido!",
        token: token,
    });

    
    } catch (error) {
        res.status(500).json({ message: "Erro no login", erro: error.message });
    }
};
