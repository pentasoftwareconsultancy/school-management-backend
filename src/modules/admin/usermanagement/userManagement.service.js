const User    = require('../../../models/User.model');
const Student = require('../../../models/Student.model');
const Teacher = require('../../../models/Teacher.model');
const Parent  = require('../../../models/Parent.model');
const bcrypt  = require('bcryptjs');
const { sequelize } = require('../../../config/db.config');

// ─── helpers ────────────────────────────────────────────────────────────────

const PROFILE_MODEL = { student: Student, teacher: Teacher, parent: Parent };

// Return the profile row joined with its User row
const getProfileWithUser = async (Model, where = {}) => {
  return Model.findAll({
    where,
    include: [{ model: User, as: 'user', attributes: ['id', 'email', 'username', 'role', 'createdAt'] }],
    order: [['createdAt', 'DESC']],
  });
};

// ─── GET all users by role ───────────────────────────────────────────────────

const getUsersByRole = async (role) => {
  const Model = PROFILE_MODEL[role];
  if (!Model) throw new Error(`Invalid role: ${role}`);
  return getProfileWithUser(Model);
};

// ─── GET single user ─────────────────────────────────────────────────────────

const getUserById = async (role, id) => {
  const Model = PROFILE_MODEL[role];
  if (!Model) throw new Error(`Invalid role: ${role}`);

  const profile = await Model.findByPk(id, {
    include: [{ model: User, as: 'user', attributes: ['id', 'email', 'username', 'role', 'createdAt'] }],
  });
  if (!profile) throw new Error(`${role} not found`);
  return profile;
};

// ─── CREATE user + profile ───────────────────────────────────────────────────

const createUser = async (role, data) => {
  const Model = PROFILE_MODEL[role];
  if (!Model) throw new Error(`Invalid role: ${role}`);

  const t = await sequelize.transaction();
  try {
    // Check duplicate email
    const existing = await User.findOne({ where: { email: data.email }, transaction: t });
    if (existing) throw new Error('Email already in use');

    // Hash password
    const hashed = await bcrypt.hash(data.password, 10);

    // Create User account
    const user = await User.create({
      username: data.username || data.fullName.toLowerCase().replace(/\s+/g, '.'),
      email:    data.email,
      password: hashed,
      role,
    }, { transaction: t });

    // Build profile fields (strip auth fields)
    const { email, password, username, ...profileData } = data;

    // Create profile
    const profile = await Model.create({
      ...profileData,
      userId: user.id,
    }, { transaction: t });

    await t.commit();
    return { user: { id: user.id, email: user.email, username: user.username, role: user.role }, profile };
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

// ─── UPDATE user profile ─────────────────────────────────────────────────────

const updateUser = async (role, id, data) => {
  const Model = PROFILE_MODEL[role];
  if (!Model) throw new Error(`Invalid role: ${role}`);

  const profile = await Model.findByPk(id);
  if (!profile) throw new Error(`${role} not found`);

  // Update profile fields
  const { email, password, username, ...profileData } = data;
  await profile.update(profileData);

  // Optionally update email/username on User table
  if (email || username) {
    const userUpdates = {};
    if (email)    userUpdates.email    = email;
    if (username) userUpdates.username = username;
    await User.update(userUpdates, { where: { id: profile.userId } });
  }

  return profile;
};

// ─── DELETE user (cascades to profile) ───────────────────────────────────────

const deleteUser = async (role, id) => {
  const Model = PROFILE_MODEL[role];
  if (!Model) throw new Error(`Invalid role: ${role}`);

  const profile = await Model.findByPk(id);
  if (!profile) throw new Error(`${role} not found`);

  // Deleting the User cascades to the profile (onDelete: CASCADE)
  await User.destroy({ where: { id: profile.userId } });
  return { message: `${role} deleted successfully` };
};

// ─── Dashboard stats ─────────────────────────────────────────────────────────

const getDashboardStats = async () => {
  const [totalStudents, totalTeachers, totalParents, totalUsers] = await Promise.all([
    Student.count(),
    Teacher.count(),
    Parent.count(),
    User.count(),
  ]);

  return { totalStudents, totalTeachers, totalParents, totalUsers };
};

module.exports = {
  getUsersByRole,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getDashboardStats,
};
