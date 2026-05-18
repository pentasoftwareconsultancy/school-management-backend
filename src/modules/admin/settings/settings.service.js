// Simple key-value school settings stored in DB
// We'll use a JSON approach with a single settings record

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/db.config');

// Inline model for settings (simple key-value store)
const Settings = sequelize.define('Settings', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  schoolName:    { type: DataTypes.STRING, defaultValue: 'EduManage School' },
  schoolEmail:   { type: DataTypes.STRING },
  schoolPhone:   { type: DataTypes.STRING },
  schoolAddress: { type: DataTypes.TEXT },
  schoolWebsite: { type: DataTypes.STRING },
  academicYear:  { type: DataTypes.STRING, defaultValue: '2025-26' },
  timezone:      { type: DataTypes.STRING, defaultValue: 'Asia/Kolkata' },
  currency:      { type: DataTypes.STRING, defaultValue: 'INR' },
  logoUrl:       { type: DataTypes.STRING },
}, { timestamps: true });

// Always return the single settings record (create if not exists)
const getSettings = async () => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({});
  }
  return settings;
};

const updateSettings = async (data) => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create(data);
  } else {
    await settings.update(data);
  }
  return settings;
};

module.exports = { Settings, getSettings, updateSettings };
