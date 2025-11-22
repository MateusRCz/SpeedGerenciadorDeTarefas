const jwt = require('jsonwebtoken');
require("dotenv").config();
const JWT_SECRET = "minha_chave_super_secreta"; //Alterar aqui depois para o dotenv

// if(!JWT_SECRET){
//     throw new Error("JWT_SECRET não definido.");
// }

exports.verificaToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: "Acesso negado. Nenhum token fornecido."});
    };

    try {
        //Alterar aqui depois para o dotenv
        const decoded = jwt.verify(token, JWT_SECRET); 

        req.usuario = decoded;

        next();

    }catch (error){
        res.status(403).json({ message: "Token inválido ou expirado."});
    }
};