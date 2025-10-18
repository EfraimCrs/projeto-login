require('dotenv').config();

const express = require('express');
const cors = require('cors');

// cofig do App
const app = express();

// Defina a Porta
const PORT = process.env.PORT || 3001;

// Define se estamos em modo de Debug
const DEBUG_MODE = process.env.DEBUG === 'true' || false;

// Middleware
app.use(cors());
app.use(express.json());

// Rota de Teste
app.get('/api/health', (req, res) => {
    res.json({
        status: "ok",
        debug: DEBUG_MODE,
        message: "API está funcionando perfeitamente!"
    });
});

// --- Inicialização do Servidor ---
app.listen(PORT, () => {
    console.log(`[✅ Servidor Backend] Rodando na porta ${PORT}`);
    if (DEBUG_MODE) {
      console.log("[🌐 Servidor Backend] Modo DEBUG ATIVADO.");
    }
});


