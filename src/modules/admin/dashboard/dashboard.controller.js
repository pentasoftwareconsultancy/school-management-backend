const service = require('./dashboard.service');

const getDashboard = async (req, res) => {
  try {
    const stats = await service.getStats();
    res.status(200).json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getDashboard };
