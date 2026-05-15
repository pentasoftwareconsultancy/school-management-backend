const User = require('../../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (userData) => {
  const { username, email, password, role } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    role
  });

  return newUser;
};

const loginUser = async (email, password) => {
  // Find user
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Generate Token
  const payload = {
    user: {
      id: user.id,
      role: user.role
    }
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET || 'supersecretjwtkey',
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

  return { token, user: { id: user.id, username: user.username, email: user.email, role: user.role } };
};

module.exports = {
  registerUser,
  loginUser
};
