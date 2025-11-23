const db = require('../database.js');

const tarefaModel = {
    //Método para buscar todos as tarefas
    findAll: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM tarefas", [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    },

    // Método para buscar uma tarefa por ID
    findById: (id) => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM tarefas WHERE id = ?", [id], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    },

    // Método para criar uma nova tarefa
    create: (titulo, descricao, concluida, userId) => {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO tarefas (titulo, descricao, concluida, userId) VALUES (?, ?, ?, ?)", [titulo, descricao, concluida, userId], function (err) {
                if (err) {
                    reject(err);
                }
                resolve({ id: this.lastID, titulo, descricao, concluida, userId});
            });
        });
    },

    // Método para atualizar uma tarefa
    update: (id, titulo, descricao, concluida) => {
        return new Promise((resolve, reject) => {
            db.run(`UPDATE tarefas
                        SET titulo = ?, descricao = ?, concluida = ?
                    WHERE id = ?`,
                    [titulo, descricao, concluida, id], function (err) {
                if (err) {
                    reject(err);
                }
                resolve({ changes: this.changes });
            });
        });
    },

    // Método para deletar um produto
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM tarefas WHERE id = ?",
                    [id], function (err) {
                if (err) {
                    reject(err);
                }
                resolve({ changes: this.changes });
            });
        });
    },
};

module.exports = tarefaModel;