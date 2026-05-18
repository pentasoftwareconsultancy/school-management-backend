const express = require('express');
const router  = express.Router();
const { verifyToken, authorizeRole } = require('../../../middleware/auth.middleware');
const { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require('./courses.controller');

// All routes require admin token
router.use(verifyToken, authorizeRole('admin'));

router.get('/',     getAllCourses);
router.get('/:id',  getCourseById);
router.post('/',    createCourse);
router.put('/:id',  updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
