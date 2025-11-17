const db = require('../database.js'); // 1 ponto a própria pasta e 2 pontos a de cima

const produtoModel = {
    //Método para buscar todos os produtos
    findAll: () => { //Método com nome semântico para identificar a busca de todos os produtos, esse nome é bem comum no mercado
        return new Promise((resolve, reject) => {
            //Podemos utilizar o "all" para fazer outros comandos
            db.all("SELECT * FROM produtos", [], (err, rows) => { 
                if (err) {
                    reject(err);
                }
                resolve(rows); //Devolve as linhas do SELECT
            });
        });
    },

    // Método para buscar um produto por ID
    findById: (id) => {
        return new Promise((resolve, reject) => {
            //Podemos utilizar o "all" para fazer outros comandos
            db.get("SELECT * FROM produtos", [], (err, rows) => { 
                if (err) {
                    reject(err);
                }
                resolve(rows); //Devolve as linhas do SELECT
            });
        });
        
    }

}