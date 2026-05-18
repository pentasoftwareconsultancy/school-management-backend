const service = require('./userManagement.service');

// GET /admin/users/:role  — list all users of a role
const listUsers = async (req, res) => {
  try {
    const { role } = req.params;
    const users = await service.getUsersByRole(role);
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET /admin/users/:role/:id  — get single user
const getUser = async (req, res) => {
  try {
    const { role, id } = req.params;
    const user = await service.getUserById(role, id);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

// POST /admin/users/:role  — create user + profile
const createUser = async (req, res) => {
  try {
    const { role } = req.params;
    const result = await service.createUser(role, req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT /admin/users/:role/:id  — update user profile
const updateUser = async (req, res) => {
  try {
    const { role, id } = req.params;
    const updated = await service.updateUser(role, id, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE /admin/users/:role/:id  — delete user
const deleteUser = async (req, res) => {
  try {
    const { role, id } = req.params;
    const result = await service.deleteUser(role, id);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { listUsers, getUser, createUser, updateUser, deleteUser };
