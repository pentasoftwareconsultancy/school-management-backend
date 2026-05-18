const express = require('express');
const router  = express.Router();
const { verifyToken, authorizeRole } = require('../../../middleware/auth.middleware');
const { listUsers, getUser, createUser, updateUser, deleteUser } = require('./userManagement.controller');

// All routes require admin token
router.use(verifyToken, authorizeRole('admin'));

// GET  /api/v1/admin/users/:role         — list students | teachers | parents
router.get('/:role',        listUsers);

// GET  /api/v1/admin/users/:role/:id     — get one
router.get('/:role/:id',    getUser);

// POST /api/v1/admin/users/:role         — create
router.post('/:role',       createUser);

// PUT  /api/v1/admin/users/:role/:id     — update
router.put('/:role/:id',    updateUser);

// DELETE /api/v1/admin/users/:role/:id   — delete
router.delete('/:role/:id', deleteUser);

module.exports = router;
