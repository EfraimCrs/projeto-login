const db = require('../database/db');
const bcrypt = require('bcryptjs');

const authService = {

    register: async (email, password) => {
        
        const passwordHash = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO users (email, password_hash) VALUES (?, ?)`;

        return new Promise((resolve, reject) => {
            db.run(sql, [email, passwordHash], function(err) {
                if (err) {
                    
                    if (err.message.includes("UNIQUE constraint failed")) {
                        reject(new Error("E-mail já cadastrado."));
                    } else {
                        reject(err);
                    }
                } else {
                    
                    resolve({ id: this.lastID, email: email });
                }
            });
        });
    },

    login: async (email, password) => {
        
        const sql = `SELECT * FROM users WHERE email = ?`;
        
        const user = await new Promise((resolve, reject) => {
            db.get(sql, [email], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    
                    resolve(row);
                }
            });
        });

       
        if (!user) {
            throw new Error("Usuário ou senha inválidos.");
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordMatch) {
            throw new Error("Usuário ou senha inválidos.");
        }

        return { id: user.id, email: user.email };
    }
};

module.exports = authService;