const db = require('../database/db'); // Nosso banco de dados
const bcrypt = require('bcryptjs');   // Para criptografar e comparar senhas

const authService = {
    
    /**
     * Lógica para registrar um novo usuário
     */
    register: async (email, password) => {
        // 1. Gerar o "hash" da senha (criptografar)
        // O '10' é o "salt rounds" - o custo da criptografia. 10 é um padrão seguro.
        const passwordHash = await bcrypt.hash(password, 10);

        // 2. Montar a query SQL para inserir o usuário
        const sql = `INSERT INTO users (email, password_hash) VALUES (?, ?)`;
        
        // 3. Executar a query no banco
        // Usamos 'new Promise' para poder usar 'async/await' com o sqlite3
        return new Promise((resolve, reject) => {
            db.run(sql, [email, passwordHash], function(err) {
                if (err) {
                    // 'UNIQUE constraint failed' é o erro se o email já existir
                    if (err.message.includes("UNIQUE constraint failed")) {
                        reject(new Error("E-mail já cadastrado."));
                    } else {
                        reject(err);
                    }
                } else {
                    // 'this.lastID' retorna o ID do usuário que acabamos de criar
                    resolve({ id: this.lastID, email: email });
                }
            });
        });
    },

    /**
     * Lógica para fazer login
     */
    login: async (email, password) => {
        // 1. Encontrar o usuário pelo e-mail
        const sql = `SELECT * FROM users WHERE email = ?`;
        
        const user = await new Promise((resolve, reject) => {
            db.get(sql, [email], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    // 'row' será o usuário (se encontrado) ou 'undefined' (se não)
                    resolve(row);
                }
            });
        });

        // 2. Se o usuário não existe, rejeitamos
        if (!user) {
            throw new Error("Usuário ou senha inválidos.");
        }

        // 3. O usuário existe. Agora comparamos a senha enviada (password)
        //    com a senha criptografada (user.password_hash)
        const isPasswordMatch = await bcrypt.compare(password, user.password_hash);

        // 4. Se a senha não bate, rejeitamos
        if (!isPasswordMatch) {
            throw new Error("Usuário ou senha inválidos.");
        }

        // 5. Se chegou até aqui, o login é válido!
        // Retornamos os dados do usuário (sem a senha, claro)
        return { id: user.id, email: user.email };
    }
};

module.exports = authService;