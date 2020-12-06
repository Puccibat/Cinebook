const Joi = require('joi');

//Signup Validation
const signupValidation = (data) => {
  const validationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return validationSchema.validate(data);
};

//Signin Validation
const signinValidation = (data) => {
  const validationSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return validationSchema.validate(data);
};

module.exports = { signupValidation, signinValidation };
