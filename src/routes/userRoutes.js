const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/user/me - protected
router.get('/me', authMiddleware, userController.getMe);

module.exports = router;
