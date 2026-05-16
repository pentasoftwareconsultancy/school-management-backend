const Joi = require('joi');

const createTeacherProfileSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  subject: Joi.string().required(),
  phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}),
  hireDate: Joi.date()
});

const updateTeacherProfileSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  subject: Joi.string(),
  phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}),
});

module.exports = { createTeacherProfileSchema, updateTeacherProfileSchema };
