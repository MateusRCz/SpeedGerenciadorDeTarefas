const tarefaModel = require("../models/tarefaModel");

exports.authorizeRoles = async (req, res, next) => {
    try {
        const tarefaId = req.params.id
        const tarefa = await tarefaModel.findById(tarefaId);

        //Verifica se a tarefa procurada existe no banco
        if(!tarefa) {
            return res.status(404).json({ message: "Tarefa não encontrada" });
        }

        //Verifica se o usuário é admin
        if(req.usuario.role === "admin"){
            return next();
        }

        //Verifica se o usuário é o dono da tarefa
        console.log("Tarefa: " + tarefa);
        console.log("Tarefa.userId: " + tarefa.userId);
        console.log("Req.usuario.id: " + req.usuario.id);
        console.log(tarefa.userId === req.usuario.id);
        if(tarefa.userId !== req.usuario.id){
            return res.status(400).json({ message: "Você não pode deletar essa tarefa"});
        }

        next()

    } catch (err) {
        res.status(500).json({ message: "Erro na verificação.", erro: err.message });
    }
    
};