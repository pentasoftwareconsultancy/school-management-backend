const express = require('express');
const router  = express.Router();
const { verifyToken, authorizeRole } = require('../../../middleware/auth.middleware');
const ctrl = require('./notification.controller');

// All authenticated users
router.use(verifyToken);

// Any logged-in user can get their own notifications
router.get('/my',              ctrl.getMyNotifications);
router.get('/unread-count',    ctrl.getUnreadCount);
router.put('/:id/read',        ctrl.markAsRead);
router.put('/mark-all-read',   ctrl.markAllAsRead);

// Admin only
router.get('/',                authorizeRole('admin'), ctrl.getAllNotifications);
router.post('/',               authorizeRole('admin'), ctrl.createNotification);
router.delete('/:id',          authorizeRole('admin'), ctrl.deleteNotification);

module.exports = router;
