const express = require('express');
const router = express.Router();

const authRoutes = require('../modules/auth/auth.routes');
// Other routes can be imported here later

router.use('/auth', authRoutes);

module.exports = router;
