const db = require('../database.js');

const usuarioModel = {
    //Método para buscar todos os usuários
    findAll: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM usuarios", [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    },

    // Método para buscar um usuário por ID
    findById: (id) => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM usuarios WHERE id = ?", [id], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    },

    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM usuarios WHERE email = ?", [email], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    },

    // Método para criar um novo usuário
    create: (nome, email, senha, role) => {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO usuarios (nome, email, senha, role) VALUES (?, ?, ?, ?)", [nome, email, senha, role], function (err) {
                if (err) {
                    reject(err);
                }
                resolve({ id: this.lastID, nome, email, senha, role});
            });
        });
    },

    // Método para atualizar uma tarefa
    // update: (id, titulo, descricao, concluida) => {
    //     return new Promise((resolve, reject) => {
    //         db.run(`UPDATE tarefas
    //                     SET titulo = ?, descricao = ?, concluida = ?
    //                 WHERE id = ?`,
    //                 [titulo, descricao, concluida, id], function (err) {
    //             if (err) {
    //                 reject(err);
    //             }
    //             resolve({ changes: this.changes });
    //         });
    //     });
    // },

    // // Método para deletar um produto
    // delete: (id) => {
    //     return new Promise((resolve, reject) => {
    //         db.run("DELETE FROM tarefas WHERE id = ?",
    //                 [id], function (err) {
    //             if (err) {
    //                 reject(err);
    //             }
    //             resolve({ changes: this.changes });
    //         });
    //     });
    // },
};

module.exports = usuarioModel;