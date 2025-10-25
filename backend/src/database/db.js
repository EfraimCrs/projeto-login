const sqlite3 = require('sqlite3').verbose();

const DB_SOURCE = "db.sqlite";


const db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
        
        console.error("❌ Erro ao conectar ao SQLite:", err.message);
        throw err;
    } else {
        console.log('✅ [Banco de Dados] Conectado ao SQLite.');
        
        const createTableSql = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE,
                password_hash TEXT 
            )
        `;

        db.run(createTableSql, (err) => {
            if (err) {
                
                console.error("❌ Erro ao criar tabela 'users':", err.message);
            } else {
                console.log("✅ [Banco de Dados] Tabela 'users' garantida.");
            }
        });
    }
});

module.exports = db;