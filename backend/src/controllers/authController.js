const authService = require('../services/authService');

const authController = {
    
    /**
     * Controlador para /api/register
     */
    register: async (req, res) => {
        try {
            // 1. Pegar email e senha do corpo (body) da requisição
            const { email, password } = req.body;

            // 2. Validação simples
            if (!email || !password) {
                return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
            }

            // 3. Chamar o Service
            const user = await authService.register(email, password);

            // 4. Enviar a resposta de sucesso
            res.status(201).json({ 
                message: "Usuário criado com sucesso!", 
                user: user 
            });

        } catch (error) {
            // 5. Lidar com erros (ex: email já existe)
            // Usamos 409 (Conflict) se o email já existe, ou 500 (Internal Server Error)
            const statusCode = error.message.includes("E-mail já cadastrado") ? 409 : 500;
            res.status(statusCode).json({ message: error.message });
        }
    },

    /**
     * Controlador para /api/login
     */
    login: async (req, res) => {
        try {
            // 1. Pegar dados
            const { email, password } = req.body;

            // 2. Validação
            if (!email || !password) {
                return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
            }

            // 3. Chamar o Service
            // (Note: A Fase 5 (JWT) vai modificar esta parte)
            const user = await authService.login(email, password);
            
            // 4. Enviar resposta de sucesso
            res.status(200).json({
                message: "Login bem-sucedido!",
                user: user
                // Na Fase 5, adicionaremos o 'token' aqui
            });

        } catch (error) {
            // 5. Lidar com erros (usuário ou senha inválidos)
            // Usamos 401 (Unauthorized) para falha de login
            const statusCode = error.message.includes("inválidos") ? 401 : 500;
            res.status(statusCode).json({ message: error.message });
        }
    }
};

module.exports = authController;