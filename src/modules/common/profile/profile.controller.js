const service = require('./profile.service');

const getMyProfile = async (req, res) => {
  try {
    const data = await service.getMyProfile(req.user.id, req.user.role);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const updateMyProfile = async (req, res) => {
  try {
    const data = await service.updateMyProfile(req.user.id, req.user.role, req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { getMyProfile, updateMyProfile };
