const express = require('express');
const router  = express.Router();
const { verifyToken, authorizeRole } = require('../../../middleware/auth.middleware');
const { getSettingsHandler, updateSettingsHandler } = require('./settings.controller');

// GET  — admin can view, all authenticated users can read school info
router.get('/',  verifyToken, getSettingsHandler);

// PUT  — admin only
router.put('/',  verifyToken, authorizeRole('admin'), updateSettingsHandler);

module.exports = router;
