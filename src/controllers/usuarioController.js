const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuarioModel");

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

exports.criarUsuario = async (req, res) => {
  const { nome, email, senha, role } = req.body;

  if (!nome || nome.length < 3) {
    return res.status(400).json({ message: "Nome inválido" });
  }
  if (!email) return res.status(400).json({ message: "Email é obrigatório" });
  if (!senha) return res.status(400).json({ message: "Senha é obrigatória" });

  try {
    const existente = await Usuario.findOne({ where: { email } });

    if (existente) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novo = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
      role: role ?? "user"
    });

    res.status(201).json(novo);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Erro no login" });
  }
};
