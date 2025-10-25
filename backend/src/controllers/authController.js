const authService = require('../services/authService');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authController = {
    
    register: async (req, res) => {
        try {
            
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
            }

            const user = await authService.register(email, password);

            res.status(201).json({ 
                message: "Usuário criado com sucesso!", 
                user: user 
            });

        } catch (error) {

            const statusCode = error.message.includes("E-mail já cadastrado") ? 409 : 500;
            res.status(statusCode).json({ message: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
            }

            const user = await authService.login(email, password);
            
            const payload = {
                userId: user.id,
                email: user.email
            };

            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error("Chave secreta JWT não está definida no .env!");
            }

            const token = jwt.sign(payload, secret, { expiresIn: '1h' });
            
            res.status(200).json({
                message: "Login bem-sucedido!",
                user: user,
                token: token
            });

        } catch (error) {
            const statusCode = error.message.includes("inválidos") ? 401 : 500;
            res.status(statusCode).json({ message: error.message });
        }
    }
};

module.exports = authController;