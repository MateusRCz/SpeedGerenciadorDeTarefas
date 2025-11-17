const jwt = require('jsonwebtoken');
const JWT_SECRET = 'seu-segredo-super-secreto'; //Alterar aqui depois para o dotenv

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