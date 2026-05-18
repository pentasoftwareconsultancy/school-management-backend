const service = require('./notification.service');

const createNotification = async (req, res) => {
  try {
    const data = await service.createNotification(req.body, req.user.id);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getMyNotifications = async (req, res) => {
  try {
    const data = await service.getNotificationsForUser(req.user.id, req.user.role);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllNotifications = async (req, res) => {
  try {
    const data = await service.getAllNotifications();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const data = await service.markAsRead(req.params.id, req.user.id);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    const data = await service.markAllAsRead(req.user.id, req.user.role);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const data = await service.deleteNotification(req.params.id);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getUnreadCount = async (req, res) => {
  try {
    const data = await service.getUnreadCount(req.user.id, req.user.role);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createNotification,
  getMyNotifications,
  getAllNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
};
