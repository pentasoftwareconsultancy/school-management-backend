const Joi = require('joi');

const createParentProfileSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).required().messages({'string.pattern.base': `Phone number must have 10 digits.`}),
  address: Joi.string()
});

const updateParentProfileSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}),
  address: Joi.string()
});

module.exports = { createParentProfileSchema, updateParentProfileSchema };
