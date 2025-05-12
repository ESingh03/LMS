const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.get('/verify-token', authenticateToken, authController.verifyToken);
router.get('/logout', authController.logout);

module.exports = router;
