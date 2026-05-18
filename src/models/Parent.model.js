const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');
const User = require('./User.model');

const Parent = sequelize.define('Parent', {
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
  phone: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.TEXT,
  },
  occupation: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
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

Parent.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Parent;
