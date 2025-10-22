require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
// Importa nosso arquivo de rotas de autenticação
const authRoutes = require('./src/routes/authRoutes');

// --- Configuração do App ---
const app = express();
const PORT = process.env.PORT || 3001;
const DEBUG_MODE = process.env.DEBUG === 'true' || false;

// --- Middlewares Essenciais ---
app.use(cors());
app.use(express.json());

// --- Rotas ---
app.get('/api/health', (req, res) => {
    res.json({
        status: "ok",
        debug: DEBUG_MODE,
        message: "API está funcionando perfeitamente!"
    });
});

// --- NOVO: Use as rotas de autenticação ---
// Qualquer requisição que comece com /api será gerenciada pelo 'authRoutes'
app.use('/api', authRoutes);

// --- Inicialização do Servidor ---
app.listen(PORT, () => {
    console.log(`✅ [Servidor Backend] Rodando na porta ${PORT}`);
    if (DEBUG_MODE) {
        console.log("✅ [Servidor Backend] Modo DEBUG ATIVADO.");
    }
    // Mensagem do banco de dados (deve aparecer logo após o 'listen')
});
