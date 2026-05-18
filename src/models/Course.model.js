const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
  className: {
    type: DataTypes.STRING,   // e.g. "10th"
  },
  subject: {
    type: DataTypes.STRING,
  },
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'Teachers', key: 'id' },
    onDelete: 'SET NULL',
  },
  schedule: {
    type: DataTypes.STRING,   // e.g. "Mon, Wed, Fri"
  },
  time: {
    type: DataTypes.STRING,   // e.g. "9:00 AM - 10:30 AM"
  },
  room: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
}, {
  timestamps: true,
});

module.exports = Course;
