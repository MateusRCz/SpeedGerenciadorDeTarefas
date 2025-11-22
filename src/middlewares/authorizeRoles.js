exports.authorizeRoles = (rolesPermitidos) => {
    return (req, res, next) => {
        const autorizacao = rolesPermitidos.find(r => r === req.usuario.role);
        if(autorizacao){
            return next();
        }

        return res.status(403).json({ message: "Acesso negado: você não tem permissão para acessar essa rota." });
    };
    
};