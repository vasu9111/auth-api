import Joi from "joi";

const registerUser = Joi.object({
  name: Joi.string().min(2).max(15).required().messages({
    "string.empty": "name is not empty",
    "any.required": "name is required",
    "string.min": "name must be a 2 characters",
    "string.max": "name must be a 15 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "invalid email valid format",
    "string.empty": "email is required",
  }),
  password: Joi.string().min(6).max(10).required().messages({
    "string.empty": "password is required",
    "string.min": "password must be a 6 min characters",
    "string.max": "password must be a max 10 characters",
  }),
});

export default {
  registerUser,
};
