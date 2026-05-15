const express = require('express');
const router = express.Router();
const { register, login } = require('./auth.controller');
const { verifyToken, authorizeRole } = require('../../middleware/auth.middleware');
const validate = require('../../middleware/validation.middleware');
const { registerSchema, loginSchema } = require('../../validations/auth.validation');

// Protected Route: Only Admins can create new users, requires valid body structure
router.post('/register', verifyToken, authorizeRole('admin'), validate(registerSchema), register);

// Public Route: User login, requires valid email and password structure
router.post('/login', validate(loginSchema), login);

module.exports = router;
