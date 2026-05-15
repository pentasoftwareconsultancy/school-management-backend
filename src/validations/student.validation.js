const Joi = require('joi');

const createStudentProfileSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  grade: Joi.string().required(),
  section: Joi.string().required(),
  dateOfBirth: Joi.date(),
  parentId: Joi.number().integer()
});

const updateStudentProfileSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  grade: Joi.string(),
  section: Joi.string(),
  parentId: Joi.number().integer()
});

module.exports = { createStudentProfileSchema, updateStudentProfileSchema };
