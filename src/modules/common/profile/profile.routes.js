const express = require('express');
const router  = express.Router();
const { verifyToken } = require('../../../middleware/auth.middleware');
const { getMyProfile, updateMyProfile } = require('./profile.controller');

// All authenticated users can access their own profile
router.get('/',  verifyToken, getMyProfile);
router.put('/',  verifyToken, updateMyProfile);

module.exports = router;
