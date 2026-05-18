const service = require('./courses.service');

const getAllCourses  = async (req, res) => {
  try {
    const courses = await service.getAllCourses();
    res.status(200).json({ success: true, data: courses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await service.getCourseById(req.params.id);
    res.status(200).json({ success: true, data: course });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const createCourse  = async (req, res) => {
  try {
    const course = await service.createCourse(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateCourse  = async (req, res) => {
  try {
    const course = await service.updateCourse(req.params.id, req.body);
    res.status(200).json({ success: true, data: course });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteCourse  = async (req, res) => {
  try {
    const result = await service.deleteCourse(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };
