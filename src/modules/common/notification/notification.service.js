const Notification = require('../../../models/Notification.model');
const User = require('../../../models/User.model');
const { Op } = require('sequelize');

// Create a notification (admin sends to a role or specific user)
const createNotification = async (data, createdBy) => {
  return Notification.create({ ...data, createdBy });
};

// Get notifications for a specific user (their role + all)
const getNotificationsForUser = async (userId, role) => {
  return Notification.findAll({
    where: {
      [Op.or]: [
        { targetRole: 'all' },
        { targetRole: role },
        { userId },
      ],
    },
    order: [['createdAt', 'DESC']],
    limit: 50,
  });
};

// Get all notifications (admin view)
const getAllNotifications = async () => {
  return Notification.findAll({
    include: [{ model: User, as: 'creator', attributes: ['id', 'username', 'role'], foreignKey: 'createdBy' }],
    order: [['createdAt', 'DESC']],
  });
};

// Mark a notification as read
const markAsRead = async (id, userId) => {
  const notification = await Notification.findOne({ where: { id, userId } });
  if (!notification) throw new Error('Notification not found');
  return notification.update({ isRead: true });
};

// Mark all as read for a user
const markAllAsRead = async (userId, role) => {
  await Notification.update(
    { isRead: true },
    {
      where: {
        [Op.or]: [
          { targetRole: 'all' },
          { targetRole: role },
          { userId },
        ],
        isRead: false,
      },
    }
  );
  return { message: 'All notifications marked as read' };
};

// Delete a notification (admin only)
const deleteNotification = async (id) => {
  const notification = await Notification.findByPk(id);
  if (!notification) throw new Error('Notification not found');
  await notification.destroy();
  return { message: 'Notification deleted' };
};

// Unread count for a user
const getUnreadCount = async (userId, role) => {
  const count = await Notification.count({
    where: {
      [Op.or]: [
        { targetRole: 'all' },
        { targetRole: role },
        { userId },
      ],
      isRead: false,
    },
  });
  return { unreadCount: count };
};

module.exports = {
  createNotification,
  getNotificationsForUser,
  getAllNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
};
