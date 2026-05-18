const User    = require('../../../models/User.model');
const Student = require('../../../models/Student.model');
const Teacher = require('../../../models/Teacher.model');
const Parent  = require('../../../models/Parent.model');

const PROFILE_MODEL = {
  student: Student,
  teacher: Teacher,
  parent:  Parent,
};

// Get profile for the logged-in user
const getMyProfile = async (userId, role) => {
  const user = await User.findByPk(userId, {
    attributes: ['id', 'username', 'email', 'role', 'createdAt'],
  });
  if (!user) throw new Error('User not found');

  // Admin has no separate profile table
  if (role === 'admin') return { user };

  const Model = PROFILE_MODEL[role];
  const profile = await Model.findOne({ where: { userId } });

  return { user, profile: profile || null };
};

// Update profile for the logged-in user
const updateMyProfile = async (userId, role, data) => {
  const { email, username, password, ...profileData } = data;

  // Update User table fields if provided
  if (email || username) {
    const userUpdates = {};
    if (email)    userUpdates.email    = email;
    if (username) userUpdates.username = username;
    await User.update(userUpdates, { where: { id: userId } });
  }

  if (role === 'admin') {
    return User.findByPk(userId, { attributes: ['id', 'username', 'email', 'role'] });
  }

  const Model = PROFILE_MODEL[role];
  const profile = await Model.findOne({ where: { userId } });

  if (!profile) throw new Error('Profile not found. Contact admin.');

  await profile.update(profileData);
  return profile;
};

module.exports = { getMyProfile, updateMyProfile };
