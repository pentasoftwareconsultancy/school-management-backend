const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');

const Timetable = sequelize.define('Timetable', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  grade: {
    type: DataTypes.STRING,   // e.g. "10th"
    allowNull: false,
  },
  section: {
    type: DataTypes.STRING,   // e.g. "A"
    allowNull: false,
  },
  day: {
    type: DataTypes.ENUM('monday','tuesday','wednesday','thursday','friday','saturday'),
    allowNull: false,
  },
  timeSlot: {
    type: DataTypes.STRING,   // e.g. "9:00 - 10:00"
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'Teachers', key: 'id' },
    onDelete: 'SET NULL',
  },
  room: {
    type: DataTypes.STRING,
  },
}, { timestamps: true });

module.exports = Timetable;
