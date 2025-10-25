const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Dados do perfil carregados com sucesso",
    user: req.user
  });
});

module.exports = router;