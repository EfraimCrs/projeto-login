const express = require('express');
const router = express.Router(); // Mini-aplicativo do Express para rotas
const authController = require('../controllers/authController');

// --- Definindo os Endpoints de Autenticação ---

// Rota: POST /api/register
// Chama o controlador 'register'
router.post('/register', authController.register);

// Rota: POST /api/login
// Chama o controlador 'login'
router.post('/login', authController.login);

module.exports = router;