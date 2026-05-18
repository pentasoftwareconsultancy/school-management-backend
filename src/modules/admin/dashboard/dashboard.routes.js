const express = require('express');
const router  = express.Router();
const { verifyToken, authorizeRole } = require('../../../middleware/auth.middleware');
const { getDashboard } = require('./dashboard.controller');

// GET /api/v1/admin/dashboard
router.get('/', verifyToken, authorizeRole('admin'), getDashboard);

module.exports = router;
