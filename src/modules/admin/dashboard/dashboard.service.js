const User         = require('../../../models/User.model');
const Student      = require('../../../models/Student.model');
const Teacher      = require('../../../models/Teacher.model');
const Parent       = require('../../../models/Parent.model');
const Course       = require('../../../models/Course.model');

const getStats = async () => {
  const [totalStudents, totalTeachers, totalParents, totalCourses] = await Promise.all([
    Student.count(),
    Teacher.count(),
    Parent.count(),
    Course.count(),
  ]);

  // Recent users (last 5 registered)
  const recentUsers = await User.findAll({
    attributes: ['id', 'username', 'email', 'role', 'createdAt'],
    order: [['createdAt', 'DESC']],
    limit: 5,
  });

  return {
    totalStudents,
    totalTeachers,
    totalParents,
    totalCourses,
    recentUsers,
  };
};

module.exports = { getStats };
