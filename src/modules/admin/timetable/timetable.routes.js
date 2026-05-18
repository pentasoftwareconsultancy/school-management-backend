const express = require('express');
const router  = express.Router();
const { verifyToken, authorizeRole } = require('../../../middleware/auth.middleware');
const ctrl = require('./timetable.controller');

// Admin, teacher, student, parent can view timetable
router.get('/',         verifyToken, ctrl.getTimetable);

// Only admin can modify
router.post('/period',  verifyToken, authorizeRole('admin'), ctrl.upsertPeriod);
router.post('/save',    verifyToken, authorizeRole('admin'), ctrl.saveTimetable);
router.delete('/:id',   verifyToken, authorizeRole('admin'), ctrl.deletePeriod);

module.exports = router;
