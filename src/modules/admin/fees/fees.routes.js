const express = require('express');
const router  = express.Router();
const { verifyToken, authorizeRole } = require('../../../middleware/auth.middleware');
const ctrl = require('./fees.controller');

// Admin only for structure management
const adminOnly = [verifyToken, authorizeRole('admin')];
// Admin + parent can view payments
const adminOrParent = [verifyToken, authorizeRole('admin', 'parent')];

// ─── Fee Structures ───────────────────────────────────────────────────────────
router.get('/structures',              adminOnly,    ctrl.getAllFeeStructures);
router.get('/structures/:grade',       adminOrParent, ctrl.getFeeStructureByGrade);
router.post('/structures',             adminOnly,    ctrl.createFeeStructure);
router.put('/structures/:id',          adminOnly,    ctrl.updateFeeStructure);
router.delete('/structures/:id',       adminOnly,    ctrl.deleteFeeStructure);

// ─── Summary ──────────────────────────────────────────────────────────────────
router.get('/summary',                 adminOnly,    ctrl.getFeeSummary);

// ─── Payments ─────────────────────────────────────────────────────────────────
router.get('/payments/student/:studentId',  adminOrParent, ctrl.getPaymentsByStudent);
router.post('/payments',                    adminOnly,     ctrl.createPayment);
router.put('/payments/:id/status',          adminOnly,     ctrl.updatePaymentStatus);

module.exports = router;
