const express = require('express');
const router  = express.Router();

// ── Auth ──────────────────────────────────────────────────────
const authRoutes = require('../modules/auth/auth.routes');

// ── Admin ─────────────────────────────────────────────────────
const adminDashboardRoutes  = require('../modules/admin/dashboard/dashboard.routes');
const adminUserRoutes       = require('../modules/admin/usermanagement/userManagement.routes');
const adminCourseRoutes     = require('../modules/admin/courses/courses.routes');
const adminFeesRoutes       = require('../modules/admin/fees/fees.routes');
const adminTimetableRoutes  = require('../modules/admin/timetable/timetable.routes');
const adminSettingsRoutes   = require('../modules/admin/settings/settings.routes');

// ── Common (all roles) ────────────────────────────────────────
const notificationRoutes    = require('../modules/common/notification/notification.routes');
const profileRoutes         = require('../modules/common/profile/profile.routes');

// ── Mount routes ──────────────────────────────────────────────

router.use('/auth',                  authRoutes);

// Admin
router.use('/admin/dashboard',       adminDashboardRoutes);
router.use('/admin/users',           adminUserRoutes);
router.use('/admin/courses',         adminCourseRoutes);
router.use('/admin/fees',            adminFeesRoutes);
router.use('/admin/timetable',       adminTimetableRoutes);
router.use('/admin/settings',        adminSettingsRoutes);

// Common
router.use('/notifications',         notificationRoutes);
router.use('/profile',               profileRoutes);

module.exports = router;
