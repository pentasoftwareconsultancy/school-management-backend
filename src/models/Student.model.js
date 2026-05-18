const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');
const User = require('./User.model');

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: { model: 'Users', key: 'id' },
    onDelete: 'CASCADE',
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rollNumber: {
    type: DataTypes.STRING,
    unique: true,
  },
  className: {
    type: DataTypes.STRING,   // e.g. "10th"
  },
  division: {
    type: DataTypes.STRING,   // e.g. "A"
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
  },
  phone: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.TEXT,
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'Parents', key: 'id' },
    onDelete: 'SET NULL',
  },
  profileImage: {
    type: DataTypes.STRING,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
});

Student.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Student;
