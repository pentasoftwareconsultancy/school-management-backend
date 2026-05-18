const { getSettings, updateSettings } = require('./settings.service');

const getSettingsHandler = async (req, res) => {
  try {
    const data = await getSettings();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateSettingsHandler = async (req, res) => {
  try {
    const data = await updateSettings(req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { getSettingsHandler, updateSettingsHandler };
