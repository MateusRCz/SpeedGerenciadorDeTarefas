const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "meu_banco.db"; //Constante para guardar o nome do banco de dados

const db = new sqlite3.Database(DBSOURCE, (err) => {  //instância do sqlite3 informando o nome do banco de dados e o segundo é a função que controla, 
    if(err) {
        console.error(err.message);
        throw err;
    }else {
        console.log('Conectado ao banco de dados SQLite.');

        // Cria a tabela 'produtos' se ela não existir
        db.run(`CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(100) NOT NULL,
            preco REAL NOT NULL
            )`, (err) => {
                if (err) {
                    console.error("Erro ao criar tabela 'produtos':", err.message);
                }else {
                    //Opcional : inserir alguns dados iniciais
                    const INSERT = 'INSERT OR IGNORE INTO produtos (id, nome, preco) VALUES (?,?,?)';
                    db.run(INSERT, [1, "Teclado Mecânico", 450.00]);
                }
            });

    }
});

module.exports = db;