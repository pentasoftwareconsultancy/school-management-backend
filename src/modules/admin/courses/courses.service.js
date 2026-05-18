const Course  = require('../../../models/Course.model');
const Teacher = require('../../../models/Teacher.model');

const getAllCourses = async () => {
  return Course.findAll({
    include: [{ model: Teacher, as: 'teacher', attributes: ['id', 'fullName', 'subject'] }],
    order: [['createdAt', 'DESC']],
  });
};

const getCourseById = async (id) => {
  const course = await Course.findByPk(id, {
    include: [{ model: Teacher, as: 'teacher', attributes: ['id', 'fullName', 'subject'] }],
  });
  if (!course) throw new Error('Course not found');
  return course;
};

const createCourse = async (data) => {
  // Auto-generate code if not provided
  if (!data.code) {
    data.code = data.name.toUpperCase().replace(/\s+/g, '-').slice(0, 10) + '-' + Date.now().toString().slice(-4);
  }
  return Course.create(data);
};

const updateCourse = async (id, data) => {
  const course = await Course.findByPk(id);
  if (!course) throw new Error('Course not found');
  return course.update(data);
};

const deleteCourse = async (id) => {
  const course = await Course.findByPk(id);
  if (!course) throw new Error('Course not found');
  await course.destroy();
  return { message: 'Course deleted successfully' };
};

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };
