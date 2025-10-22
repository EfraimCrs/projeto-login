const sqlite3 = require('sqlite3').verbose(); // .verbose() dá mais informações no debug

// Define o caminho e o nome do nosso arquivo de banco de dados
const DB_SOURCE = "db.sqlite";

// Abre (ou cria) o banco de dados
// O new sqlite3.Database() retorna o objeto 'db' que usaremos para fazer queries
const db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
        // Erro fatal. Não é possível abrir o banco
        console.error("❌ Erro ao conectar ao SQLite:", err.message);
        throw err;
    } else {
        console.log('✅ [Banco de Dados] Conectado ao SQLite.');
        
        // --- Criar a tabela de usuários (se ela não existir) ---
        // Usamos 'TEXT' para email e senha
        // 'UNIQUE' garante que não teremos dois emails iguais
        const createTableSql = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE,
                password_hash TEXT 
            )
        `;

        db.run(createTableSql, (err) => {
            if (err) {
                // Problema ao criar a tabela
                console.error("❌ Erro ao criar tabela 'users':", err.message);
            } else {
                console.log("✅ [Banco de Dados] Tabela 'users' garantida.");
            }
        });
    }
});

module.exports = db;