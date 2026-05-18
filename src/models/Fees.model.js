const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');

// Fee structure per grade (set by admin)
const FeeStructure = sequelize.define('FeeStructure', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  grade: {
    type: DataTypes.STRING,   // e.g. "7th", "10th"
    allowNull: false,
    unique: true,
  },
  tuitionFee: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  labFee: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  libraryFee: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  sportsFee: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  examFee: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalFee: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, { timestamps: true });

// Individual student payment record
const FeePayment = sequelize.define('FeePayment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Students', key: 'id' },
    onDelete: 'CASCADE',
  },
  feeStructureId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'FeeStructures', key: 'id' },
    onDelete: 'CASCADE',
  },
  feeName: {
    type: DataTypes.STRING,   // e.g. "Q1 Tuition Fee"
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATEONLY,
  },
  paidDate: {
    type: DataTypes.DATEONLY,
  },
  status: {
    type: DataTypes.ENUM('paid', 'pending', 'overdue'),
    defaultValue: 'pending',
  },
  receiptNumber: {
    type: DataTypes.STRING,
    unique: true,
  },
}, { timestamps: true });

module.exports = { FeeStructure, FeePayment };
